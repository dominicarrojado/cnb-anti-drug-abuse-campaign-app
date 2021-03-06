import cn from 'classnames';
import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { getFileDataUrl } from '../lib/file';
import { createImageWithSticker } from '../lib/canvas';
import { trackEvent } from '../lib/google-analytics';
import Textarea from '../components/textarea';
import InputLabel from '../components/inputLabel';
import InputBox from '../components/inputBox';
import SectionContainer from '../components/sectionContainer';
import SectionDivider from '../components/sectionDivider';
import SectionTitle from '../components/sectionTitle';
import StickerItem from './stickerItem';
import InputContainer from '../components/inputContainer';
import Button from '../components/button';
import ImageWithSticker from '../components/imageWithSticker';
import InputFileLabelImage from '../components/inputFileLabelImage';
import InputFileLabelText from '../components/inputFileLabelText';
import ModalCropper from '../components/modalCropper';
import LoaderBubbles from './loaderBubbles';
import Alert from './alert';
import {
  Entry,
  ErrorMessage,
  FetchState,
  GoogleAnalyticsEvent,
  Sticker,
} from '../lib/types';
import { StoreContext } from '../lib/store';
import {
  EMAIL_MAX_LENGTH,
  MESSAGE_MAX_LENGTH,
  NAME_MAX_LENGTH,
  PROJECT_TITLE,
  STICKERS,
} from '../lib/constants';

type Props = {
  mainImageUrl: string;
  message: string;
  remainingCharCount: number;
  stickerIdx: number;
  selectedSticker: Sticker;
  name: string;
  email: string;
  setMainImageUrl: Dispatch<SetStateAction<string>>;
  setMessage: Dispatch<SetStateAction<string>>;
  setRemainingCharCount: Dispatch<SetStateAction<number>>;
  setStickerIdx: Dispatch<SetStateAction<number>>;
  setName: Dispatch<SetStateAction<string>>;
  setEmail: Dispatch<SetStateAction<string>>;
  setCreatedEntry: Dispatch<SetStateAction<Entry | null>>;
};

const BUTTON_TEXT_ATTACH = 'Attach a photo';

export default function EntryForm({
  mainImageUrl,
  message,
  remainingCharCount,
  stickerIdx,
  selectedSticker,
  name,
  email,
  setMainImageUrl,
  setMessage,
  setRemainingCharCount,
  setStickerIdx,
  setName,
  setEmail,
  setCreatedEntry,
}: Props) {
  const context = useContext(StoreContext);
  const [isFormIncomplete, setIsFormIncomplete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageDataUrl, setImageDataUrl] = useState('');
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const isLoading = fetchState === FetchState.LOADING;
  const modalOnClose = () => setIsModalOpen(false);
  const modalOnCrop = (dataUrl: string) => setMainImageUrl(dataUrl);
  const messageOnChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target;

    setMessage(value);
    setRemainingCharCount(MESSAGE_MAX_LENGTH - value.length);
  };
  const nameOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setName(e.target.value);
  const emailOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);
  const fileOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;

    if (files === null) {
      return;
    }

    const dataUrl = await getFileDataUrl(files[0]);

    setImageDataUrl(dataUrl);
    setIsModalOpen(true);

    // reset input file
    e.target.value = '';

    trackEvent({
      event: GoogleAnalyticsEvent.MODAL_OPEN,
      projectTitle: PROJECT_TITLE,
      buttonText: BUTTON_TEXT_ATTACH,
    });
  };
  const formOnSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();

      const isFormComplete =
        mainImageUrl && message && selectedSticker && name && email;

      if (!isFormComplete) {
        return setIsFormIncomplete(true);
      }

      setFetchState(FetchState.LOADING);

      const imageUrl = await createImageWithSticker(
        mainImageUrl,
        selectedSticker.imageUrl
      );
      const sticker = stickerIdx + 1;

      const createdEntry = {
        imageUrl,
        sticker,
        message,
        name,
        email,
      };

      setCreatedEntry(createdEntry);

      context.setEntries((currentValue) => [createdEntry, ...currentValue]);

      setFetchState(FetchState.SUCCESS);

      trackEvent({
        event: GoogleAnalyticsEvent.PLEDGE_CREATE,
        projectTitle: PROJECT_TITLE,
        pledgeSticker: sticker,
      });
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };

  return (
    <>
      <SectionContainer>
        <SectionTitle prefix="Step 1">Upload your image</SectionTitle>
        <div
          className={cn(
            'flex flex-col gap-[30px] mt-[25px]',
            'sm:flex-row sm:items-stretch sm:justify-center sm:flex-wrap'
          )}
        >
          <div
            className={cn(
              'text-center',
              'sm:flex sm:justify-center sm:w-[328]',
              !mainImageUrl
                ? 'sm:bg-purple-450 sm:items-center'
                : 'sm:items-start'
            )}
          >
            <div className="inline-flex">
              {!mainImageUrl ? (
                <InputFileLabelImage
                  htmlFor="image-upload"
                  title={BUTTON_TEXT_ATTACH}
                  hasError={isFormIncomplete && !mainImageUrl}
                />
              ) : (
                <>
                  <div className="flex flex-col relative">
                    <ImageWithSticker
                      mainImageUrl={mainImageUrl}
                      sticker={selectedSticker}
                    />
                    <InputFileLabelText htmlFor="image-upload">
                      Change photo
                    </InputFileLabelText>
                  </div>
                </>
              )}
              <input
                id="image-upload"
                name="image-upload"
                type="file"
                accept="image/jpeg, image/png"
                className="sr-only"
                disabled={isLoading}
                onChange={fileOnChange}
              />
              <ModalCropper
                isOpen={isModalOpen}
                imageDataUrl={imageDataUrl}
                onClose={modalOnClose}
                onCrop={modalOnCrop}
              />
            </div>
          </div>
          <div className="sm:w-[360px]">
            <InputLabel htmlFor="message">
              Tell us why a drug-free Singapore is important:
            </InputLabel>
            <div className="mt-[15px]">
              <label className="block text-[15px] mb-[8px]">
                {remainingCharCount}/{MESSAGE_MAX_LENGTH} characters
              </label>
              <Textarea
                id="message"
                value={message}
                placeholder="Type here..."
                maxLength={MESSAGE_MAX_LENGTH}
                disabled={isLoading}
                hasError={isFormIncomplete && !message}
                onChange={messageOnChange}
              />
            </div>
          </div>
        </div>
      </SectionContainer>
      <SectionDivider />
      <SectionContainer>
        <SectionTitle prefix="Step 2">Select a sticker or a badge</SectionTitle>
        <ul
          className={cn(
            'flex flex-wrap justify-center gap-[40px] mt-[25px] select-none',
            {
              'pointer-events-none': isLoading,
            }
          )}
        >
          {STICKERS.map((sticker, idx) => (
            <StickerItem
              key={idx}
              sticker={sticker}
              isActive={idx === stickerIdx}
              hasError={isFormIncomplete && !selectedSticker}
              onClick={() => setStickerIdx(idx)}
            />
          ))}
        </ul>
      </SectionContainer>
      <SectionDivider />
      <SectionContainer>
        <SectionTitle>Provide contact details</SectionTitle>
        <form
          className="flex flex-col flex-initial gap-[45px] mt-[25px]"
          onSubmit={formOnSubmit}
        >
          <div className={cn('flex flex-col gap-[30px]', 'sm:flex-row')}>
            <InputContainer>
              <InputLabel
                htmlFor="user-name"
                autoComplete="name"
                maxLength={NAME_MAX_LENGTH}
              >
                Name
              </InputLabel>
              <InputBox
                id="user-name"
                type="text"
                value={name}
                disabled={isLoading}
                hasError={isFormIncomplete && !name}
                onChange={nameOnChange}
              />
            </InputContainer>
            <InputContainer>
              <InputLabel
                htmlFor="user-email"
                autoComplete="email"
                maxLength={EMAIL_MAX_LENGTH}
              >
                Email Address
              </InputLabel>
              <InputBox
                id="user-email"
                type="email"
                value={email}
                disabled={isLoading}
                hasError={isFormIncomplete && !email}
                onChange={emailOnChange}
              />
            </InputContainer>
          </div>
          <div className="text-center">
            {(isFormIncomplete || fetchState === FetchState.ERROR) && (
              <Alert className={cn('py-[10px]', 'sm:py-[19px]')}>
                {isFormIncomplete
                  ? ErrorMessage.FORM_INCOMPLETE
                  : ErrorMessage.UNEXPECTED}
              </Alert>
            )}
            {!isLoading ? (
              <>
                <Button type="submit" className="sm:min-w-[220px]">
                  Submit
                </Button>
              </>
            ) : (
              <LoaderBubbles />
            )}
            <div className="mt-[20px] italic">
              Note: We do not store the image and text information you provide
              in this form into our server. When you make a pledge, it is stored
              in the local state only. It will be deleted once you refresh the
              page.
            </div>
          </div>
        </form>
      </SectionContainer>
    </>
  );
}

import { getAssetUrl } from './assets';
import { Sticker } from './types';

export const SITE_NAME = 'Dominic Arrojado';
export const PROJECT_TITLE = 'CNB Anti-Drug Abuse Campaign Singapore';
export const MAIN_AUTHOR = 'Dominic Arrojado';
export const MAIN_TITLE = `${PROJECT_TITLE} | ${SITE_NAME}`;
export const MAIN_DESC =
  'Make your pledge today and get a chance to win $100 worth of vouchers in our bi-monthly draw!';
export const MAIN_ORIGIN = 'https://dominicarrojado.com';
export const MAIN_PATH = '/cnb-anti-drug-abuse-campaign-app/';
export const MAIN_URL = `${MAIN_ORIGIN}${MAIN_PATH}`;
export const META_IMAGE = `${MAIN_URL}images/screenshot.png`;
export const META_IMAGE_WIDTH = 1200;
export const META_IMAGE_HEIGHT = 648;
export const META_IMAGE_ALT = 'Secure a #DrugFreeSG | Make your pledge today!';
export const META_IMAGE_TYPE = 'image/png';

export const NAME_MAX_LENGTH = 256;
export const EMAIL_MAX_LENGTH = 320;
export const MESSAGE_MAX_LENGTH = 150;

export const ENTRIES_PER_PAGE = 9;
export const ENTRY_IMAGE_SIZE = 345;

export const IMAGE_GENERATED_TYPE = 'image/png';
export const IMAGE_DOWNLOAD_TITLE = 'cnb-anti-drug-abuse-campaign-pledge';
export const IMAGE_DOWNLOAD_FILE_EXT = IMAGE_GENERATED_TYPE.split('/')[1];
export const IMAGE_CROP_TIMEOUT = 1000;

export const FONTS = [
  'DIN-Regular',
  'DIN-Italic',
  'DIN-Medium',
  'DIN-MediumItalic',
  'DIN-Bold',
  'DIN-BoldItalic',
  'DIN-BlackItalic',
];

export const STICKERS: Array<Sticker> = [
  {
    imageUrl: getAssetUrl('images/sticker-1-secure-a-drug-free-sg.png'),
    imageAlt: 'Secure a #DrugFreeSG sticker',
    previewImageUrl: null,
  },
  {
    imageUrl: getAssetUrl('images/sticker-2-secure-a-drug-free-sg.png'),
    imageAlt: 'Secure a #DrugFreeSG sticker',
    previewImageUrl: null,
  },
  {
    imageUrl: getAssetUrl('images/sticker-3-secure-a-drug-free-sg.png'),
    imageAlt: 'Secure a #DrugFreeSG sticker',
    previewImageUrl: null,
  },
  {
    imageUrl: getAssetUrl('images/sticker-4-secure-a-drug-free-sg.png'),
    imageAlt: 'Secure a #DrugFreeSG sticker',
    previewImageUrl: null,
  },
  {
    imageUrl: getAssetUrl('images/sticker-5-secure-a-drug-free-sg.png'),
    imageAlt: 'Secure a #DrugFreeSG sticker',
    previewImageUrl: getAssetUrl(
      'images/sticker-5-secure-a-drug-free-sg-thumbnail.png'
    ),
  },
  {
    imageUrl: getAssetUrl('images/sticker-6-secure-a-drug-free-sg.png'),
    imageAlt: 'Secure a #DrugFreeSG sticker',
    previewImageUrl: getAssetUrl(
      'images/sticker-6-secure-a-drug-free-sg-thumbnail.png'
    ),
  },
  {
    imageUrl: getAssetUrl('images/sticker-7-ribbon-secure-a-drug-free-sg.png'),
    imageAlt: 'Secure a #DrugFreeSG ribbon sticker',
    previewImageUrl: getAssetUrl(
      'images/sticker-7-ribbon-secure-a-drug-free-sg-thumbnail.png'
    ),
  },
  {
    imageUrl: getAssetUrl('images/sticker-8-certified-drug-free.png'),
    imageAlt: 'Certified Drug-free sticker',
    previewImageUrl: getAssetUrl(
      'images/sticker-8-certified-drug-free-thumbnail.png'
    ),
  },
];
export const STICKERS_LENGTH = STICKERS.length;

import { useRouter } from 'next/router';
import { useContext } from 'react';
import cn from 'classnames';
import { Button as ReakitButton } from 'reakit/Button';
import { trackEvent } from '../lib/google-analytics';
import { Entry, GoogleAnalyticsEvent, Route } from '../lib/types';
import { StoreContext } from '../lib/store';
import { ENTRY_IMAGE_SIZE, PROJECT_TITLE } from '../lib/constants';

type Props = {
  entry: Entry;
};

export default function EntryItem({ entry }: Props) {
  const context = useContext(StoreContext);
  const router = useRouter();
  const entryOnClick = async () => {
    await context.setSelectedEntry(entry);
    router.push(Route.GALLERY_VIEW);

    trackEvent({
      event: GoogleAnalyticsEvent.PLEDGE_CLICK,
      projectTitle: PROJECT_TITLE,
      pledgeSticker: entry.sticker,
    });
  };

  return (
    <ReakitButton
      as="li"
      className={cn(
        'group relative inline-block border-[5px] border-white bg-white select-none cursor-pointer',
        'sm:w-[220px] sm:h-[220px]'
      )}
      onClick={entryOnClick}
    >
      <img
        src={entry.imageUrl}
        alt={`${entry.name} pledge`}
        width={ENTRY_IMAGE_SIZE}
        height={ENTRY_IMAGE_SIZE}
        className={cn(
          'w-[245px] max-w-full h-auto aspect-square',
          'transition-opacity group-hover:opacity-80 group-focus:opacity-80'
        )}
        draggable={false}
      />
    </ReakitButton>
  );
}

import cn from 'classnames';
import React from 'react';
import { Button as ReakitButton, ButtonHTMLProps } from 'reakit';
import { useImageLoaded } from '../lib/custom-hooks';
import LoaderShimmer from './loaderShimmer';
import { Sticker } from '../lib/types';
import { ENTRY_IMAGE_SIZE } from '../lib/constants';

type Props = Omit<ButtonHTMLProps, 'children'> & {
  sticker: Sticker;
  isActive: boolean;
  hasError?: boolean;
};

export default function StickerItem({
  sticker,
  className,
  isActive,
  hasError,
  ...props
}: Props) {
  const [imageRef, isImageLoaded] = useImageLoaded();

  return (
    <ReakitButton
      {...props}
      as="li"
      className={cn(
        'relative w-[132px] h-[132px] bg-white',
        'transition-all',
        !isActive ? 'hover:scale-110 focus:scale-110' : 'ring-[5px] ring-black',
        {
          ['ring-[5px] ring-red-500']: hasError,
        },
        className
      )}
    >
      {!isImageLoaded && <LoaderShimmer />}
      <img
        ref={imageRef}
        src={sticker.previewImageUrl || sticker.imageUrl}
        alt={sticker.imageAlt}
        width={ENTRY_IMAGE_SIZE}
        height={ENTRY_IMAGE_SIZE}
        className="w-full h-auto aspect-square"
        draggable={false}
      />
    </ReakitButton>
  );
}

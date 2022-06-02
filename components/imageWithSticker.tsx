import React from 'react';
import { Sticker } from '../lib/types';
import { ENTRY_IMAGE_SIZE } from '../lib/constants';

type Props = {
  mainImageUrl: string;
  sticker?: Sticker;
};

export default function ImageWithSticker({ mainImageUrl, sticker }: Props) {
  return (
    <div className="relative inline-block bg-white select-none">
      <img
        src={mainImageUrl}
        alt="Attached photo"
        width="328"
        height="328"
        className="max-w-full h-auto aspect-square"
        draggable={false}
      />
      {sticker && (
        <img
          src={sticker.imageUrl}
          alt={sticker.imageAlt}
          width={ENTRY_IMAGE_SIZE}
          height={ENTRY_IMAGE_SIZE}
          className="absolute top-0 left-0 w-full h-full aspect-square"
          draggable={false}
        />
      )}
    </div>
  );
}

import Link from 'next/link';
import React from 'react';
import cn from 'classnames';
import ButtonLink from './buttonLink';
import EntryIndexImage from './entryIndexImage';
import { Entry, Route } from '../lib/types';

type Props = {
  selectedEntry: Entry;
};

export default function EntryIndex({ selectedEntry }: Props) {
  return (
    <div className={cn('py-[70px] px-[15px] text-white', 'sm:px-[40px]')}>
      <div
        className={cn(
          'flex flex-col flex-wrap gap-[30px]',
          'sm:flex-row sm:items-start'
        )}
      >
        <EntryIndexImage entry={selectedEntry} />
        <div
          className={cn(
            'flex flex-col gap-[30px] w-[345px] max-w-full mx-auto'
          )}
        >
          <div>
            <div
              className={cn(
                'inline-block bg-purple-450 p-[16px] text-[22px] tracking-[1px] italic uppercase',
                'sm:p-[20px] sm:text-[25px]'
              )}
            >
              {selectedEntry.name}
            </div>
          </div>
          <div
            className={cn(
              'max-w-full h-auto bg-white p-[16px] text-purple-450 text-[18px] tracking-[1px] italic break-words',
              'sm:min-h-[237px] sm:p-[20px] sm:text-[20px]'
            )}
          >
            {selectedEntry.message}
          </div>
        </div>
      </div>
      <div className="mt-[50px] text-center">
        <Link href={Route.ENTER} passHref>
          <ButtonLink>Make your pledge today!</ButtonLink>
        </Link>
      </div>
    </div>
  );
}

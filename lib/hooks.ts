import { useState } from 'react';
import { getFakerJs } from './imports';
import { getRandomStickerImageUrl } from './stickers';
import { Entry, FetchState } from './types';
import { ENTRIES_PER_PAGE, ENTRY_IMAGE_SIZE } from './constants';

export function useGetEntries() {
  const [fetchState, setFetchState] = useState(FetchState.DEFAULT);
  const [entries, setEntries] = useState<Array<Entry>>([]);
  const getMoreEntries = async () => {
    try {
      setFetchState(FetchState.LOADING);

      const faker = await getFakerJs();
      const newEntries: Array<Entry> = [];

      for (let i = 0; i < ENTRIES_PER_PAGE; i++) {
        newEntries.push({
          mainImageUrl: faker.image.imageUrl(
            ENTRY_IMAGE_SIZE,
            ENTRY_IMAGE_SIZE,
            'people',
            true,
            true
          ),
          stickerImageUrl: getRandomStickerImageUrl(),
          name: faker.name.findName(),
          message: faker.lorem.paragraph(),
        });
      }

      setEntries((currentEntries) => [...currentEntries, ...newEntries]);
      setFetchState(FetchState.SUCCESS);
    } catch (err) {
      setFetchState(FetchState.ERROR);
    }
  };

  return [fetchState, entries, getMoreEntries] as const;
}

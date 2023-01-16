import React, { useDeferredValue, useState } from 'react';
import styles from './Header.module.scss';
import { useGetBeersQuery } from '@/app/store/api/apiSlice';
import { useRouter } from 'next/router';
import Image from 'next/image';
import shortenString from '@/app/helpers/shortenString';
import Link from 'next/link';
import classNames from 'classnames';

export default function Header(): JSX.Element {
  const [searchText, setSearchText] = useState('');
  const [showItems, setShowItems] = useState(false);
  const deferredSearchText = useDeferredValue(searchText);

  const { data: beers } = useGetBeersQuery({ searchText: deferredSearchText, countPerPage: 5 });
  const router = useRouter();

  const handleSearch = () => {
    setShowItems(false);
    router.push(`/beer?search=${searchText}`);
  };

  return (
    <header className={styles.wrapper}>
      <Link href="/">
        <Image src="/assets/logo.png" width={261} height={48} alt="" className={styles.logo} />
      </Link>

      <form
        className={styles.search}
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
          onFocus={() => setShowItems(true)}
          value={searchText}
        />
        <button type="submit">GO</button>
        <ul
          className={classNames(styles.items, {
            [styles.show]: showItems && searchText,
          })}
        >
          {beers?.map((beer, index) => {
            if (index === beers.length - 1 && beers.length === 5) {
              return (
                <li
                  key={`search_item_${beer.id}`}
                  className={styles.load_more_item}
                  onClick={handleSearch}
                >
                  Load more
                </li>
              );
            }
            return (
              <li
                key={`search_item_${beer.id}`}
                onClick={() => {
                  router.push(`/beer/${beer.id}`);
                  setShowItems(false);
                }}
              >
                <Image
                  src={beer.image_url || '/assets/no_image.png'}
                  width={32}
                  height={32}
                  className={styles.item_img}
                  alt=""
                />

                {shortenString(beer.name, 30)}
              </li>
            );
          })}
        </ul>
      </form>
    </header>
  );
}

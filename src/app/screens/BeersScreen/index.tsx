import Head from 'next/head';
import { useState } from 'react';
import Pagination from '@/app/components/Pagination';
import { useGetBeersQuery } from '@/app/store/api/apiSlice';
import { useRouter } from 'next/router';
import BeerItem from '@/app/components/BeerrItem';
import styles from './BeersScreen.module.scss';

export default function BeersScreen(): JSX.Element {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  const { search } = router.query;

  const { data: beers, isLoading } = useGetBeersQuery({
    currentPage: currentPage,
    countPerPage: search ? 80 : 24,
    searchText: search as string,
  });
  if (isLoading) return <h2 className="heading">loading...</h2>;

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Punk API - Beers</title>
      </Head>

      {search && (
        <h2 className="heading">
          {beers?.length} beers found by searching <em>&quot;{search}&quot;</em>
        </h2>
      )}
      <div className={styles.items}>
        {beers?.map((beer, index: number) => (
          <BeerItem key={`bear_${index}`} beer={beer} />
        ))}
      </div>

      {!search && (
        <Pagination
          pagesCount={325 / 24}
          onChangePage={(pageNumber) => setCurrentPage(pageNumber)}
        />
      )}
    </div>
  );
}

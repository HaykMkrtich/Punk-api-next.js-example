import { useEffect, useState } from 'react';
import styles from './Pagination.module.scss';

interface PaginationProps {
  pagesCount: number;
  onChangePage: (pageNumber: number) => void;
}

export default function Pagination({ pagesCount, onChangePage }: PaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState<number[]>([]);
  useEffect(() => {
    const newPages = [];
    let initialPage = currentPage > 2 ? currentPage - 2 : 1;
    if (currentPage === pagesCount) initialPage = currentPage - 4;
    if (currentPage === pagesCount - 1) initialPage = currentPage - 3;
    for (let i = initialPage; i < initialPage + 5 && i <= pagesCount; i++) {
      newPages.push(i);
    }
    setPages(newPages);
  }, [currentPage, pagesCount]);

  return (
    <ul className={styles.wrapper}>
      {pages.map((page) => (
        <li key={`pagination_page_${page}`}>
          <button
            disabled={currentPage === page}
            onClick={() => {
              onChangePage(page);
              setCurrentPage(page);
            }}
          >
            {page}
          </button>
        </li>
      ))}
    </ul>
  );
}

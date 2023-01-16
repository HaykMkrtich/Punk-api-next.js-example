import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BeerModel } from '@/app/models/BeerModel';

export const apiSlice = createApi({
  reducerPath: 'beers',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.punkapi.com/v2' }),
  endpoints: (build) => ({
    getBeers: build.query<
      BeerModel[],
      { countPerPage?: number; currentPage?: number; searchText?: string }
    >({
      query: ({ countPerPage, currentPage = 1, searchText }) =>
        `/beers?per_page=${countPerPage}${
          searchText ? `&beer_name=` + searchText : `&page=${currentPage}`
        }`,
    }),
    getBeerById: build.query<BeerModel[], number | string>({
      query: (id) => `/beers?ids=${id}`,
    }),
  }),
});

export const { useGetBeersQuery, useGetBeerByIdQuery } = apiSlice;

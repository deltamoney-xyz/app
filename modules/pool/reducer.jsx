import { createReducer, createSelector } from "@reduxjs/toolkit";
import sortBy from "lodash/sortBy";
import actions from "./actions";

const initState = {
  isFetching: false,
  isFetched: false,
  error: null,
  poolList: [],
  filters: {
    search: "",
    filterBy: "",
    sortBy: "",
    showSelfLiquidity: false,
  },
};

export default createReducer(initState, (builder) => {
  builder
    .addCase(actions.SET_IS_FETCHING, (state, { payload }) => {
      state.isFetching = payload;
      state.isFetched = false;
    })
    .addCase(actions.SET_POOL_LIST, (state, { payload }) => {
      state.poolList = payload;
      state.isFetching = false;
      state.isFetched = true;
    })
    .addCase(actions.SET_FILTERS, (state, { payload }) => {
      state.filters = payload;
    });
});

export const getIsFetchingPoolList = (state) => state.pool.isFetching;
export const getIsFetchedPoolList = (state) => state.pool.isFetched;
export const getPoolList = (state) => state.pool.poolList;
export const getPoolFilters = (state) => state.pool.filters;

export const getPoolSummary = createSelector(getPoolList, (poolList) => {
  const totalValueLocked = poolList.reduce((totalValue, pool) => {
    return totalValue + parseFloat(pool.totalValueLockedUSD);
  }, 0);
  const total24Vol = poolList.reduce((totalValue, pool) => {
    return totalValue + parseFloat(pool.volumeUSD);
  }, 0);
  return {
    totalValueLocked,
    total24Vol,
  };
});

export const getFilteredPoolList = createSelector(
  getPoolFilters,
  getPoolList,
  (filters, poolList) => {
    let filteredList = poolList;
    if (filters.sortBy) filteredList = sortBy(filteredList, filters.sortBy);
    if (!filters.search) return filteredList;
    filteredList = filteredList.filter((pool) => {
      const keysToFilter = [
        pool.token0.symbol,
        pool.token1.symbol,
        pool.token0.name,
        pool.token1.name,
      ]
        .join(",")
        .toLowerCase();
      return keysToFilter.includes(filters.search);
    });
    return filteredList;
  }
);

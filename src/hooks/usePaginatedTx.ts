import {
  useQuery,
  type UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query';

import { fetchPaginatedTransactions, ITxInfo } from '../api/transactions';

export const usePaginatedTxsQuery = (
  partitionID: string,
  page: number,
  limit: number,
): UseQueryResult<ITxInfo[], Error> =>
  useQuery<ITxInfo[], Error>({
    enabled: Boolean(partitionID),
    placeholderData: keepPreviousData,
    queryFn: () => fetchPaginatedTransactions(partitionID, page, limit),
    queryKey: ['txs', partitionID, page, limit],
    staleTime: 1000 * 60,
  });

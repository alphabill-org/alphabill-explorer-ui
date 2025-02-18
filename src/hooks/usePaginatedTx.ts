import {
  useQuery,
  type UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query';

import { fetchPaginatedTransactions, ITxInfo } from '../api/transactions';

export const usePaginatedTxsQuery = (
  partitionID: string,
  startID: string | undefined,
  limit: number,
): UseQueryResult<{ data: ITxInfo[]; previousID: string | null }, Error> =>
  useQuery({
    enabled: Boolean(partitionID),
    placeholderData: keepPreviousData,
    queryFn: () => fetchPaginatedTransactions(partitionID, startID, limit),
    queryKey: ['txs', partitionID, startID, limit],
    staleTime: 1000 * 60,
  });

import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchTransactions, ITxInfo } from '../api/transactions';

export const useTxsQuery = (
  partitionID: string,
): UseQueryResult<ITxInfo[], Error> =>
  useQuery<ITxInfo[], Error>({
    enabled: Boolean(partitionID),
    queryFn: () => fetchTransactions(partitionID),
    queryKey: ['txs', partitionID],
    staleTime: 1000 * 60,
  });

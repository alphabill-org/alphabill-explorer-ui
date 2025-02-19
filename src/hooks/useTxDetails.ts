import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { fetchTransactionByHash, type ITxInfo } from '../api/transactions';

export const useTxDetailsQuery = (
  txHash: string,
): UseQueryResult<ITxInfo, Error> => {
  return useQuery<ITxInfo, Error>({
    queryFn: () => fetchTransactionByHash(txHash),
    queryKey: ['transactionDetails', txHash],
    staleTime: 1000 * 60,
  });
};

import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { fetchTransactionsByUnit, type ITxInfo } from '../api/transactions';

export const useTxsByUnitQuery = (
  unitID: string,
): UseQueryResult<ITxInfo[], Error> => {
  return useQuery<ITxInfo[], Error>({
    queryFn: () => fetchTransactionsByUnit(unitID),
    queryKey: ['txsByUnit', unitID],
    staleTime: 1000 * 60,
  });
};

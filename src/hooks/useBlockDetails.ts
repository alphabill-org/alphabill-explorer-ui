import {
  useQuery,
  type UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query';

import { fetchBlockDetails, type IBlockDetailsResponse } from '../api/blocks';

export const useBlockDetailsQuery = (
  blockNumber: string,
  partitionID: string,
): UseQueryResult<IBlockDetailsResponse, Error> => {
  return useQuery<IBlockDetailsResponse, Error>({
    placeholderData: keepPreviousData,
    queryFn: () => fetchBlockDetails(blockNumber, partitionID),
    queryKey: ['blockDetails', blockNumber, partitionID],
    staleTime: 1000 * 60,
  });
};

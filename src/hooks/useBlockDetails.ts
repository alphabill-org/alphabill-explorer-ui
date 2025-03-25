import {
  useQuery,
  type UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query';

import { fetchBlockDetails, type IBlockDetailsResponse } from '../api/blocks';

interface IUseBlockDetailsQueryOptions {
  enabled?: boolean;
}

export const useBlockDetailsQuery = (
  blockNumber: string,
  partitionID: string,
  options: IUseBlockDetailsQueryOptions = {},
): UseQueryResult<IBlockDetailsResponse, Error> => {
  const { enabled } = options;

  return useQuery<IBlockDetailsResponse, Error>({
    enabled,
    placeholderData: keepPreviousData,
    queryFn: () => fetchBlockDetails(blockNumber, partitionID),
    queryKey: ['blockDetails', blockNumber, partitionID],
    staleTime: 1000 * 60,
  });
};

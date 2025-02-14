import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchLatestBlocks, ILatestBlocksResponse } from '../api/partitions';

export const useLatestBlocksQuery = (): UseQueryResult<
  ILatestBlocksResponse,
  Error
> =>
  useQuery<ILatestBlocksResponse, Error>({
    queryFn: fetchLatestBlocks,
    queryKey: ['latestBlocks'],
    staleTime: 1000 * 60,
  });

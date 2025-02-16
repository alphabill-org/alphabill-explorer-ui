import {
  useQuery,
  type UseQueryResult,
  keepPreviousData,
} from '@tanstack/react-query';

import { fetchPaginatedBlocks, IBlockInfo } from '../api/blocks';

export const usePaginatedBlocksQuery = (
  partitionID: string,
  startBlock: number | undefined,
  limit: number,
): UseQueryResult<IBlockInfo[], Error> =>
  useQuery<IBlockInfo[], Error>({
    enabled: Boolean(partitionID),
    placeholderData: keepPreviousData,
    queryFn: () => fetchPaginatedBlocks(partitionID, startBlock, limit),
    queryKey: ['blocks', partitionID, startBlock, limit],
    staleTime: 1000 * 60,
  });

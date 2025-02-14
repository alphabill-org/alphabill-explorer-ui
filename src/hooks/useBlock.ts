import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { fetchBlocks, IBlockInfo } from '../api/blocks';

export const useBlocksQuery = (
  partitionID: string,
): UseQueryResult<IBlockInfo[], Error> =>
  useQuery<IBlockInfo[], Error>({
    enabled: Boolean(partitionID),
    queryFn: () => fetchBlocks(partitionID),
    queryKey: ['blocks', partitionID],
    staleTime: 1000 * 60,
  });

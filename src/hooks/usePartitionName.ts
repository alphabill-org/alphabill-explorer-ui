import { useLatestBlocksQuery } from './usePartitions';
import { getPartitionName } from '../utils/partitionUtils';

interface IUsePartitionNameReturn {
  partitionName: string;
  isLoading: boolean;
  error: Error | null;
}

export function usePartitionName(
  partitionID?: string,
): IUsePartitionNameReturn {
  const { data: partitionsData, isLoading, error } = useLatestBlocksQuery();

  let resolvedName = 'Unknown Partition';

  if (partitionID && partitionsData && partitionsData[partitionID]) {
    const { PartitionTypeID } = partitionsData[partitionID];
    resolvedName = getPartitionName(PartitionTypeID);
  }

  return {
    error,
    isLoading,
    partitionName: resolvedName,
  };
}

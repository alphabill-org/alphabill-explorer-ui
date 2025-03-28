import React, { createContext, useContext, ReactNode } from 'react';

import { ILatestBlocksResponse } from '../api/partitions';
import { useLatestBlocksQuery } from '../hooks/usePartitions';

interface IPartitionContextType {
  error: Error | null;
  isLoading: boolean;
  partitionsData: ILatestBlocksResponse | null;
}

const PartitionContext = createContext<IPartitionContextType>({
  error: null,
  isLoading: false,
  partitionsData: null,
});

export const usePartitionData = (): IPartitionContextType =>
  useContext(PartitionContext);

export const PartitionProvider: React.FC<{ children: ReactNode }> = ({
  children,
}): React.ReactElement => {
  const { data, isLoading, error } = useLatestBlocksQuery();

  const partitionsData: ILatestBlocksResponse | null = data || null;

  return (
    <PartitionContext.Provider
      value={{
        error,
        isLoading,
        partitionsData,
      }}
    >
      {children}
    </PartitionContext.Provider>
  );
};

export const getPartitionTypeId = (
  partitionsData: ILatestBlocksResponse | null,
  partitionId: number | string,
): number | undefined => {
  if (!partitionsData) return undefined;

  const partitionIdStr = String(partitionId);
  return partitionsData[partitionIdStr]?.PartitionTypeID;
};

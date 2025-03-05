import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { BlockTable } from '../components/Table/BlockTable/BlockTable';
import { usePaginatedBlocksQuery } from '../hooks/usePaginatedBlock';
import { getPartitionName } from '../utils/partitionUtils';

export const PartitionBlocks: React.FC = () => {
  const { partitionID } = useParams<{ partitionID: string }>();

  const pageSize = 10;

  const [blocksCursor, setBlocksCursor] = useState<number | undefined>(
    undefined,
  );
  const [blocksHistory, setBlocksHistory] = useState<number[]>([]);

  const {
    data: blocks,
    isLoading: blocksLoading,
    error: blocksError,
  } = usePaginatedBlocksQuery(partitionID || '', blocksCursor, pageSize);

  const currentBlocksPage = blocksHistory.length + 1;
  const totalBlocksPages =
    blocks && blocks.length === pageSize
      ? currentBlocksPage + 1
      : currentBlocksPage;

  const handleBlocksPageChange = (page: number): void => {
    if (page > currentBlocksPage) {
      if (blocks && blocks.length > 0) {
        const lastBlock = blocks[blocks.length - 1];
        const nextCursor = lastBlock.BlockNumber - 1;
        setBlocksHistory((prev) => [...prev, blocksCursor ?? 0]);
        setBlocksCursor(nextCursor);
      }
    } else if (page < currentBlocksPage) {
      if (blocksHistory.length > 0) {
        const previousCursor = blocksHistory[blocksHistory.length - 1];
        setBlocksHistory((prev) => prev.slice(0, prev.length - 1));
        setBlocksCursor(previousCursor === 0 ? undefined : previousCursor);
      }
    }
  };

  useEffect(() => {
    setBlocksCursor(undefined);
    setBlocksHistory([]);
  }, [partitionID]);

  const partitionName = partitionID
    ? getPartitionName(parseInt(partitionID, 10))
    : 'Unknown Partition';

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        {partitionName} Partition Blocks
      </h1>
      <BlockTable
        data={blocks || []}
        isLoading={blocksLoading}
        error={blocksError ? blocksError.message : ''}
        manualPagination={true}
        pageSize={pageSize}
        currentPage={currentBlocksPage}
        totalPages={totalBlocksPages}
        onPageChange={handleBlocksPageChange}
      />
    </div>
  );
};

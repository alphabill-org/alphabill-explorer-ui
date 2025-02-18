import React, { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { BlockTable } from '../components/Table/BlockTable/BlockTable';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { usePaginatedBlocksQuery } from '../hooks/usePaginatedBlock';
import { usePaginatedTxsQuery } from '../hooks/usePaginatedTx';
import { useLatestBlocksQuery } from '../hooks/usePartitions';

export const Partition: React.FC = () => {
  const { partitionID } = useParams<{ partitionID?: string }>();

  if (!partitionID) {
    return <Navigate to="/404" replace />;
  }

  const { data: partitionsData, isLoading: partitionsLoading } =
    useLatestBlocksQuery();

  if (
    !partitionsLoading &&
    partitionsData &&
    !(partitionID in partitionsData)
  ) {
    return <Navigate to="/404" replace />;
  }

  const pageSize = 5;

  const [blocksCursor, setBlocksCursor] = useState<number | undefined>(
    undefined,
  );
  const [blocksHistory, setBlocksHistory] = useState<number[]>([]);

  const {
    data: blocks,
    isLoading: blocksLoading,
    error: blocksError,
  } = usePaginatedBlocksQuery(partitionID, blocksCursor, pageSize);

  const handleNextBlocks = (): void => {
    if (blocks && blocks.length > 0) {
      const lastBlock = blocks[blocks.length - 1];
      const nextCursor = lastBlock.BlockNumber - 1;
      setBlocksHistory((prev) => [...prev, blocksCursor ?? 0]);
      setBlocksCursor(nextCursor);
    }
  };

  const handlePreviousBlocks = (): void => {
    if (blocksHistory.length > 0) {
      const previousCursor = blocksHistory[blocksHistory.length - 1];
      setBlocksHistory((prev) => prev.slice(0, prev.length - 1));
      setBlocksCursor(previousCursor === 0 ? undefined : previousCursor);
    }
  };

  const [txCursor, setTxCursor] = useState<string | undefined>(undefined);
  const [txHistory, setTxHistory] = useState<string[]>([]);
  const {
    data: txData,
    isLoading: txLoading,
    error: txError,
  } = usePaginatedTxsQuery(partitionID, txCursor, pageSize);

  const handleNextTx = (): void => {
    if (txData && txData.data && txData.data.length > 0 && txData.previousID) {
      setTxHistory((prev) => [...prev, txCursor || '']);
      setTxCursor(txData.previousID);
    }
  };

  const handlePreviousTx = (): void => {
    if (txHistory.length > 0) {
      const previousCursor = txHistory[txHistory.length - 1];
      setTxHistory((prev) => prev.slice(0, prev.length - 1));
      setTxCursor(previousCursor || undefined);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mt-8">
        Partition {partitionID} Explorer
      </h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Blocks</h2>
        {blocksLoading && <p>Loading blocks...</p>}
        {blocksError && <p>Error loading blocks</p>}
        {blocks && blocks.length > 0 ? (
          <BlockTable
            data={blocks}
            manualPagination={true}
            pageSize={pageSize}
            onNextPage={handleNextBlocks}
            onPreviousPage={
              blocksHistory.length > 0 ? handlePreviousBlocks : undefined
            }
          />
        ) : (
          <p>No blocks found.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
        {txLoading && <p>Loading transactions...</p>}
        {txError && <p>Error loading transactions: {txError.message}</p>}
        {txData && txData.data && txData.data.length > 0 ? (
          <TxTable
            data={txData.data}
            manualPagination={true}
            pageSize={pageSize}
            onNextPage={handleNextTx}
            onPreviousPage={txHistory.length > 0 ? handlePreviousTx : undefined}
          />
        ) : (
          <p>No transactions found.</p>
        )}
      </section>
    </div>
  );
};

export default Partition;

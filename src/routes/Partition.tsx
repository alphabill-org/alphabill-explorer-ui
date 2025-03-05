import React, { useState, useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';

import { BlockTable } from '../components/Table/BlockTable/BlockTable';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { usePaginatedBlocksQuery } from '../hooks/usePaginatedBlock';
import { usePaginatedTxsQuery } from '../hooks/usePaginatedTx';
import { useLatestBlocksQuery } from '../hooks/usePartitions';
import { getPartitionName } from '../utils/partitionUtils';

export const Partition: React.FC = () => {
  const { partitionID } = useParams<{ partitionID?: string }>();

  if (!partitionID) {
    return <Navigate to="/404" replace />;
  }

  const numericID = parseInt(partitionID, 10);

  const { data: partitionsData, isLoading: partitionsLoading } =
    useLatestBlocksQuery();

  useEffect(() => {
    setBlocksCursor(undefined);
    setBlocksHistory([]);
    setTxCursor(undefined);
    setTxHistory([]);
  }, [partitionID]);

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

  const [txCursor, setTxCursor] = useState<string | undefined>(undefined);
  const [txHistory, setTxHistory] = useState<string[]>([]);

  const {
    data: txData,
    isLoading: txLoading,
    error: txError,
  } = usePaginatedTxsQuery(partitionID, txCursor, pageSize);

  const currentTxPage = txHistory.length + 1;
  const totalTxPages =
    txData && txData.data && txData.data.length === pageSize
      ? currentTxPage + 1
      : currentTxPage;

  const handleTxPageChange = (page: number): void => {
    if (page > currentTxPage) {
      if (
        txData &&
        txData.data &&
        txData.data.length > 0 &&
        txData.previousID
      ) {
        setTxHistory((prev) => [...prev, txCursor || '']);
        setTxCursor(txData.previousID);
      }
    } else if (page < currentTxPage) {
      if (txHistory.length > 0) {
        const previousCursor = txHistory[txHistory.length - 1];
        setTxHistory((prev) => prev.slice(0, prev.length - 1));
        setTxCursor(previousCursor || undefined);
      }
    }
  };

  const partitionName = getPartitionName(numericID);

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-8">
        {partitionName} Explorer
      </h1>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          <Link
            to={`/${partitionID}/blocks`}
            className="text-[#08e8de] hover:underline"
          >
            Blocks
          </Link>
        </h2>
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
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          <Link
            to={`/${partitionID}/transactions`}
            className="text-[#08e8de] hover:underline"
          >
            Transactions
          </Link>
        </h2>
        <TxTable
          data={txData?.data || []}
          isLoading={txLoading}
          error={txError ? txError.message : ''}
          manualPagination={true}
          pageSize={pageSize}
          currentPage={currentTxPage}
          totalPages={totalTxPages}
          onPageChange={handleTxPageChange}
        />
      </section>
    </div>
  );
};

export default Partition;

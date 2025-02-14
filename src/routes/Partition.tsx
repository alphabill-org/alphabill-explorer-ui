import React from 'react';
import { useParams, Navigate } from 'react-router-dom';

import { BlockTable } from '../components/Table/BlockTable/BlockTable';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { useBlocksQuery } from '../hooks/useBlock';
import { useLatestBlocksQuery } from '../hooks/usePartitions';
import { useTxsQuery } from '../hooks/useTx';

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

  const {
    data: blocks,
    isLoading: blocksLoading,
    error: blocksError,
  } = useBlocksQuery(partitionID);

  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTxsQuery(partitionID);

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
          <BlockTable data={blocks} />
        ) : (
          <p>No blocks found.</p>
        )}
      </section>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Transactions</h2>
        {transactionsLoading && <p>Loading transactions...</p>}
        {transactionsError && <p>Error loading transactions</p>}
        {transactions && transactions.length > 0 ? (
          <TxTable data={transactions} />
        ) : (
          <p>No transactions found.</p>
        )}
      </section>
    </div>
  );
};

export default Partition;

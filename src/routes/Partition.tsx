import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useParams } from 'react-router-dom';

import { fetchBlocks, IBlockInfo } from '../api/blocks';
import { fetchTransactions, ITxInfo } from '../api/transactions';
import { BlockTable } from '../components/Table/BlockTable/BlockTable';
import { TxTable } from '../components/Table/TxTable/TxTable';

export const Partition: React.FC = () => {
  const { partitionID } = useParams<{ partitionID: string }>();

  const {
    data: blocks,
    isLoading: blocksLoading,
    error: blocksError,
  } = useQuery<IBlockInfo[]>({
    queryFn: () => fetchBlocks(partitionID),
    queryKey: ['blocks', partitionID],
  });

  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useQuery<ITxInfo[]>({
    queryFn: () => fetchTransactions(partitionID),
    queryKey: ['transactions', partitionID],
  });

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

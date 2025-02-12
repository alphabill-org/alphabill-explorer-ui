import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchBlocks, BlockInfo } from '../api/blocks';
import { fetchTransactions, TxInfo } from '../api/transactions';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { BlockTable } from '../components/Table/BlockTable/BlockTable';

export const Home: React.FC = () => {
  const {
    data: blocks,
    isLoading: blocksLoading,
    error: blocksError,
  } = useQuery<BlockInfo[]>({
    queryKey: ['blocks', '1'],
    queryFn: () => fetchBlocks('1'),
  });

  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useQuery<TxInfo[]>({
    queryKey: ['transactions', '1'],
    queryFn: () => fetchTransactions('1'),
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mt-8">
        Alphabill Block Explorer
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

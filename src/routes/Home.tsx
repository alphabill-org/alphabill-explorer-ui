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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">LATEST BLOCKS</h2>
          <BlockTable
            data={blocks || []}
            isLoading={blocksLoading}
            error={blocksError ? 'Error loading blocks' : undefined}
            compact
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">LATEST TRANSACTIONS</h2>
          <TxTable
            data={transactions || []}
            isLoading={transactionsLoading}
            error={transactionsError ? 'Error loading transactions' : undefined}
            compact
          />
        </section>
      </div>
    </div>
  );
};

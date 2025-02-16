import React from 'react';

import { BlockTable } from '../components/Table/BlockTable/BlockTable';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { useBlocksQuery } from '../hooks/useBlock';
import { useTxsQuery } from '../hooks/useTx';

export const Home: React.FC = () => {
  const {
    data: blocks,
    isLoading: blocksLoading,
    error: blocksError,
  } = useBlocksQuery('1');
  const {
    data: transactions,
    isLoading: transactionsLoading,
    error: transactionsError,
  } = useTxsQuery('1');

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
            limit={5}
          />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">LATEST TRANSACTIONS</h2>
          <TxTable
            data={transactions || []}
            isLoading={transactionsLoading}
            error={transactionsError ? 'Error loading transactions' : undefined}
            compact
            limit={5}
          />
        </section>
      </div>
    </div>
  );
};

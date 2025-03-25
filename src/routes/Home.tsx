import React from 'react';

import { Search } from '../components/Search/Search';
import { BlockTable } from '../components/Table/BlockTable/BlockTable';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { useBlocksQuery } from '../hooks/useBlock';
import { useLatestBlocksQuery } from '../hooks/usePartitions';
import { useTxsQuery } from '../hooks/useTx';

export const Home: React.FC = () => {
  const {
    data: latestBlocksData,
    isLoading: isLatestBlocksLoading,
    error: latestBlocksError,
  } = useLatestBlocksQuery();

  const firstItem = latestBlocksData
    ? Object.values(latestBlocksData)[0]
    : undefined;
  const partitionID = String(firstItem?.PartitionID ?? '');

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

  if (isLatestBlocksLoading) {
    return <div>Loading partition data…</div>;
  }
  if (latestBlocksError || !partitionID) {
    return <div>No valid partition ID found!</div>;
  }

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold text-center mt-8">
        Alphabill Explorer
      </h1>

      <Search />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
        <section>
          <h2 className="text-2xl font-semibold mb-4">LATEST BLOCKS</h2>
          <BlockTable
            data={blocks ?? []}
            isLoading={blocksLoading}
            error={blocksError ? 'Error loading blocks' : undefined}
            compact
          />
        </section>
        <section>
          <h2 className="text-2xl font-semibold mb-4">LATEST TRANSACTIONS</h2>
          <TxTable
            data={transactions ?? []}
            isLoading={transactionsLoading}
            error={transactionsError ? 'Error loading transactions' : undefined}
            compact
          />
        </section>
      </div>
    </div>
  );
};

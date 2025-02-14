import React from 'react';
import { useParams } from 'react-router-dom';

import { TxTable } from '../components/Table/TxTable/TxTable';
import { useTxsQuery } from '../hooks/useTx';

export const PartitionTxs: React.FC = () => {
  const { partitionID } = useParams<{ partitionID: string }>();

  const { data: transactions, isLoading, error } = useTxsQuery(partitionID!);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold my-8">
        Transactions for Partition {partitionID}
      </h1>
      {error && <p className="text-red-500">Error loading transactions</p>}
      <TxTable
        data={transactions || []}
        isLoading={isLoading}
        error={error ? 'Error loading transactions' : undefined}
      />
    </div>
  );
};

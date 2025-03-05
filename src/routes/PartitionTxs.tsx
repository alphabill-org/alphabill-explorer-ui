import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { TxTable } from '../components/Table/TxTable/TxTable';
import { usePaginatedTxsQuery } from '../hooks/usePaginatedTx';
import { getPartitionName } from '../utils/partitionUtils';

export const PartitionTxs: React.FC = () => {
  const { partitionID } = useParams<{ partitionID: string }>();

  const pageSize = 10;

  const [txCursor, setTxCursor] = useState<string | undefined>(undefined);
  const [txHistory, setTxHistory] = useState<string[]>([]);

  const {
    data: txData,
    isLoading: txLoading,
    error: txError,
  } = usePaginatedTxsQuery(partitionID || '', txCursor, pageSize);

  const currentTxPage = txHistory.length + 1;
  const totalTxPages =
    txData?.data?.length === pageSize ? currentTxPage + 1 : currentTxPage;

  const handleTxPageChange = (page: number): void => {
    if (page > currentTxPage) {
      if (txData?.data?.length && txData.previousID) {
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

  useEffect(() => {
    setTxCursor(undefined);
    setTxHistory([]);
  }, [partitionID]);

  const partitionName = partitionID
    ? getPartitionName(parseInt(partitionID, 10))
    : 'Unknown Partition';

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">
        {partitionName} Partition Transactions
      </h1>
      {txError && <p className="text-red-500">Error loading transactions</p>}
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
    </div>
  );
};

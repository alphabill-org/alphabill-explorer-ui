import React from 'react';
import { useParams } from 'react-router-dom';

import { CopyToClipboard } from '../components/Common/CopyToClipboard';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { useTxsByUnitQuery } from '../hooks/useTxByUnit';

export const UnitTxs: React.FC = () => {
  const { unitID } = useParams<{ unitID: string }>();

  if (!unitID) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center">Missing Unit ID</p>
      </div>
    );
  }

  const { data, isLoading, error } = useTxsByUnitQuery(unitID);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold my-8">Transactions</h1>
      <div>Unit ID: </div>
      <div className="text-xl mb-8">
        <CopyToClipboard text={unitID} displayText={unitID} />
      </div>
      <TxTable
        data={data || []}
        isLoading={isLoading}
        error={error ? error.message : undefined}
      />
    </div>
  );
};

export default UnitTxs;

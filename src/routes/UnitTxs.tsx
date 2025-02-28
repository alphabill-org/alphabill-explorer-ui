import React from 'react';
import { useParams } from 'react-router-dom';

import { CopyToClipboard } from '../components/Common/CopyToClipboard';
import { TxTable } from '../components/Table/TxTable/TxTable';
import { useTxsByUnitQuery } from '../hooks/useTxByUnit';
import { shortenHash } from '../utils/helpers';

export const UnitTxs: React.FC = () => {
  const { unitID } = useParams<{ unitID: string }>();

  if (!unitID) {
    return (
      <div className="container mx-auto">
        <p className="text-center">Missing Unit ID</p>
      </div>
    );
  }

  const { data, isLoading, error } = useTxsByUnitQuery(unitID);

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-4xl font-bold">Transactions for unit:</h1>
      <div className="text-4xl font-bold mt-2 mb-8">
        {' '}
        <CopyToClipboard text={unitID} displayText={shortenHash(unitID)} />
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

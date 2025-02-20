import React from 'react';
import { useParams, Link } from 'react-router-dom';

import { CopyToClipboard } from '../components/Common/CopyToClipboard';
import {
  DetailsContainer,
  IDetailRowDef,
} from '../components/Details/DetailsContainer';
import { useTxDetailsQuery } from '../hooks/useTxDetails';
import { shortenHash } from '../utils/helpers';
import { parseTransactionOrder } from '../utils/txUtils';

export const TxDetails: React.FC = () => {
  const { partitionID, txHash } = useParams<{
    partitionID: string;
    txHash: string;
  }>();

  if (!partitionID || !txHash) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center">Missing partition ID or transaction hash</p>
      </div>
    );
  }

  const { data, isLoading, error } = useTxDetailsQuery(txHash);

  const baseRowDefs: IDetailRowDef[] = [
    {
      label: 'Transaction Hash:',
      value: (
        <CopyToClipboard text={txHash} displayText={shortenHash(txHash)} />
      ),
    },
    { label: 'Transaction Order:' },
    { label: 'Block Number:' },
    { label: 'Partition ID:' },
    { label: 'Transaction Type:' },
    { label: 'Unit ID:' },
    { label: 'Timeout:' },
    { label: 'Actual Fee:' },
    { label: 'Success Indicator:' },
  ];

  let loadedRowDefs: IDetailRowDef[] = baseRowDefs;

  if (!isLoading && !error && data) {
    const {
      TxRecordHash,
      TxOrderHash,
      BlockNumber,
      PartitionID,
      Transaction: { ServerMetadata, TransactionOrder },
    } = data;

    const { transactionType, timeout } =
      parseTransactionOrder(TransactionOrder);

    const unitID =
      ServerMetadata?.TargetUnits && ServerMetadata.TargetUnits.length > 0
        ? ServerMetadata.TargetUnits.map((id) => (
            <Link
              key={id}
              to={`/${partitionID}/units/${id}`}
              className="text-[#08e8de] hover:underline"
            >
              {id}
            </Link>
          ))
        : 'N/A';

    const valuesLookup: Record<string, React.ReactNode> = {
      'Actual Fee:': ServerMetadata?.ActualFee ?? 'N/A',
      'Block Number:': (
        <Link
          to={`/${PartitionID}/blocks/${BlockNumber}`}
          className="text-[#08e8de] hover:underline"
        >
          {BlockNumber}
        </Link>
      ),
      'Partition ID:': (
        <Link to={`/${PartitionID}`} className="text-[#08e8de] hover:underline">
          {PartitionID}
        </Link>
      ),
      'Success Indicator:': ServerMetadata?.SuccessIndicator ?? 'N/A',
      'Timeout:': timeout,
      'Transaction Hash:': (
        <CopyToClipboard
          text={TxRecordHash}
          displayText={shortenHash(TxRecordHash)}
        />
      ),
      'Transaction Order:': (
        <CopyToClipboard
          text={TxOrderHash}
          displayText={shortenHash(TxOrderHash) || 'N/A'}
        />
      ),
      'Transaction Type:': transactionType,
      'Unit ID:': unitID,
    };

    loadedRowDefs = baseRowDefs.map((row) => ({
      ...row,
      value: valuesLookup[row.label],
    }));
  }

  return (
    <DetailsContainer
      title={txHash}
      rowDefs={loadedRowDefs}
      isLoading={isLoading}
      error={error ? error.message : undefined}
    />
  );
};

export default TxDetails;

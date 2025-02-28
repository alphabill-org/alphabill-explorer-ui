import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

import { CopyToClipboard } from '../components/Common/CopyToClipboard';
import {
  DetailsContainer,
  IDetailRowDef,
} from '../components/Details/DetailsContainer';
import { useTxDetailsQuery } from '../hooks/useTxDetails';
import { shortenHash } from '../utils/helpers';
import { getPartitionName } from '../utils/partitionUtils';
import { mapSuccessIndicator } from '../utils/statusUtils';
import { formatTimeout } from '../utils/timeUtils';
import { parseTransactionOrder, mapTransactionType } from '../utils/txUtils';

export const TxDetails: React.FC = () => {
  const { partitionID, txHash } = useParams<{
    partitionID: string;
    txHash: string;
  }>();

  if (!partitionID || !txHash) {
    return (
      <div className="container mx-auto">
        <p className="text-center">Missing partition ID or transaction hash</p>
      </div>
    );
  }

  const { data, isLoading, error } = useTxDetailsQuery(txHash);

  const rows = useMemo(() => {
    const baseRows: IDetailRowDef[] = [
      { key: 'txHash', label: 'Hash:' },
      { key: 'txOrder', label: 'Order Hash:' },
      { key: 'blockNumber', label: 'Block:' },
      { key: 'partition', label: 'Partition:' },
      { key: 'txType', label: 'Type:' },
      { key: 'unitID', label: 'Units:' },
      { key: 'timeout', label: 'Age:' },
      { key: 'fee', label: 'Fee:' },
      { key: 'status', label: 'Status:' },
    ];

    if (!data) {
      return baseRows;
    }

    const {
      TxRecordHash,
      TxOrderHash,
      BlockNumber,
      PartitionID,
      Transaction: { ServerMetadata, TransactionOrder },
    } = data;

    const { transactionType: rawType, timeout } =
      parseTransactionOrder(TransactionOrder);

    const numericType = Number(rawType);
    const txType = mapTransactionType(PartitionID, numericType);

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

    const statusMapping = mapSuccessIndicator(
      ServerMetadata?.SuccessIndicator ?? 0,
    );

    const valuesLookup: Record<string, React.ReactNode> = {
      blockNumber: (
        <Link
          to={`/${PartitionID}/blocks/${BlockNumber}`}
          className="text-[#08e8de] hover:underline"
        >
          {BlockNumber}
        </Link>
      ),
      fee: ServerMetadata?.ActualFee ?? 'N/A',
      partition: (
        <Link to={`/${PartitionID}`} className="text-[#08e8de] hover:underline">
          {getPartitionName(PartitionID)}
        </Link>
      ),
      status: (
        <div className="flex items-center space-x-2">
          <statusMapping.Icon />
          <span>{statusMapping.label}</span>
        </div>
      ),
      timeout: formatTimeout(timeout),
      txHash: (
        <CopyToClipboard
          text={TxRecordHash}
          displayText={shortenHash(TxRecordHash)}
        />
      ),
      txOrder: (
        <CopyToClipboard
          text={TxOrderHash}
          displayText={shortenHash(TxOrderHash) || 'N/A'}
        />
      ),
      txType: txType,
      unitID: unitID,
    };

    return baseRows.map((row) => ({
      ...row,
      value: valuesLookup[row.key],
    }));
  }, [data, partitionID]);

  return (
    <DetailsContainer
      label="Transaction"
      title={txHash}
      rowDefs={rows}
      isLoading={isLoading}
      error={error ? error.message : undefined}
    />
  );
};

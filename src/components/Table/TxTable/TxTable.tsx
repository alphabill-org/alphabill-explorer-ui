import React, { useMemo } from 'react';
import { Table } from '../Table';
import { Link } from 'react-router-dom';
import { ColumnDef } from '@tanstack/react-table';
export interface TableElementTx {
  txRecordHash: string;
  transactionType: string;
  blockNumber: number;
  timeout: string;
  actualFee: number;
  successIndicator: number;
  unitID: string;
  partitionID: number;
}

export interface TxInfo {
  TxRecordHash: string;
  TxOrderHash: string;
  BlockNumber: number;
  Transaction: {
    Version: number;
    TransactionOrder?: string;
    ServerMetadata?: {
      ActualFee: number;
      SuccessIndicator: number;
      ProcessingDetails: string;
    };
  };
  PartitionID: number;
}

const mapTxInfoToTableElement = (tx: TxInfo): TableElementTx => ({
  txRecordHash: tx.TxRecordHash,
  transactionType: 'Unknown',
  blockNumber: tx.BlockNumber,
  timeout: tx.Transaction?.ServerMetadata?.ProcessingDetails || 'N/A',
  actualFee: tx.Transaction?.ServerMetadata?.ActualFee ?? 0,
  successIndicator: tx.Transaction?.ServerMetadata?.SuccessIndicator ?? 0,
  unitID: 'N/A',
  partitionID: tx.PartitionID,
});

const baseTxColumns: Record<string, ColumnDef<TableElementTx, any>> = {
  txRecordHash: {
    accessorKey: 'txRecordHash',
    header: 'Tx Hash',
    cell: ({ getValue, row }) => {
      const txHash = getValue() as string;
      const partitionID = row.original.partitionID;

      return (
        <Link
          to={`/${partitionID}/transactions/${txHash}`}
          className="text-[#08e8de]"
        >
          {txHash}
        </Link>
      );
    },
  },
  transactionType: {
    accessorKey: 'transactionType',
    header: 'Tx Type',
  },
  blockNumber: {
    accessorKey: 'blockNumber',
    header: 'Block Number',
  },
  timeout: {
    accessorKey: 'timeout',
    header: 'Timeout',
  },
  actualFee: {
    accessorKey: 'actualFee',
    header: 'Actual Fee',
  },
  successIndicator: {
    accessorKey: 'successIndicator',
    header: 'Success Indicator',
  },
  unitID: {
    accessorKey: 'unitID',
    header: 'Unit ID',
  },
};

const getTxColumns = (isCompact: boolean): ColumnDef<TableElementTx>[] =>
  isCompact
    ? [
        baseTxColumns.txRecordHash,
        baseTxColumns.transactionType,
        baseTxColumns.unitID,
      ]
    : [
        baseTxColumns.txRecordHash,
        baseTxColumns.transactionType,
        baseTxColumns.blockNumber,
        baseTxColumns.timeout,
        baseTxColumns.actualFee,
        baseTxColumns.successIndicator,
      ];

interface TxTableProps {
  data: TxInfo[];
  compact?: boolean;
  isLoading?: boolean;
  error?: string;
}

export const TxTable: React.FC<TxTableProps> = ({
  data,
  compact = false,
  isLoading,
  error,
}) => {
  const tableData = useMemo(() => data.map(mapTxInfoToTableElement), [data]);
  const columns = useMemo(() => getTxColumns(compact), [compact]);

  return (
    <Table<TableElementTx>
      data={tableData}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
};

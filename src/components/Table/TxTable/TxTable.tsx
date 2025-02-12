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

const mapTxInfoToTableElement = (tx: TxInfo): TableElementTx => {
  return {
    txRecordHash: tx.TxRecordHash,
    transactionType: 'Unknown',
    blockNumber: tx.BlockNumber,
    timeout: tx.Transaction?.ServerMetadata?.ProcessingDetails || 'N/A',
    actualFee: tx.Transaction?.ServerMetadata?.ActualFee ?? 0,
    successIndicator: tx.Transaction?.ServerMetadata?.SuccessIndicator ?? 0,
    partitionID: tx.PartitionID,
  };
};

interface TxTableProps {
  data: TxInfo[];
}

export const TxTable: React.FC<TxTableProps> = ({ data }) => {
  const tableData = useMemo(() => data.map(mapTxInfoToTableElement), [data]);
  const columns = useMemo<ColumnDef<TableElementTx, any>[]>(
    () => [
      {
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
      { accessorKey: 'transactionType', header: 'Tx Type' },
      { accessorKey: 'blockNumber', header: 'Block Number' },
      { accessorKey: 'timeout', header: 'Timeout' },
      { accessorKey: 'actualFee', header: 'Actual Fee' },
      { accessorKey: 'successIndicator', header: 'Success Indicator' },
    ],
    [],
  );

  return <Table<TableElementTx> data={tableData} columns={columns} />;
};

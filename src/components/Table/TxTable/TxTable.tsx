import type { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import { ITxInfo } from '../../../api/transactions';
import { shortenHash } from '../../../utils/helpers';
import { mapSuccessIndicator } from '../../../utils/statusUtils';
import { formatTimeout } from '../../../utils/timeUtils';
import {
  parseTransactionOrder,
  mapTransactionType,
} from '../../../utils/txUtils';
import { Table } from '../Table';

export interface ITableElementTx {
  txRecordHash: string;
  transactionType: string;
  blockNumber: number;
  timeout: string;
  actualFee: number;
  successIndicator: number;
  unitID: string;
  partitionID: number;
}

const mapTxInfoToTableElement = (tx: ITxInfo): ITableElementTx => {
  const parsedOrder = parseTransactionOrder(tx.Transaction?.TransactionOrder);
  const partitionID = tx.PartitionID;

  const typeName = mapTransactionType(
    Number(partitionID),
    Number(parsedOrder.transactionType),
  );

  return {
    actualFee: tx.Transaction?.ServerMetadata?.ActualFee ?? 0,
    blockNumber: tx.BlockNumber,
    partitionID: tx.PartitionID,
    successIndicator: tx.Transaction?.ServerMetadata?.SuccessIndicator ?? 0,
    timeout: formatTimeout(parsedOrder.timeout),
    transactionType: typeName,
    txRecordHash: tx.TxRecordHash,
    unitID: tx.Transaction?.ServerMetadata?.TargetUnits?.join(', ') ?? 'N/A',
  };
};

const baseTxColumns: Record<string, ColumnDef<ITableElementTx>> = {
  actualFee: {
    accessorKey: 'actualFee',
    header: 'Fee',
  },
  blockNumber: {
    accessorKey: 'blockNumber',
    header: 'Block Number',
  },
  successIndicator: {
    accessorKey: 'successIndicator',
    cell: ({ getValue }) => {
      const status = getValue<number>();
      const { Icon } = mapSuccessIndicator(status);
      return (
        <div className="flex justify-end space-x-2">
          <Icon />
        </div>
      );
    },
    header: 'Status',
    size: 80,
  },
  timeout: {
    accessorKey: 'timeout',
    header: 'Timeout',
  },
  transactionType: {
    accessorKey: 'transactionType',
    header: 'Type',
  },
  txRecordHash: {
    accessorKey: 'txRecordHash',
    cell: ({ getValue, row }) => {
      const txHash = getValue() as string;
      const partitionID = row.original.partitionID;
      return (
        <Link
          to={`/${partitionID}/transactions/${txHash}`}
          className="text-[#08e8de]"
        >
          {shortenHash(txHash)}
        </Link>
      );
    },
    header: 'Tx Hash',
  },
  unitID: {
    accessorKey: 'unitID',
    header: 'Unit ID',
  },
};

const getTxColumns = (isCompact: boolean): ColumnDef<ITableElementTx>[] =>
  isCompact
    ? [
        baseTxColumns.txRecordHash,
        baseTxColumns.transactionType,
        baseTxColumns.actualFee,
      ]
    : [
        baseTxColumns.txRecordHash,
        baseTxColumns.transactionType,
        baseTxColumns.blockNumber,
        baseTxColumns.timeout,
        baseTxColumns.actualFee,
        baseTxColumns.successIndicator,
      ];

interface ITxTableProps {
  data: ITxInfo[];
  compact?: boolean;
  isLoading?: boolean;
  error?: string;
  pageSize?: number;
  manualPagination?: boolean;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const TxTable: React.FC<ITxTableProps> = ({
  data,
  compact = false,
  isLoading,
  error,
  pageSize,
  manualPagination,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const tableData = useMemo(() => data.map(mapTxInfoToTableElement), [data]);
  const columns = useMemo(() => getTxColumns(compact), [compact]);

  return (
    <Table<ITableElementTx>
      data={tableData}
      columns={columns}
      isLoading={isLoading}
      error={error}
      manualPagination={manualPagination}
      pageSize={pageSize}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
    />
  );
};

export default TxTable;

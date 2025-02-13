import React, { useMemo } from 'react';
import { Table } from '../Table';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';

export interface BlockInfo {
  BlockNumber: number;
  TxHashes: string[];
  ShardID: string;
  ProposerID: string;
  PartitionID: number;
}

export interface TableElementBlock {
  blockNumber: number;
  txCount: number;
  shardId: string;
  proposerId: string;
  timeAgo: string;
  partitionID: number;
}

const mapBlockInfoToTableElement = (block: BlockInfo): TableElementBlock => ({
  blockNumber: block.BlockNumber,
  txCount: Array.isArray(block.TxHashes) ? block.TxHashes.length : 0,
  shardId: block.ShardID,
  proposerId: block.ProposerID,
  timeAgo: 'N/A',
  partitionID: block.PartitionID,
});

const baseBlockColumns: Record<string, ColumnDef<TableElementBlock, any>> = {
  blockNumber: {
    accessorKey: 'blockNumber',
    header: 'Block Number',
    cell: ({ getValue, row }) => {
      const blockNumber = getValue() as number;
      const partitionID = row.original.partitionID;
      return (
        <Link
          to={`/${partitionID}/blocks/${blockNumber}`}
          className="text-[#08e8de]"
        >
          {blockNumber}
        </Link>
      );
    },
  },
  txCount: {
    accessorKey: 'txCount',
    header: 'Transactions Count',
  },
  shardId: {
    accessorKey: 'shardId',
    header: 'Shard ID',
  },
  proposerId: {
    accessorKey: 'proposerId',
    header: 'Proposer ID',
  },
  timeAgo: {
    accessorKey: 'timeAgo',
    header: 'Time Ago',
  },
};

const getBlockColumns = (isCompact: boolean): ColumnDef<TableElementBlock>[] =>
  isCompact
    ? [
        baseBlockColumns.blockNumber,
        baseBlockColumns.txCount,
        baseBlockColumns.timeAgo,
      ]
    : [
        baseBlockColumns.blockNumber,
        baseBlockColumns.txCount,
        baseBlockColumns.shardId,
        baseBlockColumns.proposerId,
      ];

interface BlockTableProps {
  data: BlockInfo[];
  compact?: boolean;
  isLoading?: boolean;
  error?: string;
}

export const BlockTable: React.FC<BlockTableProps> = ({
  data,
  compact = false,
  isLoading,
  error,
}) => {
  const tableData = useMemo(() => data.map(mapBlockInfoToTableElement), [data]);
  const columns = useMemo(() => getBlockColumns(compact), [compact]);

  return (
    <Table<TableElementBlock>
      data={tableData}
      columns={columns}
      isLoading={isLoading}
      error={error}
    />
  );
};

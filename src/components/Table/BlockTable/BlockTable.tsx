import type { ColumnDef } from '@tanstack/react-table';
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';

import type { IBlockInfo } from '../../../api/blocks';
import { parseCertificateValues } from '../../../utils/certificateUtils';
import { shortenHash } from '../../../utils/helpers';
import { Table } from '../Table';

export interface ITableElementBlock {
  blockNumber: number;
  txCount: number;
  shardId: string;
  proposerId: string;
  timeAgo: string;
  partitionID: number;
}

const mapBlockInfoToTableElement = (block: IBlockInfo): ITableElementBlock => {
  let timeAgo = 'N/A';

  if (block.UnicityCertificate) {
    const { timeAgo: parsedTime } = parseCertificateValues(
      block.UnicityCertificate,
    );
    timeAgo = parsedTime;
  }

  return {
    blockNumber: block.BlockNumber,
    partitionID: block.PartitionID,
    proposerId: shortenHash(block.ProposerID),
    shardId: block.ShardID,
    timeAgo,
    txCount: Array.isArray(block.TxHashes) ? block.TxHashes.length : 0,
  };
};

const baseBlockColumns: Record<string, ColumnDef<ITableElementBlock>> = {
  blockNumber: {
    accessorKey: 'blockNumber',
    cell: ({ getValue, row }) => {
      const blockNumber = getValue<number>();
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
    header: 'Block Number',
  },
  proposerId: {
    accessorKey: 'proposerId',
    header: 'Proposer ID',
  },
  shardId: {
    accessorKey: 'shardId',
    header: 'Shard ID',
  },
  timeAgo: {
    accessorKey: 'timeAgo',
    header: 'Time Ago',
  },
  txCount: {
    accessorKey: 'txCount',
    header: 'Transactions Count',
  },
};

const getBlockColumns = (
  isCompact: boolean,
): ColumnDef<ITableElementBlock>[] =>
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
        baseBlockColumns.timeAgo,
      ];

interface IBlockTableProps {
  data: IBlockInfo[];
  compact?: boolean;
  isLoading?: boolean;
  error?: string;
  manualPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const BlockTable: React.FC<IBlockTableProps> = ({
  data,
  compact = false,
  isLoading,
  error,
  manualPagination,
  pageSize,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const tableData = useMemo(() => data.map(mapBlockInfoToTableElement), [data]);
  const columns = useMemo(() => getBlockColumns(compact), [compact]);

  return (
    <Table<ITableElementBlock>
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

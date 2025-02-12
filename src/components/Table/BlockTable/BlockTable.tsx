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
  partitionID: number;
}

const mapBlockInfoToTableElement = (block: BlockInfo): TableElementBlock => {
  return {
    blockNumber: block.BlockNumber,
    txCount: Array.isArray(block.TxHashes) ? block.TxHashes.length : 0,
    shardId: block.ShardID,
    proposerId: block.ProposerID,
    partitionID: block.PartitionID,
  };
};

interface BlockTableProps {
  data: BlockInfo[];
}

export const BlockTable: React.FC<BlockTableProps> = ({ data }) => {
  const tableData = useMemo(() => data.map(mapBlockInfoToTableElement), [data]);

  const columns = useMemo<ColumnDef<TableElementBlock, any>[]>(
    () => [
      {
        accessorKey: 'blockNumber',
        header: 'Block Number',
        cell: ({ getValue, row }) => {
          const blockNumber = getValue() as number;
          return (
            <Link
              to={`/${row.original.partitionID}/blocks/${blockNumber}`}
              className="text-[#08e8de]"
            >
              {blockNumber}
            </Link>
          );
        },
      },
      { accessorKey: 'txCount', header: 'Transactions Count' },
      { accessorKey: 'shardId', header: 'Shard ID' },
      { accessorKey: 'proposerId', header: 'Proposer ID' },
    ],
    [],
  );

  return <Table<TableElementBlock> data={tableData} columns={columns} />;
};

import React, { useMemo } from 'react';
import { Table } from '../Table';
import { ColumnDef } from '@tanstack/react-table';

export interface BlockInfo {
  BlockNumber: number;
  TxHashes: string[];
  ShardID: string;
  ProposerID: string;
}

export interface TableElementBlock {
  blockNumber: number;
  txCount: number;
  shardId: string;
  proposerId: string;
}

const mapBlockInfoToTableElement = (block: BlockInfo): TableElementBlock => {
  return {
    blockNumber: block.BlockNumber,
    txCount: Array.isArray(block.TxHashes) ? block.TxHashes.length : 0,
    shardId: block.ShardID,
    proposerId: block.ProposerID,
  };
};

interface BlockTableProps {
  data: BlockInfo[];
}

export const BlockTable: React.FC<BlockTableProps> = ({ data }) => {
  const tableData = useMemo(() => data.map(mapBlockInfoToTableElement), [data]);

  const columns = useMemo<ColumnDef<TableElementBlock, any>[]>(
    () => [
      { accessorKey: 'blockNumber', header: 'Block Number' },
      { accessorKey: 'txCount', header: 'Transactions Count' },
      { accessorKey: 'shardId', header: 'Shard ID' },
      { accessorKey: 'proposerId', header: 'Proposer ID' },
    ],
    [],
  );

  return <Table<TableElementBlock> data={tableData} columns={columns} />;
};

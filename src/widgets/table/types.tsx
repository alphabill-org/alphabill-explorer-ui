type TableElementBlock = {
  id: bigint;
  blockNumber?: bigint;
  timeAgo?: string;
  proposerID?: string;
  txCount?: number;

  shardId?: string;
  earnedFees?: bigint;
  summaryValue?: string;

  blockHash?: string;
  previousBlockHash?: string;
};
type TableElementTx = {
  id: string;
  time?: string;
  from?: string;
  to?: string;
  amount?: number;
};
export type { TableElementBlock, TableElementTx };

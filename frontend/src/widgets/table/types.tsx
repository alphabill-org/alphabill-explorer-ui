type TableElementBlock = {
  id: number;
  blockNumber?: number;
  txCount?: number;
  shardId?: string;
  earnedFees?: number;
  summaryValue?: string;
  timestamp?: number;
};
type TableElementTx = {
  id: string;
  time?: string;
  from?: string;
  to?: string;
  amount?: number;
};
export type { TableElementBlock , TableElementTx};

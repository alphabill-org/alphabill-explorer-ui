type TableElementBlock = {
  id: number;
  blockNumber?: number;
  timestamp?: number;
  proposerID?: string;
  txCount?: number;
  
  shardId?: string;
  earnedFees?: number;
  summaryValue?: string;

  hash?: string;
  previousBlockHash?: string;

};
type TableElementTx = {
  id: string;
  time?: string;
  from?: string;
  to?: string;
  amount?: number;
};
export type { TableElementBlock , TableElementTx};

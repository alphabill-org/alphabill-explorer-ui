type FetchDataOptions = {
  pageIndex: number;
  pageSize: number;
};

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
  txRecordHash: string;
  txOrderHash: string;
  blockNumber: bigint;
  systemID: number;
  transactionType: string;
  unitID: string;
  timeout: number;
  actualFee: number;
  successIndicator: number;
};
export type { FetchDataOptions, TableElementBlock, TableElementTx };

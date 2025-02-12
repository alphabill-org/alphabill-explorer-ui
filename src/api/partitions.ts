const API_URL = import.meta.env.VITE_MONEY_BACKEND_URL;

export interface LatestBlock {
  PartitionID: number;
  PartitionTypeID: number;
  ShardID: string;
  ProposerID: string;
  PreviousBlockHash: string;
  TxHashes: number[][];
  UnicityCertificate: number[];
}

export interface LatestBlocksResponse {
  [partitionID: string]: LatestBlock;
}

export const fetchLatestBlocks = async (): Promise<LatestBlocksResponse> => {
  const response = await fetch(`${API_URL}/blocks/latest`);
  if (!response.ok) {
    throw new Error('Error fetching latest blocks');
  }
  return response.json();
};

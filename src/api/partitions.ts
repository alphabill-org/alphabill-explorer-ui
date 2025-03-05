const API_URL = import.meta.env.BACKEND_URL;

export interface ILatestBlock {
  PartitionID: number;
  PartitionTypeID: number;
  ShardID: string;
  ProposerID: string;
  PreviousBlockHash: string;
  TxHashes: number[][];
  UnicityCertificate: number[];
}

export interface ILatestBlocksResponse {
  [partitionID: string]: ILatestBlock;
}

export const fetchLatestBlocks = async (): Promise<ILatestBlocksResponse> => {
  const response = await fetch(`${API_URL}/blocks/latest`);
  if (!response.ok) {
    throw new Error('Error fetching latest blocks');
  }
  return response.json();
};

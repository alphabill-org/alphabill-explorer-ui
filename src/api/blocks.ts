const API_URL = import.meta.env.VITE_MONEY_BACKEND_URL;

export interface IBlockInfo {
  BlockNumber: number;
  TxHashes: string[];
  ShardID: string;
  ProposerID: string;
  PartitionID: number;
}

export const fetchBlocks = async (
  partitionID?: string,
): Promise<IBlockInfo[]> => {
  const pid = partitionID || '1';
  const response = await fetch(`${API_URL}/partitions/${pid}/blocks?limit=10`);
  if (!response.ok) {
    throw new Error('Error fetching blocks');
  }
  return response.json();
};

export const fetchPaginatedBlocks = async (
  partitionID: string,
  startBlock: number | undefined,
  limit: number,
): Promise<IBlockInfo[]> => {
  const pid = partitionID;
  const url = new URL(`${API_URL}/partitions/${pid}/blocks`);
  url.searchParams.set('limit', String(limit));
  if (startBlock !== undefined) {
    url.searchParams.set('startBlock', String(startBlock));
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching blocks');
  }
  return response.json();
};

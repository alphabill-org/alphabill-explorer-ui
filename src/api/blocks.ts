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

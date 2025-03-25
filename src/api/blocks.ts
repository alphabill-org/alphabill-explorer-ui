const BACKEND_URL = import.meta.env.BACKEND_URL;

export interface IBlockInfo {
  BlockNumber: number;
  TxHashes: string[];
  ShardID: string;
  ProposerID: string;
  PartitionID: number;
  PartitionTypeID: number;
  PreviousBlockHash: string;
  UnicityCertificate: string;
}

export const fetchBlocks = async (
  partitionID?: string,
): Promise<IBlockInfo[]> => {
  const pid = partitionID || '1';
  const response = await fetch(
    `${BACKEND_URL}/partitions/${pid}/blocks?limit=10`,
  );
  if (!response.ok) {
    throw new Error('Error fetching blocks');
  }
  return response.json();
};

export const fetchPaginatedBlocks = async (
  partitionID: string,
  startBlock: number | undefined,
  limit: number,
  includeEmpty: boolean = true,
): Promise<IBlockInfo[]> => {
  const pid = partitionID;
  const url = new URL(`${BACKEND_URL}/partitions/${pid}/blocks`);
  url.searchParams.set('limit', String(limit));
  if (startBlock !== undefined) {
    url.searchParams.set('startBlock', String(startBlock));
  }
  url.searchParams.set('includeEmpty', String(includeEmpty));

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching blocks');
  }
  return response.json();
};

export type IBlockDetailsResponse = Record<string, IBlockInfo>;

export const fetchBlockDetails = async (
  blockNumber: string,
  partitionID: string,
): Promise<IBlockDetailsResponse> => {
  const url = new URL(`${BACKEND_URL}/blocks/${blockNumber}`);
  url.searchParams.set('partitionID', partitionID);
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching block details');
  }
  return response.json();
};

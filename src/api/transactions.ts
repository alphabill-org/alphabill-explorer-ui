const API_URL = import.meta.env.VITE_MONEY_BACKEND_URL;

export interface ITxInfo {
  TxRecordHash: string;
  TxOrderHash: string;
  BlockNumber: number;
  Transaction: {
    Version: number;
  };
  PartitionID: number;
}

export const fetchTransactions = async (
  partitionID?: string,
): Promise<ITxInfo[]> => {
  const pid = partitionID || '1';
  const response = await fetch(`${API_URL}/partitions/${pid}/txs?limit=10`);
  if (!response.ok) {
    throw new Error('Error fetching transactions');
  }
  return response.json();
};

export const fetchPaginatedTransactions = async (
  partitionID: string,
  page: number,
  limit: number,
): Promise<ITxInfo[]> => {
  const pid = partitionID || '1';
  const url = new URL(`${API_URL}/partitions/${pid}/txs`);
  url.searchParams.set('limit', String(limit));
  if (page > 0) {
    url.searchParams.set('startID', String(page * limit));
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching transactions');
  }
  return response.json();
};

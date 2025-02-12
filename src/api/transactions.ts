const API_URL = import.meta.env.VITE_MONEY_BACKEND_URL;

export interface TxInfo {
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
): Promise<TxInfo[]> => {
  const pid = partitionID || '1';
  const response = await fetch(`${API_URL}/partitions/${pid}/txs?limit=10`);
  if (!response.ok) {
    throw new Error('Error fetching transactions');
  }
  return response.json();
};

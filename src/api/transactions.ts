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

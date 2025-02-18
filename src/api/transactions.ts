const API_URL = import.meta.env.VITE_MONEY_BACKEND_URL;

export interface ITxInfo {
  TxRecordHash: string;
  TxOrderHash: string;
  BlockNumber: number;
  Transaction: {
    Version: number;
    TransactionOrder?: string;
    ServerMetadata?: {
      ActualFee: number;
      SuccessIndicator: number;
      ProcessingDetails: string;
    };
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

const parseHeader = (header: string): string | null => {
  const match = header.match(/<([^>]+)>;\s*rel="next"/);
  if (match) {
    const urlStr = match[1];
    try {
      const url = new URL(urlStr, API_URL);
      return url.searchParams.get('offsetKey');
    } catch (e) {
      console.error('Error constructing URL from Link header', e);
      return null;
    }
  }
  return null;
};

export const fetchPaginatedTransactions = async (
  partitionID: string,
  startID: string | undefined,
  limit: number,
): Promise<{ data: ITxInfo[]; previousID: string | null }> => {
  const pid = partitionID;
  const url = new URL(`${API_URL}/partitions/${pid}/txs`);
  url.searchParams.set('limit', String(limit));
  if (startID) {
    url.searchParams.set('startID', startID);
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error('Error fetching transactions');
  }
  const header = response.headers.get('Link');
  const previousID = header ? parseHeader(header) : null;
  const data: ITxInfo[] = await response.json();

  return { data, previousID };
};

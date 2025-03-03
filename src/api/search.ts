import { type IBlockInfo } from './blocks';
import { type ITxInfo } from './transactions';
const API_URL = import.meta.env.VITE_BACKEND_URL;

export interface ISearchResponse {
  blocks: Record<string, IBlockInfo>;
  txs: ITxInfo[];
}

export const fetchSearchResults = async (
  q: string,
  partitionID?: number,
): Promise<ISearchResponse> => {
  const url = new URL(`${API_URL}/search`);
  url.searchParams.set('q', q);
  if (partitionID) {
    url.searchParams.set('partitionID', String(partitionID));
  }
  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error searching: ${response.statusText}`);
  }
  return response.json();
};

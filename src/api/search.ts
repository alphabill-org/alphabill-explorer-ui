import type { IBlockInfo } from './blocks';
import type { ITxInfo } from './transactions';

const BACKEND_URL = import.meta.env.BACKEND_URL;

export interface ISearchResponse {
  blocks: Record<string, IBlockInfo>;
  txs: ITxInfo[];
}
interface IServerSearchResponse {
  Blocks?: Record<string, IBlockInfo>;
  Txs?: ITxInfo[];
}

export async function fetchSearchResults(
  q: string,
  partitionID?: number,
): Promise<ISearchResponse> {
  const url = new URL(`${BACKEND_URL}/search`);
  url.searchParams.set('q', q);

  if (partitionID !== undefined) {
    url.searchParams.set('partitionID', String(partitionID));
  }

  const response = await fetch(url.toString());
  if (!response.ok) {
    throw new Error(`Error searching: ${response.statusText}`);
  }

  const data = (await response.json()) as IServerSearchResponse;

  return {
    blocks: data.Blocks ?? {},
    txs: data.Txs ?? [],
  };
}

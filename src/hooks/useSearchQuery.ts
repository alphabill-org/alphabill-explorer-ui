import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { IBlockInfo } from '../api/blocks';
import { ITxInfo } from '../api/transactions';

const API_URL = import.meta.env.BACKEND_URL;

export interface ISearchResponse {
  blocks: Record<string, IBlockInfo>;
  txs: ITxInfo[];
}

interface IServerSearchResponse {
  Blocks?: Record<string, IBlockInfo>;
  Txs?: ITxInfo[];
}

async function fetchSearchResults(q: string): Promise<ISearchResponse> {
  const url = new URL(`${API_URL}/search`);
  url.searchParams.set('q', q);

  const response = await fetch(url.toString());
  if (!response.ok) {
    if (response.status === 404) {
      throw new Error('No results found');
    }
    throw new Error(`Search request failed with status ${response.status}`);
  }

  const data = (await response.json()) as IServerSearchResponse;

  return {
    blocks: data.Blocks ?? {},
    txs: data.Txs ?? [],
  };
}

export function useSearchQuery(
  q: string,
): UseQueryResult<ISearchResponse, Error> {
  return useQuery<ISearchResponse, Error>({
    enabled: false,
    queryFn: () => fetchSearchResults(q),
    queryKey: ['searchResults', q],
  });
}

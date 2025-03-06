import { useQuery, type UseQueryResult } from '@tanstack/react-query';

import { fetchSearchResults, type ISearchResponse } from '../api/search';

export function useSearchQuery(
  q: string,
): UseQueryResult<ISearchResponse, Error> {
  return useQuery<ISearchResponse, Error>({
    enabled: false,
    queryFn: () => fetchSearchResults(q),
    queryKey: ['searchResults', q],
  });
}

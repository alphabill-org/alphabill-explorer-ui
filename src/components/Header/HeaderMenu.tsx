import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

import { fetchLatestBlocks, ILatestBlocksResponse } from '../../api/partitions';

export const HeaderMenu: React.FC = () => {
  const { data, isLoading, error } = useQuery<ILatestBlocksResponse>({
    queryFn: fetchLatestBlocks,
    queryKey: ['latestBlocks'],
  });

  if (isLoading) return <div>Loading partitions...</div>;
  if (error) return <div>Error loading partitions</div>;

  const partitionIDs = data ? Object.keys(data) : [];

  return (
    <nav className="flex space-x-4">
      {partitionIDs.map((id) => (
        <Link
          key={id}
          to={`/${id}`}
          className="text-white hover:text-[var(--color-secondary)]"
        >
          Partition {id}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderMenu;

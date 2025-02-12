import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { fetchLatestBlocks, LatestBlocksResponse } from '../../api/partitions';

export const HeaderMenu: React.FC = () => {
  const { data, isLoading, error } = useQuery<LatestBlocksResponse>({
    queryKey: ['latestBlocks'],
    queryFn: fetchLatestBlocks,
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

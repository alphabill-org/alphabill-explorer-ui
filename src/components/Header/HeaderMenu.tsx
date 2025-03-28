import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';

import { fetchLatestBlocks, ILatestBlocksResponse } from '../../api/partitions';
import { getPartitionName } from '../../utils/partitionUtils';

export const HeaderMenu: React.FC = () => {
  const { data, isLoading, error } = useQuery<ILatestBlocksResponse>({
    queryFn: fetchLatestBlocks,
    queryKey: ['latestBlocks'],
  });

  if (isLoading) return <div>Loading partitions...</div>;
  if (error) return <div>Error loading partitions</div>;

  const partitions = data ? Object.values(data) : [];

  return (
    <nav className="flex space-x-4">
      <Link
        key="home"
        to="/"
        className="text-white hover:text-[var(--color-secondary)]"
      >
        Home
      </Link>

      {partitions.map((partition, index) => {
        const numericPartitionID = partition.PartitionID;
        const numericPartitionTypeID = partition.PartitionTypeID;
        const partitionName = getPartitionName(numericPartitionTypeID);

        return (
          <Link
            key={index}
            to={`/${numericPartitionID}`}
            className="text-white hover:text-[var(--color-secondary)]"
          >
            {partitionName}
          </Link>
        );
      })}
    </nav>
  );
};

export default HeaderMenu;

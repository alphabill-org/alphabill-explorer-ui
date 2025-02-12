import React from 'react';
import { useParams } from 'react-router-dom';

export const PartitionBlocks: React.FC = () => {
  const { partitionID } = useParams<{ partitionID: string }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Blocks for Partition {partitionID}</h1>
      <p>Partition ID: {partitionID}</p>
    </div>
  );
};

import React from 'react';
import { useParams } from 'react-router-dom';

export const BlockDetails: React.FC = () => {
  const { partitionID, blockNumber } = useParams<{
    partitionID: string;
    blockNumber: string;
  }>();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Transaction Details</h1>
      <p>Partition ID: {partitionID}</p>
      <p>Block Nr: {blockNumber}</p>
    </div>
  );
};

// src/routes/TxDetails.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

export const TxDetails: React.FC = () => {
  const { partitionID, txHash } = useParams<{
    partitionID: string;
    txHash: string;
  }>();

  // For now, simply display the params.
  // In a real app you’d fetch and display the detailed tx info.
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Transaction Details</h1>
      <p>Partition ID: {partitionID}</p>
      <p>Transaction Hash: {txHash}</p>
    </div>
  );
};

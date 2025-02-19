import React from 'react';
import { useParams, Link } from 'react-router-dom';

import {
  DetailsContainer,
  IDetailRowDef,
} from '../components/Details/DetailsContainer';
import { useBlockDetailsQuery } from '../hooks/useBlockDetails';
import { parseCertificateValues } from '../utils/certificateUtils';

export const BlockDetails: React.FC = () => {
  const { partitionID, blockNumber } = useParams<{
    partitionID: string;
    blockNumber: string;
  }>();

  if (!partitionID || !blockNumber) {
    return (
      <div className="container mx-auto p-4">
        <p className="text-center">Missing partitionID or blockNumber</p>
      </div>
    );
  }

  const { data, isLoading, error } = useBlockDetailsQuery(
    blockNumber,
    partitionID,
  );

  const baseRowDefs: IDetailRowDef[] = [
    { label: 'Block Hash:' },
    { label: 'Block:', value: blockNumber },
    { label: 'Previous Block Hash:' },
    { label: 'Proposer ID:' },
    { borderTop: true, label: 'Shard:' },
    { label: 'Summary Value:' },
    { borderTop: true, label: 'Timestamp:' },
    { label: 'Transactions:' },
  ];

  let loadedRowDefs: IDetailRowDef[] = baseRowDefs;

  if (!isLoading && !error && data && Object.keys(data).length > 0) {
    const blockKey = Object.keys(data)[0];
    const blockDetails = data[blockKey];
    const {
      BlockNumber,
      ProposerID,
      ShardID,
      PreviousBlockHash,
      TxHashes,
      UnicityCertificate,
    } = blockDetails;

    let timeAgo = 'N/A';
    let summaryValue = 'N/A';
    let blockHash = 'N/A';
    let previousHash = PreviousBlockHash || 'N/A';

    if (UnicityCertificate && typeof UnicityCertificate === 'string') {
      const certValues = parseCertificateValues(UnicityCertificate);
      timeAgo = certValues.timeAgo;
      summaryValue = certValues.summaryValue;
      blockHash = certValues.blockHash;
      previousHash = certValues.previousHash;
    }

    const valuesLookup: Record<string, React.ReactNode> = {
      'Block Hash:': blockHash,
      'Block:': BlockNumber,
      'Previous Block Hash:': previousHash,
      'Proposer ID:': ProposerID,
      'Shard:': ShardID,
      'Summary Value:': summaryValue,
      'Timestamp:': timeAgo,
      'Transactions:':
        TxHashes && TxHashes.length > 0 ? (
          <div className="flex flex-col space-y-1">
            {TxHashes.map((txHash) => (
              <Link
                key={txHash}
                to={`/${partitionID}/transactions/${txHash}`}
                className="text-[#08e8de] hover:underline"
              >
                {txHash}
              </Link>
            ))}
          </div>
        ) : (
          'N/A'
        ),
    };

    loadedRowDefs = baseRowDefs.map((row) => ({
      ...row,
      value: valuesLookup[row.label],
    }));
  }

  return (
    <DetailsContainer
      title={blockNumber}
      rowDefs={loadedRowDefs}
      isLoading={isLoading}
      error={error ? error.message : undefined}
    />
  );
};

export default BlockDetails;

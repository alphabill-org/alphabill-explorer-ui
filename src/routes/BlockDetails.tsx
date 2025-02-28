import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';

import { CopyToClipboard } from '../components/Common/CopyToClipboard';
import {
  DetailsContainer,
  IDetailRowDef,
} from '../components/Details/DetailsContainer';
import { useBlockDetailsQuery } from '../hooks/useBlockDetails';
import { parseCertificateValues } from '../utils/certificateUtils';
import { shortenHash } from '../utils/helpers';
import { getPartitionName } from '../utils/partitionUtils';

export const BlockDetails: React.FC = () => {
  const { partitionID, blockNumber } = useParams<{
    partitionID: string;
    blockNumber: string;
  }>();

  if (!partitionID || !blockNumber) {
    return (
      <div className="container mx-auto">
        <p className="text-center">Missing partitionID or blockNumber</p>
      </div>
    );
  }

  const { data, isLoading, error } = useBlockDetailsQuery(
    blockNumber,
    partitionID,
  );

  const rows = useMemo(() => {
    const baseRows: IDetailRowDef[] = [
      { key: 'blockHash', label: 'Block Hash:' },
      { key: 'previousBlockHash', label: 'Previous Block Hash:' },
      { key: 'partition', label: 'Partition:' },
      { key: 'proposerID', label: 'Proposer ID:' },
      { borderTop: true, key: 'shard', label: 'Shard:' },
      { key: 'summaryValue', label: 'Summary Value:' },
      { borderTop: true, key: 'time', label: 'Time:' },
      { key: 'transactions', label: 'Transactions:' },
    ];

    if (!data || Object.keys(data).length === 0) {
      return baseRows;
    }

    const blockKey = Object.keys(data)[0];
    const blockDetails = data[blockKey];
    const {
      PartitionID,
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
      blockHash: (
        <CopyToClipboard
          text={blockHash}
          displayText={shortenHash(blockHash)}
        />
      ),
      partition: (
        <Link to={`/${partitionID}`} className="text-[#08e8de] hover:underline">
          {getPartitionName(PartitionID)}
        </Link>
      ),
      previousBlockHash: (
        <CopyToClipboard
          text={previousHash}
          displayText={shortenHash(previousHash)}
        />
      ),
      proposerID: (
        <CopyToClipboard text={ProposerID} displayText={ProposerID} />
      ),
      shard: ShardID,
      summaryValue,
      time: timeAgo,
      transactions:
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

    return baseRows.map((row) => ({
      ...row,
      value: valuesLookup[row.key],
    }));
  }, [data, partitionID]);

  return (
    <DetailsContainer
      title={blockNumber}
      label="Block"
      rowDefs={rows}
      isLoading={isLoading}
      error={error ? error.message : undefined}
    />
  );
};

import { Base16Converter } from '@alphabill/alphabill-js-sdk/lib/util/Base16Converter';
import React from 'react';
import { useParams } from 'react-router-dom';

import {
  DetailsContainer,
  IDetailRowDef,
} from '../components/Details/DetailsContainer';
import { useBlockDetailsQuery } from '../hooks/useBlockDetails';
import {
  getCertificateTimeAgo,
  extractSummaryValue,
} from '../utils/certificateUtils';

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
    if (UnicityCertificate && typeof UnicityCertificate === 'string') {
      try {
        timeAgo = getCertificateTimeAgo(UnicityCertificate);
        let certHex = UnicityCertificate;
        if (certHex.startsWith('0x')) {
          certHex = certHex.slice(2);
        }
        const rawCert = Base16Converter.decode(certHex);
        summaryValue = extractSummaryValue(rawCert);
      } catch (e) {
        console.error('Error decoding certificate in block details', e);
      }
    }

    const valuesLookup: Record<string, React.ReactNode> = {
      'Block Hash:': 'N/A',
      'Block:': BlockNumber,
      'Previous Block Hash:': PreviousBlockHash || 'N/A',
      'Proposer ID:': ProposerID,
      'Shard:': ShardID,
      'Summary Value:': summaryValue,
      'Timestamp:': timeAgo,
      'Transactions:':
        TxHashes && TxHashes.length > 0 ? TxHashes.join(', ') : 'N/A',
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

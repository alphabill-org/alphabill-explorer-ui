import { Base16Converter } from '@alphabill/alphabill-js-sdk/lib/util/Base16Converter';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useBlockDetailsQuery } from '../hooks/useBlockDetails';
import {
  getCertificateTimeAgo,
  extractSummaryValue,
} from '../utils/certificateUtils';

interface IDetailRowProps {
  label: string;
  value?: React.ReactNode;
  loading?: boolean;
  borderTop?: boolean;
}

const DetailRow: React.FC<IDetailRowProps> = ({
  label,
  value,
  loading,
  borderTop,
}) => (
  <div
    className={`flex flex-col md:flex-row mb-6 ${
      borderTop ? 'pt-8 border-t border-secondary/80' : ''
    }`}
  >
    <span className="md:basis-3/12 font-semibold">{label}</span>
    <div className="text-white md:basis-9/12">
      {loading ? <div className="h-6 bg-header-bg/50 animate-pulse" /> : value}
    </div>
  </div>
);

const Container: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="container mx-auto p-4">
    <section className="bg-black/50">
      <div
        className="px-10 py-10 space-y-8 mx-auto"
        style={{ minHeight: '400px' }}
      >
        {children}
      </div>
    </section>
  </div>
);

export const BlockDetails: React.FC = () => {
  const { partitionID, blockNumber } = useParams<{
    partitionID: string;
    blockNumber: string;
  }>();

  if (!partitionID || !blockNumber) {
    return (
      <Container>
        <p className="text-center">Missing partitionID or blockNumber</p>
      </Container>
    );
  }

  const { data, isLoading, error } = useBlockDetailsQuery(
    blockNumber,
    partitionID,
  );

  const rowDefs = [
    { label: 'Block Hash:' },
    { label: 'Block:' },
    { label: 'Previous Block Hash:' },
    { label: 'Proposer ID:' },
    { borderTop: true, label: 'Shard:' },
    { label: 'Summary Value:' },
    { borderTop: true, label: 'Timestamp:' },
    { label: 'Transactions:' },
  ];

  if (isLoading) {
    return (
      <Container>
        {rowDefs.map((row, idx) => (
          <DetailRow
            key={idx}
            label={row.label}
            loading
            borderTop={row.borderTop}
          />
        ))}
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <p className="text-center">
          Error loading block details: {error.message}
        </p>
      </Container>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <Container>
        <p className="text-center">No block details available.</p>
      </Container>
    );
  }

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

  return (
    <Container>
      <h1 className="text-5xl font-bold text-white mb-8">{BlockNumber}</h1>

      {rowDefs.map((row, idx) => (
        <DetailRow
          key={idx}
          label={row.label}
          value={valuesLookup[row.label]}
          borderTop={row.borderTop}
        />
      ))}
    </Container>
  );
};

export default BlockDetails;

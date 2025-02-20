import React from 'react';

export interface IDetailRowDef {
  label: string;
  value?: React.ReactNode;
  borderTop?: boolean;
}

interface IContainerProps {
  children: React.ReactNode;
}

const Container: React.FC<IContainerProps> = ({ children }) => (
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
    className={`flex flex-col md:flex-row mb-6 break-all ${
      borderTop ? 'pt-8 border-t border-secondary/80' : ''
    }`}
  >
    <span className="md:basis-3/12 font-semibold">{label}</span>
    <div className="text-white md:basis-9/12 flex flex-col gap-2">
      {loading ? <div className="h-6 bg-header-bg/50 animate-pulse" /> : value}
    </div>
  </div>
);

export interface IDetailsContainerProps {
  title: React.ReactNode;
  label?: string;
  rowDefs: IDetailRowDef[];
  isLoading?: boolean;
  error?: string;
}

export const DetailsContainer: React.FC<IDetailsContainerProps> = ({
  title,
  label,
  rowDefs,
  isLoading,
  error,
}) => {
  return (
    <Container>
      <div className="text-light-blue/80 mb-2">{label}</div>
      <h1 className="text-5xl font-bold break-all mb-8">{title}</h1>
      {error ? (
        <p className="text-center">Error loading details: {error}</p>
      ) : isLoading ? (
        rowDefs.map((row, idx) => (
          <DetailRow
            key={idx}
            label={row.label}
            value={row.value}
            loading={row.value === undefined}
            borderTop={row.borderTop}
          />
        ))
      ) : rowDefs.length === 0 ? (
        <p className="text-center">No details available.</p>
      ) : (
        rowDefs.map((row, idx) => (
          <DetailRow
            key={idx}
            label={row.label}
            value={row.value}
            borderTop={row.borderTop}
          />
        ))
      )}
    </Container>
  );
};

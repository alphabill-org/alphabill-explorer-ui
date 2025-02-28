import React from 'react';

export interface IDetailRowDef {
  key: string;
  label: string;
  value?: React.ReactNode;
  borderTop?: boolean;
}

export interface IDetailsContainerProps {
  title: React.ReactNode;
  label?: string;
  rowDefs: IDetailRowDef[];
  isLoading?: boolean;
  error?: string;
}

interface IContainerProps {
  children: React.ReactNode;
}
interface IDetailRowProps {
  label: string;
  value?: React.ReactNode;
  loading?: boolean;
  borderTop?: boolean;
}

const Container: React.FC<IContainerProps> = ({ children }) => (
  <div className="container mx-auto ">
    <section className="bg-black/50">
      <div
        className="p-4 md:p-10 space-y-8 mx-auto"
        style={{ minHeight: '400px' }}
      >
        {children}
      </div>
    </section>
  </div>
);

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
      {loading ? <div className="h-6 bg-accent/50 animate-pulse" /> : value}
    </div>
  </div>
);

export const DetailsContainer: React.FC<IDetailsContainerProps> = ({
  title,
  label,
  rowDefs,
  isLoading,
  error,
}) => {
  const renderContent = (): React.ReactNode => {
    if (error) {
      return <p className="text-center">{error}</p>;
    }

    if (isLoading) {
      return rowDefs.map((row) => (
        <DetailRow
          key={row.key}
          label={row.label}
          loading={true}
          borderTop={row.borderTop}
        />
      ));
    }
    if (rowDefs.length === 0) {
      return <p className="text-center">No details available.</p>;
    }
    return rowDefs.map((row) => (
      <DetailRow
        key={row.key}
        label={row.label}
        value={row.value}
        borderTop={row.borderTop}
      />
    ));
  };

  return (
    <Container>
      <div className="text-light-blue/80 mb-2">{label}</div>
      <h1 className="text-5xl font-bold break-all mb-8">{title}</h1>
      {renderContent()}
    </Container>
  );
};

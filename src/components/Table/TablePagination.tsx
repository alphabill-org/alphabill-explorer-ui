import React from 'react';

interface ITablePaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
  dataLength: number;
  pageSize: number;
}

interface IPaginationItemProps {
  label: React.ReactNode;
  targetPage: number;
  isLoading: boolean;
  onPageChange: (page: number) => void;
}

const PaginationItem: React.FC<IPaginationItemProps> = ({
  label,
  targetPage,
  isLoading,
  onPageChange,
}) => {
  const disabledClass = 'pointer-events-none opacity-50';
  return (
    <span
      onClick={() => {
        if (!isLoading) onPageChange(targetPage);
      }}
      className={`cursor-pointer px-3 py-1 rounded ${
        isLoading ? disabledClass : 'hover:bg-accent'
      }`}
    >
      {label}
    </span>
  );
};

export const TablePagination: React.FC<ITablePaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading,
}): React.ReactElement | null => {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center mt-5 space-x-2">
      {currentPage > 1 && (
        <>
          <PaginationItem
            label={'<'}
            targetPage={currentPage - 1}
            isLoading={isLoading}
            onPageChange={onPageChange}
          />
          <PaginationItem
            label={currentPage - 1}
            targetPage={currentPage - 1}
            isLoading={isLoading}
            onPageChange={onPageChange}
          />
        </>
      )}
      <span className="px-3 py-1 rounded bg-accent">{currentPage}</span>
      {currentPage < totalPages && (
        <>
          <PaginationItem
            label={currentPage + 1}
            targetPage={currentPage + 1}
            isLoading={isLoading}
            onPageChange={onPageChange}
          />
          <PaginationItem
            label={'>'}
            targetPage={currentPage + 1}
            isLoading={isLoading}
            onPageChange={onPageChange}
          />
        </>
      )}
    </div>
  );
};

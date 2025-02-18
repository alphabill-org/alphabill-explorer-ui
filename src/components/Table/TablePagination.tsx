import React from 'react';

interface ITablePaginationProps {
  onNextPage?: () => void;
  onPreviousPage?: () => void;
  isLoading: boolean;
  dataLength: number;
  pageSize: number;
}

export const TablePagination: React.FC<ITablePaginationProps> = ({
  onNextPage,
  onPreviousPage,
  isLoading,
  dataLength,
  pageSize,
}): React.ReactElement => {
  return (
    <div className="flex items-center justify-center mt-5 space-x-2">
      {onPreviousPage && (
        <button
          onClick={onPreviousPage}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Previous
        </button>
      )}
      {onNextPage && (
        <button
          onClick={onNextPage}
          disabled={dataLength < pageSize || isLoading}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      )}
    </div>
  );
};

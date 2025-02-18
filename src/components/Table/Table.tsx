import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table';
import React from 'react';

import { TablePagination } from './TablePagination';

export interface ITableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  tableClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  isLoading?: boolean;
  error?: string;
  manualPagination?: boolean;
  pageSize?: number;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

const LoadingRows = <TData extends RowData>({
  pageSize,
  columns,
  cellClassName,
}: {
  pageSize: number;
  columns: ColumnDef<TData>[];
  cellClassName?: string;
}): React.ReactElement => {
  return (
    <>
      {Array.from({ length: pageSize }).map((_, rowIndex) => (
        <tr key={rowIndex} className="table-divider-v2">
          <td
            colSpan={columns.length}
            className={`py-4 px-7 md:px-0 ${cellClassName}`}
          >
            <div className="h-6 w-full bg-header-bg/50 animate-pulse" />
          </td>
        </tr>
      ))}
    </>
  );
};

const ErrorRow = <TData extends RowData>({
  error,
  columns,
}: {
  error: string;
  columns: ColumnDef<TData>[];
}): React.ReactElement => {
  return (
    <tr>
      <td colSpan={columns.length}>
        <div className="w-full flex justify-center items-center h-[200px] text-white">
          <h3>{error}</h3>
        </div>
      </td>
    </tr>
  );
};

const NoDataRow = <TData extends RowData>({
  columns,
}: {
  columns: ColumnDef<TData>[];
}): React.ReactElement => {
  return (
    <tr>
      <td colSpan={columns.length}>
        <div className="w-full flex justify-center items-center h-[200px] text-white">
          <h3>No data available</h3>
        </div>
      </td>
    </tr>
  );
};

export function Table<TData extends RowData>({
  data,
  columns,
  tableClassName = '',
  headerClassName = '',
  cellClassName = '',
  isLoading = false,
  error = '',
  manualPagination = false,
  pageSize = 10,
  currentPage,
  totalPages,
  onPageChange,
}: ITableProps<TData>): React.ReactElement {
  const tableInstance = useReactTable({
    columns,
    data: isLoading ? [] : data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: manualPagination,
  });

  const renderBody = (): React.ReactElement => {
    if (isLoading) {
      return (
        <LoadingRows<TData>
          pageSize={pageSize}
          columns={columns}
          cellClassName={cellClassName}
        />
      );
    }
    if (error) {
      return <ErrorRow<TData> error={error} columns={columns} />;
    }
    if (data.length === 0) {
      return <NoDataRow<TData> columns={columns} />;
    }
    return (
      <>
        {tableInstance.getRowModel().rows.map((row, index) => (
          <tr
            key={row.id}
            className={
              index < tableInstance.getRowModel().rows.length - 1
                ? 'table-divider-v2'
                : 'table-divider-v1'
            }
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className={`py-4 px-7 md:px-0 overflow-hidden text-ellipsis whitespace-nowrap truncate ${cellClassName}`}
                style={{ width: cell.column.getSize() }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </>
    );
  };

  return (
    <div
      className={`px-5 block max-w-full overflow-x-auto overflow-y-hidden custom-scroll text-center table-main ${tableClassName}`}
    >
      <table className={`w-full table-fixed ${tableClassName}`}>
        <thead className="table-column-header">
          {tableInstance.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-center">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className={`pb-3 px-7 md:px-2 ${headerClassName}`}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>{renderBody()}</tbody>
      </table>
      {manualPagination &&
        currentPage !== undefined &&
        totalPages !== undefined &&
        onPageChange && (
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            isLoading={isLoading}
            dataLength={data.length}
            pageSize={pageSize}
          />
        )}
    </div>
  );
}

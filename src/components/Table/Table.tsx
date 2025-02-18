import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  type ColumnDef,
  type RowData,
} from '@tanstack/react-table';
import { ReactElement } from 'react';

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
  onNextPage?: () => void;
  onPreviousPage?: () => void;
}

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
  onNextPage,
  onPreviousPage,
}: ITableProps<TData>): ReactElement {
  const tableInstance = useReactTable({
    columns,
    data: isLoading ? [] : data,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: manualPagination,
  });

  return (
    <div
      className={`px-5 block max-w-full overflow-x-auto overflow-y-hidden custom-scroll text-center table-main ${tableClassName}`}
    >
      {error ? (
        <div className="bg-black bg-opacity-50 w-full flex justify-center items-center h-[60vh] text-white">
          <h3>{error}</h3>
        </div>
      ) : (
        <>
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
            <tbody>
              {isLoading
                ? Array.from({ length: pageSize }).map((_, rowIndex) => (
                    <tr key={rowIndex} className="table-divider-v2">
                      <td
                        colSpan={columns.length}
                        className={`py-4 px-7 md:px-0 ${cellClassName}`}
                      >
                        <div className="h-5 w-full bg-header-bg animate-pulse" />
                      </td>
                    </tr>
                  ))
                : tableInstance.getRowModel().rows.map((row, index) => (
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
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
            </tbody>
          </table>
          {manualPagination && (onNextPage || onPreviousPage) && (
            <div className="flex items-center justify-end mt-2 space-x-2">
              <button
                onClick={onPreviousPage}
                disabled={!onPreviousPage}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={onNextPage}
                disabled={data.length < pageSize || isLoading}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

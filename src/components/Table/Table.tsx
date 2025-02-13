import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
  RowData,
} from '@tanstack/react-table';

export interface TableProps<TData extends RowData> {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  tableClassName?: string;
  headerClassName?: string;
  cellClassName?: string;
  isLoading?: boolean;
  error?: string;
}

export function Table<TData extends RowData>({
  data,
  columns,
  tableClassName = '',
  headerClassName = '',
  cellClassName = '',
  isLoading,
  error,
}: TableProps<TData>) {
  if (error) {
    return (
      <div className="bg-black bg-opacity-50 w-full flex justify-center items-center h-[60vh] text-white">
        <h3>No data found...</h3>
      </div>
    );
  }

  const tableInstance = useReactTable({
    data: isLoading ? [] : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
        <tbody>
          {isLoading
            ? Array.from({ length: 10 }).map((_, rowIndex) => (
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
    </div>
  );
}

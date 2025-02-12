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
}

export function Table<TData extends RowData>({
  data,
  columns,
  tableClassName = '',
  headerClassName = '',
  cellClassName = '',
}: TableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div
      className={`px-5 block max-w-full overflow-x-auto overflow-y-hidden custom-scroll text-center table-main`}
    >
      <table className={`w-full ${tableClassName}`}>
        <thead className="table-column-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="text-center">
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="pb-3 px-7 md:px-2">
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={
                index < table.getRowModel().rows.length - 1
                  ? 'table-divider-v2'
                  : 'table-divider-v1'
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`py-4 px-7 md:px-0 ${cellClassName}`}
                  style={{ width: cell.column.getSize() }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

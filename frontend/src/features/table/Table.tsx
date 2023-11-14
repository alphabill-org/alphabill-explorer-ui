import {
  ColumnDef,
  PaginationState,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import React from "react";
import { TablePagination } from "../../entities";
import { useQuery } from "@tanstack/react-query";

interface ReactTableProps<TData> {
  queryKey: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  isPaginate?: boolean;
  dataCount?: number;
  fetchDataFn: (options?: {
    pageIndex: number;
    pageSize: number;
  }) => Promise<{ rows: TData[] }>;
}

const Table = <TData extends object>({
  queryKey,
  data,
  columns,
  className,
  isPaginate = false,
  dataCount = data.length,
  fetchDataFn,
}: ReactTableProps<TData>) => {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0,
      pageSize: 10,
    });

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };
  const defaultData = React.useMemo(() => data, []);

  const dataQuery = useQuery({
    queryKey: [queryKey, fetchDataOptions],
    queryFn: () => fetchDataFn(fetchDataOptions),
  });

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: Math.ceil(dataCount / pageSize) ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });

  if (dataQuery?.isFetching) {
    return <h2 className=" text-red-400">Loading...</h2>;
  }

  return (
    <div>
      <table className={className}>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      {isPaginate && <TablePagination table={table} />}
    </div>
  );
};
export default Table;

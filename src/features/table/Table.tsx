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
import { Link } from "react-router-dom";
import { calculateTotalPages } from "../../widgets/table/utils/tableUtils";

interface ReactTableProps<TData> {
  queryKey: string;
  data: TData[];
  columns: ColumnDef<TData>[];
  className?: string;
  linkTo?: string;
  isPaginate?: boolean;
  dataCount?: number | bigint;
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
  linkTo,
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
  const defaultData = React.useMemo(() => data, [data]);

  const dataQuery = useQuery({
    queryKey: [queryKey, fetchDataOptions],
    queryFn: () => fetchDataFn(fetchDataOptions),
  });

  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns,
    pageCount: calculateTotalPages(dataCount, pageSize) ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    debugTable: true,
  });
  if (dataQuery?.isError) {
    return (
      <div className=" bg-black bg-opacity-50 w-full flex justify-center items-center h-[60vh] text-white">
        <h3 className=" ">No data found...</h3>
      </div>
    );
  }
  if (dataQuery?.isFetching) {
    return (
      <div className=" bg-black w-full h-[60vh] bg-opacity-50 flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-transparent text-opacity-30 animate-spin dark:text-gray-600 fill-[#ffffff]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  return (
    <div className="table">
      <table className={className}>
        <thead className="table-column-header">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} className="pb-5">
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
          {table.getRowModel().rows.map((row, index) => (
            <tr
              key={row.id}
              className={
                index < table.getRowModel().rows.length - 1
                  ? "table-divider-v2"
                  : "table-divider-v1"
              }
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="py-4">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {isPaginate && <TablePagination table={table} />}
      {linkTo && (
        <Link
          className="button-v1 flex justify-center items-center w-3/4 h-10 mx-auto mt-5"
          to={linkTo}
        >
          View all
        </Link>
      )}
    </div>
  );
};
export default Table;

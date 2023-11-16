import { Table } from "@tanstack/react-table";

type Props<T> = {
  table: Table<T>;
};

const TablePagination = <TData extends object>({ table }: Props<TData>) => {
  return (
    <div className="flex items-center justify-center gap-2 text-white mt-5">
      <button
        className="border py-1 px-2"
        onClick={() => table.setPageIndex(0)}
        disabled={!table.getCanPreviousPage()}
      >
        {"<<"}
      </button>
      <button
        className="border py-1 px-2"
        onClick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        {"<"}
      </button>
      <button
        className="border py-1 px-2"
        onClick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        {">"}
      </button>
      <button
        className="border py-1 px-2"
        onClick={() => table.setPageIndex(table.getPageCount() - 1)}
        disabled={!table.getCanNextPage()}
      >
        {">>"}
      </button>
      <span className="flex items-center gap-1 pl-3">
        <div>Page</div>
        <strong>
          {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
        </strong>
      </span>
      <span className="flex items-center gap-1">
        | Go to page:
        <input
          type="number"
          defaultValue={table.getState().pagination.pageIndex + 1}
          onChange={(e) => {
            const page = e.target.value ? Number(e.target.value) - 1 : 0;
            table.setPageIndex(page);
          }}
          className="ml-3 px-2 py-2 w-14 text-white focus:outline-none bg-black bg-opacity-70 text-center"
        />
      </span>
      <select
        className="px-2 py-2 text-white bg-black bg-opacity-70 focus:outline-none"
        value={table.getState().pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
      >
        {[10, 25, 50, 100].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            Show {pageSize}
          </option>
        ))}
      </select>
      {/*data ? "Loading..." : null*/}
    </div>
  );
};

export default TablePagination;

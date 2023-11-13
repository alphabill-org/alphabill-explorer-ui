import { useMemo } from "react";
import { block as testBlock } from "./../../shared/api/test";
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Link, useNavigate } from "react-router-dom";

type BlockTableElement = {
  blockNumber: number;
  txCount: number;
  shardId: string;
  earnedFees: number;
  summaryValue: string;
  timestamp: number;
};

const block: BlockTableElement = {
  blockNumber: testBlock.UnicityCertificate.InputRecord.RoundNumber,
  txCount: testBlock.Transactions.length,
  shardId: testBlock.Header.ShardID,
  earnedFees: testBlock.UnicityCertificate.InputRecord.SumOfEarnedFees,
  summaryValue: testBlock.UnicityCertificate.InputRecord.SummaryValue,
  timestamp: testBlock.UnicityCertificate.UnicitySeal.Timestamp,
};

const blocks: BlockTableElement[] = [block, block, block];

const columnHelper = createColumnHelper<BlockTableElement>();
const columns = [
  columnHelper.accessor("blockNumber", {
    header: "Block Number",
    cell: (info) => <Link to={"/about"}> {info.getValue()}</Link>,
  }),
  columnHelper.accessor("timestamp", { header: "Time" }),
  columnHelper.accessor("txCount", { header: "txCount" }),
  columnHelper.accessor("shardId", { header: "Shard" }),
  columnHelper.accessor("earnedFees", { header: "Earned Fees" }),
  columnHelper.accessor("summaryValue", { header: "Summary Value" }),
];

const TableBlocks = () => {
  const navigate = useNavigate();
  const data = useMemo(() => blocks, []);
  //const [data, setData] = useState(()=> [...blocks]);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const handleRowClick = (id: number) => {
    navigate(`/blocks/${id}`);
  };
  return (
    <div className=" text-white">
      <table className=" w-full m-auto text-center">
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
            <tr className=" hover:text-red-600 cursor-pointer"
              key={row.id}
              onClick={() => handleRowClick(row.original.blockNumber)}
            >
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
    </div>
  );
};
export default TableBlocks;

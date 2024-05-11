import { ColumnDef, createColumnHelper } from "@tanstack/react-table";
import { TableElementBlock } from "../../types";
import { BlockNumberCell, EarnedFeesCell, TransactionCountCell } from "../cells/TableBlockCells";

const columnHelper = createColumnHelper<TableElementBlock>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableBlockColumns: ColumnDef<TableElementBlock, any>[] = [
  columnHelper.accessor("blockNumber", { header: "Block Number", cell: BlockNumberCell }),
  columnHelper.accessor("timeAgo", { header: "Time", cell: info => info.getValue() }),
  columnHelper.accessor("txCount", { header: "Transaction Count", cell: TransactionCountCell }),
  columnHelper.accessor("shardId", { header: "Shard ID", cell: info => info.getValue() }),
  columnHelper.accessor("earnedFees", { header: "Earned Fees", cell: EarnedFeesCell }),
  columnHelper.accessor("summaryValue", { header: "Summary Value", cell: info => info.getValue() }),
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableBlockMiniColumns: ColumnDef<TableElementBlock, any>[] = [
  columnHelper.accessor("blockNumber", { header: "Block Number", cell: BlockNumberCell }),
  columnHelper.accessor("timeAgo", { header: "Time", cell: info => info.getValue() }),
  columnHelper.accessor("txCount", { header: "Transaction Count", cell: TransactionCountCell }),
];

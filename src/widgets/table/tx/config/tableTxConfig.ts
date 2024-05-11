import { createColumnHelper, ColumnDef } from "@tanstack/react-table";
import { TableElementTx } from "../../types";

const columnHelper = createColumnHelper<TableElementTx>();

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableTxColumns: ColumnDef<TableElementTx, any>[] = [
  columnHelper.accessor("txRecordHash", {
    header: () => "Tx Record Hash",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("txOrderHash", {
    header: "Tx Order Hash",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("blockNumber", {
    header: "Block Number",
    cell: (info) => info.getValue().toString(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("systemID", {
    header: "System ID",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("transactionType", {
    header: "Transaction Type",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("unitID", {
    header: "Unit ID",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("timeout", {
    header: "Timeout",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("actualFee", {
    header: "Actual Fee",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("successIndicator", {
    header: "Success Indicator",
    cell: (info) => info.getValue().toString(),
    footer: (props) => props.column.id,
  }),
];

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const tableTxMiniColumns: ColumnDef<TableElementTx, any>[] = [
  columnHelper.accessor("txRecordHash", {
    header: () => "Tx Record Hash",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("transactionType", {
    header: "Transaction Type",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
  columnHelper.accessor("unitID", {
    header: "Unit ID",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
  }),
];


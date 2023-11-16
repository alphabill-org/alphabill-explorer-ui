import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Table } from "../../features";
import { useEffect } from "react";
import { TableElementTx } from "./types";

type TxTableElement = {
  id: string;
  time: string;
  from: string;
  to: string;
  amount: number;
};

const tx1: TxTableElement = {
  id: "0xHash",
  time: "1321354",
  from: "John",
  to: "Mike",
  amount: 230,
};
const tx2: TxTableElement = {
  id: "0xHash",
  time: "2134",
  from: "Mike",
  to: "John",
  amount: 56000,
};
const tx3: TxTableElement = {
  id: "0xHash",
  time: "221334",
  from: "Mike",
  to: "John",
  amount: 52,
};

const txs: TableElementTx[] = [tx1, tx2, tx2, tx1, tx3, tx3, tx1];

const columnHelper = createColumnHelper<TableElementTx>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<TableElementTx, any>[] = [
  columnHelper.accessor("id", {
    header: "Txn Hash",
    cell: (i) => (
      <div className="text-[#08e8de]">
        {i.getValue()}
      </div>
    )
  }),
  columnHelper.accessor("time", { header: "Time" }),
  columnHelper.accessor("from", {
    header: "From",
    cell: (i) => (
        <div className=" text-[#08e8de]">
          {i.getValue()}
        </div>
    ),
  }),
  columnHelper.accessor("to", {
    header: "To",
    cell: (i) => (
      <div className="text-[#08e8de]">
        {i.getValue()}
      </div>
    )
  }),
  columnHelper.accessor("amount", { header: "Amount" }),
];
async function fetchData() {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));
  const data = txs;
  return {
    rows: data,
  };
}

const TableTxsMini = () => {
  useEffect(() => {
    fetchData();
  });

  return (
    <div className="text-center text-white">
      <Table
        queryKey="txMini"
        data={txs}
        columns={columns}
        className=" w-full"
        linkTo="/transactions"
        fetchDataFn={fetchData}
      />
    </div>
  );
};
export default TableTxsMini;

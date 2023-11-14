import { createColumnHelper } from "@tanstack/react-table";

import { Table } from "../../features";
import { useEffect } from "react";
import { Link } from "react-router-dom";

type TxTableElement = {
  id: string;
  time: string;
  from: string;
  to: string;
  amount: number;
};

const tx1: TxTableElement = {
  id: "0xksdfwerwerwerwerwersdfsfdsdf",
  time: "1321354",
  from: "John",
  to: "0xsdfdsfsfsd",
  amount: 230,
};
const tx2: TxTableElement = {
  id: "0xksdzxczczxcz",
  time: "2134",
  from: "0xsdfdsfsfsd",
  to: "0xsdsadasdasda",
  amount: 56000,
};
const tx3: TxTableElement = {
  id: "0xksdzxasdad",
  time: "221334",
  from: "0xsdxcvxcv",
  to: "0xsdsdvsdv",
  amount: 52,
};

const txs: TxTableElement[] = [tx1, tx2, tx2, tx1, tx3, tx3, tx1];

const columnHelper = createColumnHelper<TxTableElement>();
const columns = [
  columnHelper.accessor("id", { header: "Txn Hash" }),
  columnHelper.accessor("time", { header: "Time" }),
  columnHelper.accessor("from", { header: "From" }),
  columnHelper.accessor("to", { header: "To" }),
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
    <div className="w-1/2 text-center text-white">
      <Table
        queryKey="txMini"
        data={txs}
        columns={columns}
        className=" w-full"
        fetchDataFn={fetchData}
      />
      <Link className="block w-3/4 mx-auto bg-green-400" to={"/bills"}>
        View all
      </Link>
    </div>
  );
};
export default TableTxsMini;

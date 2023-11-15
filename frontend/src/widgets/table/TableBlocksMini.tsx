import { block as testBlock } from "./../../shared/api/test";
import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Table } from "../../features";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { TableElementBlock } from "./types";

const block: TableElementBlock = {
  id: testBlock.UnicityCertificate.InputRecord.RoundNumber,
  blockNumber: testBlock.UnicityCertificate.InputRecord.RoundNumber,
  txCount: testBlock.Transactions.length,
  shardId: testBlock.Header.ShardID,
  earnedFees: testBlock.UnicityCertificate.InputRecord.SumOfEarnedFees,
};
const block2: TableElementBlock = {
  id: testBlock.UnicityCertificate.InputRecord.RoundNumber,
  blockNumber: 22,
  txCount: testBlock.Transactions.length,
  shardId: testBlock.Header.ShardID,
  earnedFees: testBlock.UnicityCertificate.InputRecord.SumOfEarnedFees,
};

const blocks: TableElementBlock[] = [
  block,
  block,
  block,
  block,
  block2,
  block2,
  block2,
];

const columnHelper = createColumnHelper<TableElementBlock>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<TableElementBlock, any>[] = [
  columnHelper.accessor("blockNumber", { header: "Block Number" }),
  columnHelper.accessor("txCount", { header: "txCount" }),
  columnHelper.accessor("shardId", { header: "Shard" }),
  columnHelper.accessor("earnedFees", { header: "Earned Fees" }),
];
async function fetchData() {
  // Simulate some network latency
  await new Promise((r) => setTimeout(r, 500));
  const data = blocks;
  return {
    rows: data,
  };
}

const TableBlocksMini = () => {
  useEffect(() => {
    fetchData();
  });

  return (
    <div className="w-1/2 text-center text-white">
      <Table
        queryKey="blocksMini"
        data={blocks}
        columns={columns}
        className=" w-full"
        fetchDataFn={fetchData}
      />
      <Link className="block w-3/4 mx-auto bg-green-400" to={"/blocks"}>
        View all
      </Link>
    </div>
  );
};
export default TableBlocksMini;

import { ColumnDef, createColumnHelper } from "@tanstack/react-table";

import { Table } from "../../features";
import { TableElementBlock } from "./types";
import { Link } from "react-router-dom";
import axios from "axios";
import { BlockExplorer } from "../../shared/api/types";
import { useQuery } from "@tanstack/react-query";

const columnHelper = createColumnHelper<TableElementBlock>();
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const columns: ColumnDef<TableElementBlock, any>[] = [
  columnHelper.accessor("blockNumber", {
    header: "Block Number",
    cell: (info) => (
      <Link className="text-[#08e8de]" to={`/blocks/${info.getValue()}`}>
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("timestamp", { header: "Time" }),
  columnHelper.accessor("txCount", {
    header: "txCount",
    cell: (info) => (
      <Link
        className="text-[#08e8de]"
        to={`/blocks/${info.row.original.blockNumber}/transactions`}
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor("shardId", { header: "Shard" }),
  columnHelper.accessor("earnedFees", { header: "Earned Fees" }),
  columnHelper.accessor("summaryValue", { header: "Summary Value" }),
];

async function fetchLastBlock() {
  const data = await axios.get(
    `http://localhost:9666/api/v1/blocksExp/?startBlock=&limit=1`
  );
  return data;
}

async function fetchData(
  lastBlock: number,
  options?: { pageIndex: number; pageSize: number }
) {
  if (!options) {
    throw new Error("Options are required for fetchData");
  }

  const { pageIndex, pageSize } = options;
  const startBlock = lastBlock - pageIndex * pageSize;

  try {
    const response = await axios.get(`http://localhost:9666/api/v1/blocksExp/`, {
      params: {
        startBlock,
        limit: pageSize,
      },
    });

    const responseData: BlockExplorer[] = response.data;

    return {
      rows: responseData.map(block => ({
        id: block.RoundNumber,
        blockNumber: block.RoundNumber,
        txCount: block.TxHashes?.length || 0,
        shardId: block.Header.ProposerID,
        earnedFees: block.SumOfEarnedFees,
        summaryValue: block.SummaryValue,
        timestamp: block.Header.Timestamp,
      })),
    };
  } catch (error) {
    console.error("Error fetching data: ", error);
    return { rows: [] };
  }
}

const TableBlocks = () => {
  const { data: lastBlockData, isLoading } = useQuery({
    queryKey: ["lastBlock"],
    queryFn: () => fetchLastBlock(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const lastBlock = lastBlockData ? lastBlockData.data[0].RoundNumber : 0;

  return (
    <div>
      <Table
        queryKey="blocks"
        data={[]}
        columns={columns}
        isPaginate={true}
        className=" w-full m-auto text-center text-white"
        fetchDataFn={(options) => fetchData(lastBlock, options)}
        dataCount={lastBlock}
      />
    </div>
  );
};

export default TableBlocks;

import { useParams } from "react-router-dom";
import { block as testBlock } from "./../../shared/api/test";
import { TableElementBlock } from "../table/types";
import { useQuery } from "@tanstack/react-query";

const block: TableElementBlock = {
  id: testBlock.UnicityCertificate.InputRecord.RoundNumber,
  blockNumber: testBlock.UnicityCertificate.InputRecord.RoundNumber,
  txCount: testBlock.Transactions.length,
  shardId: testBlock.Header.ShardID,
  earnedFees: testBlock.UnicityCertificate.InputRecord.SumOfEarnedFees,
  summaryValue: testBlock.UnicityCertificate.InputRecord.SummaryValue,
  timestamp: testBlock.UnicityCertificate.UnicitySeal.Timestamp,
  proposerID: testBlock.Header.ProposerID,
  blockHash: testBlock.UnicityCertificate.InputRecord.BlockHash,
  previousBlockHash: testBlock.UnicityCertificate.InputRecord.PreviousHash,
};

async function fetchData(id: string = "1") {
  // Simulate some network latency
  console.log("getBlockByBlockNumber: " + id);
  await new Promise((r) => setTimeout(r, 500));
  const data = block;
  return {
    data,
  };
}

const DetailsBlock = () => {
  const { id } = useParams();

  const dataQuery = useQuery({
    queryKey: ["block details", id],
    queryFn: () => fetchData(id),
  });

  return (
    <section className="text-gray-300">
      <div className="px-10 py-5 space-y-5 mx-auto">
        <div className="md:mb-0 mb-6 flex font-semibold flex-col md:flex-row">
          <span className="md:basis-3/12">
            Block:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.blockNumber?.toString()}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col md:flex-row">
          <span className="md:basis-3/12">
            Timestamp:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.timestamp}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col md:flex-row">
          <span className="md:basis-3/12">
            Proposer ID:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.proposerID}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col md:flex-row">
          <span className="md:basis-3/12">
            Transactions:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.txCount}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col pt-6 md:flex-row border-t border-white border-opacity-20">
          <span className="md:basis-3/12">
            Shard:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.shardId}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col md:flex-row">
          <span className="md:basis-3/12">
            Earned Fees:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.earnedFees?.toString()}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col md:flex-row">
          <span className="md:basis-3/12">
            Summary Value:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.summaryValue}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col pt-6 md:flex-row border-t border-white border-opacity-20">
          <span className="md:basis-3/12">
            Block Hash:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.blockHash}</p>
        </div>
        <div className="md:mb-0 mb-6 flex font-semibold flex-col md:flex-row">
          <span className="md:basis-3/12">
            Previous Block Hash:
          </span>
          <p className="text-white md:basis-9/12">{dataQuery.data?.data.previousBlockHash}</p>
        </div>
      </div>
    </section>
  );
};

export default DetailsBlock;

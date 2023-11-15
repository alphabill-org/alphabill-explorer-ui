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
  hash: testBlock.UnicityCertificate.InputRecord.BlockHash,
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
    <section className="text-gray-400 body-font overflow-hidden">
      <div className="container px-5 py-24 mx-auto">
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
              Block Round:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.blockNumber}</p>
          </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
              Timestamp:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.timestamp}</p>
          </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
              Proposer ID:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.proposerID}</p>
          </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
              Transactions:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.txCount}</p>
          </div>
        </div>
        <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">Shard:</span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.shardId}</p>
          </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
              Earned Fees:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.earnedFees}</p>
          </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
            Summary Value:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.summaryValue}</p>
          </div>
        </div>
        <div className="py-8 flex border-t-2 border-gray-800 flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
            Block Hash:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.hash}</p>
          </div>
        </div>
        <div className="py-8 flex flex-wrap md:flex-nowrap">
          <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
            <span className="font-semibold title-font text-white">
            Previous Block Hash:
            </span>
          </div>
          <div className="md:flex-grow">
            <p className="">{dataQuery.data?.data.previousBlockHash}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DetailsBlock;

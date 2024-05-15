import { useQuery } from "@tanstack/react-query";
import { TableElementTx } from "../table/types";
import { block as testBlock } from "./../../shared/api/test";
import { DetailProps } from "./types";

const tx: TableElementTx= {
  id: "0xksdzxczczxcz",
  time: "2134",
  from: "0xsdfdsfsfsd",
  to: "0xsdsadasdasda",
  amount: 56000,
};
  // id: testBlock.Transactions[0].TransactionOrder.,
  // blockNumber: testBlock.UnicityCertificate.InputRecord.RoundNumber,
  // txCount: testBlock.Transactions.length,
  // shardId: testBlock.Header.ShardID,
  // earnedFees: testBlock.UnicityCertificate.InputRecord.SumOfEarnedFees,
  // summaryValue: testBlock.UnicityCertificate.InputRecord.SummaryValue,
  // timestamp: testBlock.UnicityCertificate.UnicitySeal.Timestamp,
  // proposerID: testBlock.Header.ProposerID,
  // hash: testBlock.UnicityCertificate.InputRecord.BlockHash,
  // previousBlockHash: testBlock.UnicityCertificate.InputRecord.PreviousHash,


async function fetchBlockNumber(id: string = "1") {
  // Simulate some network latency
  console.log("getBlockNoByTxHash: " + id);
  await new Promise((r) => setTimeout(r, 500));
  const blockNumber = testBlock.UnicityCertificate.InputRecord.RoundNumber;
  return {
    blockNumber,
  };
}
async function fetchData(bNo: string = "1", hash: string = "1") {
  // Simulate some network latency
  console.log("getTxByBlockNoAndTxHash: bNo: " +{bNo} +" hash: "+ {hash});
  await new Promise((r) => setTimeout(r, 500));
  const data = tx;
  return {
    data,
  };
}


const DetailsTransaction = ({id}:DetailProps) => {

  const blockNumberQuery = useQuery({
    queryKey: ["transaction block", id],
    queryFn: () => fetchBlockNumber(id),
  });
const options={
  bNo: blockNumberQuery.data?.blockNumber.toString(),
  hash: id
}

  const dataQuery = useQuery({
    queryKey: ["transaction details", options],
    queryFn: () => fetchData(options.bNo, options.hash),
  });

  return (
    <div>
      <section className="text-gray-400 body-font overflow-hidden bg-black bg-opacity-50 mt-5">
        <div className="container px-5 mx-auto">
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-white">
                Block Round:
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="">{dataQuery.data?.data.id}</p>
            </div>
          </div>
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-white">
                Timestamp:
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="">{dataQuery.data?.data.time}</p>
            </div>
          </div>
          <div className="py-8 flex border-t-2 border-[#4e3fb6] border-opacity-50 flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-white">
                From:
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="">{dataQuery.data?.data.from}</p>
            </div>
          </div>
          <div className="py-8 flex flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-white">
                To:
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="">{dataQuery.data?.data.to}</p>
            </div>
          </div>
          <div className="py-8 flex border-t-2 border-[#4e3fb6] border-opacity-50  flex-wrap md:flex-nowrap">
            <div className="md:w-64 md:mb-0 mb-6 flex-shrink-0 flex flex-col">
              <span className="font-semibold title-font text-white">
                Amount:
              </span>
            </div>
            <div className="md:flex-grow">
              <p className="">{dataQuery.data?.data.amount}</p>
            </div>
          </div>        
        </div>
      </section>
    </div>
  );
};

export default DetailsTransaction;

import { Link, useParams } from "react-router-dom";
import { useBlockQuery } from "../../entities/block";
import { mapBlockToTableElement } from "../table/utils/tableUtils";
import { shortenHash } from "../../shared/utils/helpers";

const DetailsBlock = () => {
  const { id } = useParams();
  const { data, isFetching } = useBlockQuery(id ? id : "latest");

  if (isFetching) {
    return (
      <div className="bg-black w-full h-[60vh] bg-opacity-50 flex justify-center items-center">
        <svg
          aria-hidden="true"
          className="inline w-8 h-8 text-transparent text-opacity-30 animate-spin dark:text-gray-600 fill-[#ffffff]"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
          />
          <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
          />
        </svg>
      </div>
    );
  }

  const block = mapBlockToTableElement(data!);

  return (
    <section className="text-gray-300 bg-black bg-opacity-50">
      <div className="px-10 py-10 space-y-8 mx-auto">
        <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
          <span className="md:basis-3/12">Block:</span>
          <p className="text-white md:basis-9/12 font-semibold">
            {block?.blockNumber?.toString()}
          </p>
        </div>
        <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
          <span className="md:basis-3/12">Timestamp:</span>
          <p className="text-white md:basis-9/12 font-semibold">{block?.timeAgo}</p>
        </div>
        <div className="md:mb-0 mb-6 flex flex-col md:flex-row text-white md:basis-9/12">
          <span className="md:basis-3/12">Proposer ID:</span>
          <p className="text-white md:basis-9/12">
            <span className="block md:hidden font-semibold">
              {shortenHash(block?.proposerID)}
            </span>
            <span className="hidden md:block">{block?.proposerID}</span>
          </p>
        </div>
        <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
          <span className="md:basis-3/12">Transactions:</span>
          <Link
            className="text-[#08e8de]"
            to={`/bills/blocks/${id}/transactions`}
          >
            <p className="md:basis-9/12 font-semibold">{block?.txCount}</p>
          </Link>
        </div>
        <div className="md:mb-0 mb-6 flex flex-col pt-8 md:flex-row border-t border-white border-opacity-20">
          <span className="md:basis-3/12">Shard:</span>
          <p className="text-white md:basis-9/12 font-semibold">{block?.shardId}</p>
        </div>
        <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
          <span className="md:basis-3/12">Summary Value:</span>
          <p className="text-white md:basis-9/12 font-semibold">{block?.summaryValue}</p>
        </div>
        <div className="md:mb-0 mb-6 flex flex-col pt-8 md:flex-row border-t border-white border-opacity-20">
          <span className="md:basis-3/12">Block Hash:</span>
          <p className="text-white md:basis-9/12">
            <span className="block md:hidden font-semibold">
              {shortenHash(block?.blockHash)}
            </span>
            <span className="hidden md:block">{block?.blockHash}</span>
          </p>
        </div>
        <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
          <span className="md:basis-3/12">Previous Block Hash:</span>
          <p className="text-white md:basis-9/12">
            <span className="block md:hidden font-semibold">
              {shortenHash(block?.previousBlockHash)}
            </span>
            <span className="hidden md:block">{block?.previousBlockHash}</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default DetailsBlock;

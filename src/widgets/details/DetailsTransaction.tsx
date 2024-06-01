import { Page404 } from "../../pages";
import { Link, useParams } from "react-router-dom";
import { useTxQuery } from "../../entities/tx/hooks/useTx";
import { useState } from "react";
import { mapTxToTableElement } from "../table/utils/tableUtils";
import { IconArrowSmallDown, IconArrowSmallUp } from "../../shared/ui/icons";
// import { TableElementTx } from "../table/types";
import { shortenHash } from "../../shared/utils/helpers";

// const tx: TableElementTx = {
//   txRecordHash: "0xe5e792c874443e9bc304a97b23806279628997362adb11fb1ab9724ef6d81017",
//   txOrderHash: "0xe5e792c874443e9bc304a97b23806279628997362adb11fb1ab9724ef6d81017",
//   blockNumber: BigInt(321321),
//   systemID: 1,
//   transactionType: "Transfer",
//   unitID: ["0xe5e792c874443e9bc304a97b23806279628997362adb11fb1ab9724ef6d81017", "0xe5e792c874443e9bc304a97b23806279628997362adb11fb1ab9724ef6d81017", "0xe5e792c874443e9bc304a97b23806279628997362adb11fb1ab9724ef6d81017"],
//   timeout: 2134,
//   actualFee: 3224151,
//   successIndicator: 0
// };

const DetailsTransaction = () => {
  const { id } = useParams();
  const { data, isFetching, isError } = useTxQuery(id!);
  const [showUnits, setShowUnits] = useState<boolean>(false);

  if(isError){
    return(
      <Page404/>
    )
  }

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

  const tx = mapTxToTableElement(data!);


  return (
    <div className="px-4 space-y-2">
      <h3 className="text-white text-3xl md:text-4xl font-bold flex lg:flex-col">
        Transaction:
        <span className="block lg:hidden font-semibold ml-3">
          {shortenHash(tx.txRecordHash, 4, 3)}
        </span>
        <span className="hidden lg:block ml-3 md:text-[29px]  md:ml-0">{tx.txRecordHash}</span>
      </h3>
      <section className="text-gray-300 bg-black bg-opacity-50">
        <div className="px-10 py-10 space-y-8 mx-auto">
          <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
            <span className="md:basis-3/12">Transaction Hash:</span>
            <p className="text-white lg:hidden md:basis-9/12 font-semibold">
              {shortenHash(tx.txRecordHash)}
            </p>
            <p className="text-white hidden lg:block md:basis-9/12 font-semibold">
              {tx.txRecordHash}
            </p>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
            <span className="md:basis-3/12">Status:</span>
            <p className="text-white md:basis-9/12 font-semibold">
              {tx.successIndicator}
            </p>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
            <span className="md:basis-3/12">Block:</span>
            <Link
              className="text-secondary"
              to={`/bills/blocks/${tx.blockNumber}`}
            >
              <p className="md:basis-9/12 font-semibold">
                {tx.blockNumber.toString()}
              </p>
            </Link>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
            <span className="md:basis-3/12">Timeout:</span>
            <p className="text-white md:basis-9/12 font-semibold">
              {tx.timeout}
            </p>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col pt-8 md:flex-row border-t border-white border-opacity-20">
            <span className="md:basis-3/12">Transaction Type:</span>
            <p className="text-white md:basis-9/12 font-semibold">{tx.transactionType}</p>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
            <span className="md:basis-3/12">Fee:</span>
            <p className="text-white md:basis-9/12 font-semibold">
              {tx.actualFee}
            </p>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col pt-8 md:flex-row border-t border-white border-opacity-20">
            <span className="md:basis-3/12">Target Units:</span>
            <div className="md:basis-9/12 font-semibold text-white space-y-2">
              <button onClick={() => setShowUnits(!showUnits)} className="flex items-center hover:text-secondary transition-all duration-200">
                {tx.unitID.length}
                {showUnits ? <IconArrowSmallUp className="ml-2 h-[11px] w-[11px]" /> : <IconArrowSmallDown className="ml-2 h-[11px] w-[11px]" />}
              </button>
              {showUnits && tx.unitID.map((unit, index) =>
                <>
                  <p key={index} className="lg:hidden">{shortenHash(unit)}</p>
                  <p key={index} className="hidden lg:block">{unit}</p>
                </>
              )}
            </div>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
            <span className="md:basis-3/12">System Id:</span>
            <p className="text-white md:basis-9/12 font-semibold">
              {tx.systemID}
            </p>
          </div>
          <div className="md:mb-0 mb-6 flex flex-col md:flex-row">
            <span className="md:basis-3/12">Order Hash:</span>
            <p className="text-white hidden lg:block md:basis-9/12 font-semibold">
              {tx.txOrderHash}
            </p>
            <p className="text-white lg:hidden md:basis-9/12 font-semibold">
              {shortenHash(tx.txOrderHash)}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default DetailsTransaction;

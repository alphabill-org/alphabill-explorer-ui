import { Button } from "../../shared/ui/button/Button";
import { TableBlocksMini, TableTxsMini, ThemeSwitcher } from "../../widgets";

const HomePage = () => {
  return (
    <>
      <ThemeSwitcher/>
      <div className="w-full flex justify-center py-4 lg:pt-10 lg:pb-20">
        <h1 className="text-[#08e8de] text-[5vw] sm:text-[4.5vw] lg:text-[3.4vw]">
          The Alphabill Blockchain Explorer ...
        </h1>
      </div>

      <div className="w-full flex flex-row justify-center px-5 pb-5">
        <div className="relative">
          <span className="absolute flex inset-y-0 right-0 items-center mx-3 lg:hidden">
            <button
              type="submit"
              className="p-1 focus:outline-none focus:shadow-outline"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="w-6 h-6"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            placeholder="Search by Address / Txn Hash / Block / Token "
            className=" w-[70vw] md:w-[65vw] lg:w-[37vw] h-[6.5vh] p-5 focus:outline-none placeholder:lg:text-[0.95vw] placeholder:sm:text-[2vw] placeholder:md:text-[1.6vw] placeholder:text-[2.4vw]"
          />
        </div>
        <Button
          type="submit"
          className="button-v2 w-[13vw] h-[6.5vh] ml-[26px] text-[18px] hidden lg:flex"
        >
          Search
        </Button>
      </div>

      <div className="grid grid-rows-5 grid-cols-1 sm:grid-rows-4 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-4 gap-1 my-10 px-14">
        <div className="bg-black bg-opacity-50 h-24 order-1 flex flex-col py-5 px-10 justify-start">
          <h4 className="text-white font-light text-base">ALPHA PRICE</h4>
          <div className="flex flex-row items-center">
            <p className="text-[#08e8de] font-medium text-lg">$1.8563</p>
            <p className="text-[#A3FC83] font-light text-xs px-2">(+12.50%)</p>
          </div>
        </div>
        <div className="bg-black bg-opacity-50 h-24 order-2 flex flex-col py-5 px-10 justify-start">
          <h4 className="text-white font-light text-base">TRANSACTIONS</h4>
          <div className="flex flex-row items-center">
            <p className="text-[#08e8de] font-medium text-lg">2,561.12M</p>
            <p className=" text-gray-400 font-light text-xs px-2">(12.0 TPS)</p>
          </div>
        </div>
        {/* TODO Graphics */}
        <div className="bg-black bg-opacity-50 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 order-last lg:order-3"></div>
        <div className="bg-black bg-opacity-50  h-24 order-3 lg:order-4 flex flex-col py-5 px-10 justify-start">
          <h4 className="text-white font-light text-base">MARKET CAP</h4>
          <div className="flex flex-row items-center">
            <p className="text-[#08e8de] font-medium text-lg">
              $122,632,738,289.33
            </p>
          </div>
        </div>
        <div className="bg-black bg-opacity-50  h-24 order-4 lg:order-5 flex flex-col py-5 px-10 justify-start">
          <h4 className="text-white font-light text-base">AVG TX FEE</h4>
          <div className="flex flex-row items-center">
            <p className="text-[#08e8de] font-medium text-lg">0.15 ALPHA</p>
            <p className=" text-gray-400 font-light text-xs px-2">($0.27)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-2 gap-2 lg:grid-rows-1 lg:grid-cols-2 lg:gap-1 px-14 py-5">
        <div>
          <h4 className="text-white px-5 text-lg font-normal">LATEST BLOCKS</h4>
          <TableBlocksMini />
        </div>
        <div>
          <h4 className="text-white px-5 text-lg font-normal">
            LATEST TRANSACTIONS
          </h4>
          <TableTxsMini />
        </div>
      </div>
    </>
  );
};

export default HomePage;

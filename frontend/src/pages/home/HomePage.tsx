import { Button } from "../../shared/ui/button/Button";
import { TableBlocksMini, TableTxsMini } from "../../widgets";

const HomePage = () => {
  return (
    <>
      <div className="w-full flex justify-center py-4 lg:pt-10 lg:pb-20">
        <h1 className="main-header">
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
        <div className="widget order-1">
          <h4 className="widget-header">ALPHA PRICE</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">$1.8563</p>
            <p className="widget-price-change">(+12.50%)</p>
          </div>
        </div>
        <div className="widget order-2">
          <h4 className="widget-header">TRANSACTIONS</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">2,561.12M</p>
            <p className="widget-additional">(12.0 TPS)</p>
          </div>
        </div>
        {/* TODO Graphics */}
        <div className="bg-black bg-opacity-50 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 order-last lg:order-3"></div>
        <div className="widget order-3 lg:order-4">
          <h4 className="widget-header">MARKET CAP</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">$122,632,738,289.33</p>
          </div>
        </div>
        <div className="widget order-4 lg:order-5">
          <h4 className="widget-header">AVG TX FEE</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">0.15 ALPHA</p>
            <p className="widget-additional">($0.27)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-2 gap-2 lg:grid-rows-1 lg:grid-cols-2 lg:gap-1 px-14 py-5">
        <div>
          <h4 className="table-header">LATEST BLOCKS</h4>
          <TableBlocksMini />
        </div>
        <div>
          <h4 className="table-header">LATEST TRANSACTIONS</h4>
          <TableTxsMini />
        </div>
      </div>
    </>
  );
};

export default HomePage;

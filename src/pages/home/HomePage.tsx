import { TableBlocksMini, TableTxsMini } from "../../widgets";
import LineChart from "../../shared/ui/chart/LineChart";
import Search from "../../widgets/search/Search";

const HomePage = () => {
  return (
    <>
      <div className="w-full flex justify-center py-4 lg:pt-10 lg:pb-20">
        <h1 className="main-header">The Alphabill Blockchain Explorer ...</h1>
      </div>

      <Search />

      <div className="grid grid-rows-6 grid-cols-1 sm:grid-rows-4 sm:grid-cols-2 lg:grid-rows-2 lg:grid-cols-4 gap-1 my-10 px-14">
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

        <div className="bg-black bg-opacity-50 row-span-2 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2 order-last lg:order-3 lg:max-h-full flex justify-center py-5 px-10">
          <LineChart />
        </div>
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

import { TableBlocksMini, TableTxsMini } from "../../widgets";

const Bills = () => {
  return (
    <>
      <div className="flex items-center px-14">
        <h1 className="main-header text-white text-[8vw] sm:text-[4.5vw] lg:text-[3.4vw]"> Bills overview</h1>
      </div>

      <div className="grid grid-rows-4 grid-cols-1 sm:grid-rows-2 sm:grid-cols-2 lg:grid-rows-1 lg:grid-cols-4 gap-1 my-5 px-14">
        <div className="widget order-1">
          <h4 className="widget-header">LAST BLOCK</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">2134542</p>
          </div>
        </div>
        <div className="widget order-2">
          <h4 className="widget-header">TOTAL BLOCKS</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">20,751</p>

          </div>
        </div>
        <div className="widget order-3">
          <h4 className="widget-header">TRANSACTIONS</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">2,561.12M</p>
            <p className="widget-additional">(12.0 TPS)</p>
          </div>
        </div>
        <div className="widget order-4">
          <h4 className="widget-header">AVG TX FEE</h4>
          <div className="flex flex-row items-center">
            <p className="widget-body">0.15 ALPHA</p>
            <p className="widget-additional">($0.27)</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 grid-rows-2 gap-2 lg:grid-rows-1 lg:grid-cols-2 lg:gap-1 my-10 px-14">
        <div>
          <h4 className="table-header">LATEST BLOCKS</h4>
          <TableBlocksMini />
        </div>
        <div className="mt-4 lg:mt-0">
          <h4 className="table-header">LATEST TRANSACTIONS</h4>
          <TableTxsMini />
        </div>
      </div>
    </>
  );
}

export default Bills
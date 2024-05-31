import { Table } from "../../../features";
import { tableTxColumns } from "./config/tableTxConfig";
import { fetchTableTxsData } from "./api/tableTxApi";
import { useTxsQuery } from "../../../entities/tx";

const TableTxs = () => {
  const { data: lastTx, isFetching } = useTxsQuery("0", 1);
  if (isFetching) {
    return (
      <div className=" bg-black w-full h-[60vh] bg-opacity-50 flex justify-center items-center">
        {/* Place your loading indicator here */}
      </div>
    );
  }
  const lastTxNumber =
    lastTx && lastTx.offsetKey !== undefined
      ? BigInt(lastTx.offsetKey) + BigInt(1)
      : BigInt(0);

  return (
    <div className="px-5 lg:px-0">
      <Table
        queryKey="transactions"
        data={[]}
        columns={tableTxColumns}
        className="w-full m-auto text-center text-white"
        fetchDataFn={(options) => fetchTableTxsData(lastTxNumber, options)}
        isPaginate={true}
        dataCount={lastTxNumber}
      />
    </div>
  );
};
export default TableTxs;

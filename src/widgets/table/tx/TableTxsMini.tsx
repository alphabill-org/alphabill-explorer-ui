import { useTxsQuery } from "../../../entities/tx";
import { Table } from "../../../features";
import { fetchTableTxsData } from "./api/tableTxApi";
import { tableTxMiniColumns } from "./config/tableTxConfig";

const TableTxsMini = () => {
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
    <div className="text-center">
      <Table
        queryKey="txMini"
        data={[]}
        columns={tableTxMiniColumns}
        className=" w-full"
        linkTo="/bills/transactions"
        fetchDataFn={(options) => fetchTableTxsData(lastTxNumber, options)}
      />
    </div>
  );
};
export default TableTxsMini;

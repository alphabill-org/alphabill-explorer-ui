import { Table } from "../../../features";
import { fetchTableTxData } from "./api/tableTxApi";
import { tableTxMiniColumns } from "./config/tableTxConfig";

const TableTxsMini = () => {
  //const { data: lastTx, isFetching } = useTxsQuery(BigInt(0), 1);
  const lastTxNumber = BigInt(0);
  return (
    <div className="text-center">
      <Table
        queryKey="txMini"
        data={[]}
        columns={tableTxMiniColumns}
        className=" w-full"
        linkTo="/bills/transactions"
        fetchDataFn={(options) => fetchTableTxData(lastTxNumber, options)}
      />
    </div>
  );
};
export default TableTxsMini;

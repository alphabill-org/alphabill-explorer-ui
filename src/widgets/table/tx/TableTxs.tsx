import { Table } from "../../../features";
import { tableTxColumns } from "./config/tableTxConfig";
import { fetchTableTxData } from "./api/tableTxApi";

const TableTxs = () => {
  //const { data: lastTx, isFetching } = useTxsQuery(BigInt(0), 1);
  const lastTxNumber = BigInt(0);

  return (
    <div>
      <Table
        queryKey="transactions"
        data={[]}
        columns={tableTxColumns}
        className="w-full m-auto text-center text-white"
        fetchDataFn={(options) => fetchTableTxData(lastTxNumber, options)}
        isPaginate={true}
      />
    </div>
  );
};
export default TableTxs;

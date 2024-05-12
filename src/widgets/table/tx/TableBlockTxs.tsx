import { useParams } from "react-router-dom";
import { Table } from "../../../features";
import { fetchTableBlockTxsData } from "./api/tableTxApi";
import { tableTxColumns } from "./config/tableTxConfig";


const TableBlockTxs = () => {
  const { id } = useParams();
  const blockNumber = id !== undefined ? BigInt(id) : BigInt(0);
  return (
    <div className="">
      <Table
        queryKey="block transactions"
        data={[]}
        columns={tableTxColumns}
        className=" w-full m-auto text-center"
        fetchDataFn={() => fetchTableBlockTxsData( blockNumber)}
      />
    </div>
  );
};
export default TableBlockTxs;

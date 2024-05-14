import { useParams } from "react-router-dom";
import { Table } from "../../../features";
import { fetchTableBlockTxsData } from "./api/tableTxApi";
import { tableTxColumns } from "./config/tableTxConfig";
import { isBigInt } from "../../../shared/utils/helpers";


const TableBlockTxs = () => {
  const { id } = useParams();
  let blockNumber : bigint;
  if(isBigInt(id)){
    blockNumber = BigInt(id!);
  }
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

import {Table} from "../../../features";
import {useBlockQuery} from "../../../entities/block";
import {tableBlockColumns} from "./config/tableBlockConfig";
import {fetchTableBlockData} from "./api/tableBlockApi";

const TableBlocks = () => {
    const {data: lastBlockData, isFetching} = useBlockQuery(1, "latest");

    if (isFetching) {
        return (
            <div className=" bg-black w-full h-[60vh] bg-opacity-50 flex justify-center items-center">
                {/* Place your loading indicator here */}
            </div>
        );
    }

    const lastBlock = lastBlockData
        ? lastBlockData.UnicityCertificate.inputRecord.roundNumber
        : BigInt(-1);
    return (
        <div>
            <Table
                queryKey="blocks"
                data={[]}
                columns={tableBlockColumns}
                isPaginate={true}
                className=" "
                fetchDataFn={(options) => fetchTableBlockData(lastBlock, options)}
                dataCount={lastBlock}
            />
        </div>
    );
};

export default TableBlocks;

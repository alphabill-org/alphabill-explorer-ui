import {Table} from "../../../features";
import {useBlockQuery} from "../../../entities/block";
import {fetchTableBlockData} from "./api/tableBlockApi";
import {tableBlockMiniColumns} from "./config/tableBlockConfig";

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
        <div className="text-center">
            <Table
                queryKey="blocksMini"
                data={[]}
                columns={tableBlockMiniColumns}
                className="w-full"
                linkTo="/bills/blocks"
                fetchDataFn={(options) => fetchTableBlockData(lastBlock, options)}
                dataCount={5}
            />
        </div>
    );
};

export default TableBlocks;

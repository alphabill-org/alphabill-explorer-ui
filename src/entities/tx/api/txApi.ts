import axios from "axios";
import {Tx, TxDTO, TxsResponse} from "../types/txTypes";
import {isTest} from "../../../app/config";
import {getTxsTest, getTxTest} from "./txApiTest";
import {extractOffsetKey} from "../../../shared/utils/helpers";

const moneyURL = import.meta.env.VITE_MONEY_BACKEND_URL;

const getTxReal = async (txHash: string): Promise<Tx> => {
    const response = await axios.get(`${moneyURL}/txs/${txHash}`);
    return response.data;
};

const getTxsReal = async (
    startSeqNumber?: string,
    limit?: number
): Promise<TxsResponse> => {
    const response = await axios.get(`${moneyURL}/txs`, {
        params: {startSeqNumber, limit},
    });

    const linkHeader = response.headers["link"];
    const offsetKey = extractOffsetKey(linkHeader);

    return {
        transactions: response.data,
        offsetKey: offsetKey,
    };
};

//{
//     "TxRecordHash": "0x31de3639287fac115418a5c8012f69f33d117ca783e5caa8969b76cf9adfbaaa",
//     "TxOrderHash": "0xb52c606071628532005b6ddb055930eb3ff72f7a10a378adba7e00f59e707276",
//     "BlockNumber": 37429,
//     "Transaction": {
//         "Version": 1,
//         "TransactionOrder": "0xd903f88b0104015821a17c77c12fd6070d4e031fff70058ee27bd08f519af88a95bbb0ae904c016834010282818201582683004102582076b9693fa0aa9086023ca1889eab3b82b29ecd5ad24edd8f914af80d9ee2f00806f68419923e0a582130e3b81740b53d911d94763e49ee835c898ab0f97a15631d17f14dace7ca5cdf10f6f6815867825841932e433651ddcf052256e14d930b73a5c3b8094150fd14504244df6ce4d6536945044612e15a1e53456bbc0ea10cf8707ae28a5ee85e29c749bbaa71552d515500582103104efa2504b956ec78810d3ea2927236e829b442abb7e6b1e20a9b3dd7a74304586782584149c14543ce2894ff7dbb3a4a6934e0291ac5f9cfc84619c1a0e1739d8280a8ed39877a52b335cd45d8eb45d4e61ef094abd2c1222b3a6e6b781469defaba6a7101582103104efa2504b956ec78810d3ea2927236e829b442abb7e6b1e20a9b3dd7a74304",
//         "ServerMetadata": {
//             "ActualFee": 2,
//             "TargetUnits": [
//                 "0xa17c77c12fd6070d4e031fff70058ee27bd08f519af88a95bbb0ae904c01683401",
//                 "0x4fc061ac7dc18f679329178a1e7c1a834fafeaaac024ed32c72f223bcbc305ac01",
//                 "0x30e3b81740b53d911d94763e49ee835c898ab0f97a15631d17f14dace7ca5cdf10"
//             ],
//             "SuccessIndicator": 1,
//             "ProcessingDetails": ""
//         }
//     },
//     "PartitionID": 1
// }

const getBlockTxsByBlockNumber = async (blockNumber: string): Promise<TxDTO[]> => {
    const response = await axios.get(`${moneyURL}/partitions/1/blocks/${blockNumber}/txs`);
    response.data.forEach((data: TxDTO) => {
        console.log("data: ", data);
    });
    return response.data;
};

const getTxsByUnitID = async (unitID: string): Promise<Tx[]> => {
    const response = await axios.get(`${moneyURL}/units/${unitID}/txs`);
    return response.data;
};


const getTx = isTest ? getTxTest : getTxReal;
const getTxs = isTest ? getTxsTest : getTxsReal;

export {getTx, getTxs, getBlockTxsByBlockNumber, getTxsByUnitID};

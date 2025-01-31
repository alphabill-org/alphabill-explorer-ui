import {ServerMetadata} from "@alphabill/alphabill-js-sdk/lib/transaction/record/ServerMetadata";
import {TransactionOrder} from "@alphabill/alphabill-js-sdk/lib/transaction/TransactionOrder";
import {TransactionRecord} from "@alphabill/alphabill-js-sdk/lib/transaction/record/TransactionRecord";

// type Payload = {
//     SystemID: number;
//     Type: string;
//     UnitID: string;
//     Attributes: string;
//     ClientMetadata: {
//         Timeout: number;
//         MaxTransactionFee: number;
//         FeeCreditRecordID: null | string;
//     };
// };

// type TransactionOrder = {
//   Payload: Payload;
//   OwnerProof: string;
//   FeeProof: null | string;
// };

// type ServerMetadata = {
//     ActualFee: number;
//     TargetUnits: string[];
//     SuccessIndicator: number;
//     ProcessingDetails: null | string;
// };

type Transaction = {
    TransactionOrder: TransactionOrder;
    ServerMetadata: ServerMetadata;
};

export type TxDTO = {
    TxRecordHash: string;
    TxOrderHash: string;
    BlockNumber: bigint;
    PartitionID: number;
    Transaction: TransactionRecord;
};

export type Tx = {
    TxRecordHash: string;
    TxOrderHash: string;
    BlockNumber: bigint;
    PartitionID: number;
    Transaction: Transaction;
};

export type TxsResponse = {
    transactions: Tx[];
    offsetKey: string;
};

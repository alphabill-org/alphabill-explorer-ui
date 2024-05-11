type Payload = {
    SystemID: number;
    Type: string;
    UnitID: string;
    Attributes: string;
    ClientMetadata: {
        Timeout: number;
        MaxTransactionFee: number;
        FeeCreditRecordID: null | string;
    };
};

type TransactionOrder = {
    Payload: Payload;
    OwnerProof: string;
    FeeProof: null | string;
};

type ServerMetadata = {
    ActualFee: number;
    TargetUnits: string[];
    SuccessIndicator: number;
    ProcessingDetails: null | string;
};

type Transaction = {
    TransactionOrder: TransactionOrder;
    ServerMetadata: ServerMetadata;
};

export type Tx = {
    TxRecordHash: string;
    TxOrderHash: string;
    BlockNumber: bigint;
    Transaction: Transaction;
};

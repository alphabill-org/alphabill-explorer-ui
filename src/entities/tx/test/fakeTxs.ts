import { Tx } from "../types/txTypes";

const fakeTransaction1: Tx = {
    TxRecordHash: "MX2EFp5xXLWzUyHGvrUv9ypaNEJRuV5NZUH+JaXf20=",
    TxOrderHash: "2grCq/EsVv6WnHA6fNOEKnGNCTw6Zllgoba1xnZRL0E=",
    BlockNumber: BigInt(279458),
    Transaction: {
        TransactionOrder: {
            Payload: {
                SystemID: 1,
                Type: "transFC",
                UnitID: "0xf79e254f64ff5fd1d3a40e8de2643893de2d5c1e10e54beebae937d4ec02dd9300",
                Attributes: "Example attributes for transaction",
                ClientMetadata: {
                    Timeout: 279467,
                    MaxTransactionFee: 1,
                    FeeCreditRecordID: null
                }
            },
            OwnerProof: "ExampleOwnerProof==",
            FeeProof: null
        },
        ServerMetadata: {
            ActualFee: 1,
            TargetUnits: ["0xf79e254f64ff5fd1d3a40e8de2643893de2d5c1e10e54beebae937d4ec02dd9300"],
            SuccessIndicator: 0,
            ProcessingDetails: null
        }
    }
};

const fakeTransaction2: Tx = {
    TxRecordHash: "AE3fFp5xXLWzUyHGvrUv9ypaNEJRuV5NZUH+XgXf21=",
    TxOrderHash: "3HsCq/EsVv6WnHA6fNOEKnGNCTw6Zllgoba1xnZRL0F=",
    BlockNumber: BigInt(279459),
    Transaction: {
        TransactionOrder: {
            Payload: {
                SystemID: 1,
                Type: "transFD",
                UnitID: "0xc56e254f64ff5fd1d3a40e8de2643893de2d5c1e10e54beebae937d4ec03ee9411",
                Attributes: "Additional attributes for another transaction",
                ClientMetadata: {
                    Timeout: 279468,
                    MaxTransactionFee: 2,
                    FeeCreditRecordID: null
                }
            },
            OwnerProof: "AnotherExampleOwnerProof==",
            FeeProof: null
        },
        ServerMetadata: {
            ActualFee: 2,
            TargetUnits: ["0xc56e254f64ff5fd1d3a40e8de2643893de2d5c1e10e54beebae937d4ec03ee9411"],
            SuccessIndicator: 1,
            ProcessingDetails: null
        }
    }
};

export { fakeTransaction1, fakeTransaction2 };
import {
  Block,
  ClientMetadata,
  Header,
  InputRecord,
  Payload,
  ServerMetadata,
  TransactionOrder,
  TransactionRecord,
  UnicityCertificate,
  UnicitySeal,
  UnicityTreeCertificate,
} from "./types";

const header: Header = {
  SystemID: "SystemID",
  ShardID: "string",
  ProposerID: "string",
  PreviousBlockHash: "string",
};

const inputRecord: InputRecord = {
  PreviousHash: "PreviousHash", //`json:"previous_hash,omitempty"`      // previously certified state hash
  Hash: "hash", //`json:"hash,omitempty"`               // state hash to be certified
  BlockHash: "block hash", //`json:"block_hash,omitempty"`         // hash of the block
  SummaryValue: "summaryValue", //`json:"summary_value,omitempty"`      // summary value to certified
  RoundNumber: BigInt(1), //`json:"round_number,omitempty"`       // transaction system's round number
  SumOfEarnedFees: BigInt(5555), //`json:"sum_of_earned_fees,omitempty"` // sum of the actual fees over all transaction records in the block
};

const unicitySeal: UnicitySeal = {
  RootChainRoundNumber: 222,
  Timestamp: 56,
  PreviousHash: "0x01345...",
  Hash: "0x011111...",
  Signatures: ["1", "2"],
};
const unicityTreeCertificate: UnicityTreeCertificate = {
  SystemIdentifier: "SystemIdentifier", //`json:"system_identifier,omitempty"`
  SiblingHashes: ["hash1", "hash2"], //`json:"sibling_hashes,omitempty"`
  SystemDescriptionHash: "SystemDescriptionHas",
};

const clientMetadata: ClientMetadata = {
  Timeout: 500,
  MaxTransactionFee: 123,
  FeeCreditRecordID: "",
};
const payload: Payload = {
  SystemID: "123",
  Type: "type",
  UnitID: "Unitid",
  Attributes: "attr",
  ClientMetadata: clientMetadata,
};
const transactionOrder: TransactionOrder = {
  Payload: payload,
  OwnerProof: "ownerProof",
  FeeProof: "feeProof",
};
const serverMetadata: ServerMetadata = {
  ActualFee: BigInt(234),
  TargetUnits: ["1", "2"],
  SuccessIndicator: 111,
  ProcessingDetails: "processDetails",
};
const transactionRecord: TransactionRecord = {
  TransactionOrder: transactionOrder,
  ServerMetadata: serverMetadata,
};

const unicityCertificate: UnicityCertificate = {
  InputRecord: inputRecord, //`json:"input_record,omitempty"`
  UnicityTreeCertificate: unicityTreeCertificate, //`json:"unicity_tree_certificate,omitempty"`
  UnicitySeal: unicitySeal, //`json:"unicity_seal,omitempty"`
};

export const block: Block = {
  Header: header,
  Transactions: [transactionRecord, transactionRecord],
  UnicityCertificate: unicityCertificate,
};

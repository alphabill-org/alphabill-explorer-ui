export type Block = {
  Header: Header;
  Transactions: TransactionRecord[];
  UnicityCertificate: UnicityCertificate;
};

export type Header = {
  SystemID: string;
  ShardID: string;
  ProposerID: string;
  PreviousBlockHash: string;
};

export type UnicityCertificate = {
  InputRecord: InputRecord; //`json:"input_record,omitempty"`
  UnicityTreeCertificate: UnicityTreeCertificate; //`json:"unicity_tree_certificate,omitempty"`
  UnicitySeal: UnicitySeal; //`json:"unicity_seal,omitempty"`
};

export type InputRecord = {
  PreviousHash: string; //`json:"previous_hash,omitempty"`      // previously certified state hash
  Hash: string; //`json:"hash,omitempty"`               // state hash to be certified
  BlockHash: string; //`json:"block_hash,omitempty"`         // hash of the block
  SummaryValue: string; //`json:"summary_value,omitempty"`      // summary value to certified
  RoundNumber: number; //`json:"round_number,omitempty"`       // transaction system's round number
  SumOfEarnedFees: number; //`json:"sum_of_earned_fees,omitempty"` // sum of the actual fees over all transaction records in the block
};

export type UnicityTreeCertificate = {
  SystemIdentifier: string; //`json:"system_identifier,omitempty"`
  SiblingHashes: string[]; //`json:"sibling_hashes,omitempty"`
  SystemDescriptionHash: string; //`json:"system_description_hash,omitempty"`
};

export type UnicitySeal = {
  RootChainRoundNumber: number; //`json:"root_chain_round_number,omitempty"`
  Timestamp: number; //`json:"timestamp,omitempty"`
  PreviousHash: string; //`json:"previous_hash,omitempty"`
  Hash: string; //`json:"hash,omitempty"`
  Signatures: string[]; //`json:"signatures,omitempty"`
};

export type TransactionRecord = {
  TransactionOrder: TransactionOrder;
  ServerMetadata: ServerMetadata;
};

export type ServerMetadata = {
  ActualFee: number;
  TargetUnits: string[];
  SuccessIndicator: number;
  ProcessingDetails: string;
};

export type TransactionOrder = {
  Payload: Payload;
  OwnerProof: string;
  FeeProof: string;
};

export type Payload = {
  SystemID: string;
  Type: string;
  UnitID: string;
  Attributes: string;
  ClientMetadata: ClientMetadata;
};

export type ClientMetadata = {
  Timeout: number;
  MaxTransactionFee: number;
  FeeCreditRecordID: string;
};

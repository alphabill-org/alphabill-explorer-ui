type InputRecord = {
  previous_hash: string;
  hash: string;
  block_hash: string;
  summary_value: string;
  round_number: bigint;
};

type UnicityTreeCertificate = {
  system_identifier: number;
  sibling_hashes: Array<{ Key: string; Hash: string }>;
  system_description_hash: string;
};

type UnicitySeal = {
  root_chain_round_number: bigint;
  timestamp: number;
  previous_hash: string;
  hash: string;
  signatures: { [key: string]: string };
};

type UnicityCertificate = {
  input_record: InputRecord;
  unicity_tree_certificate: UnicityTreeCertificate;
  unicity_seal: UnicitySeal;
};

type Header = {
  SystemID: number;
  ShardID: string;
  ProposerID: string;
  PreviousBlockHash: string;
};

export type Block = {
  Header: Header;
  TxHashes: string[];
  UnicityCertificate: UnicityCertificate;
};

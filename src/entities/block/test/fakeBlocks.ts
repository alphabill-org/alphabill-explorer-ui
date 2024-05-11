import { Block } from "../types/blockTypes";

const fakeBlock1: Block = {
  Header: {
      SystemID: 1,
      ShardID: "shard-001",
      ProposerID: "proposer-abc123",
      PreviousBlockHash: "0000000000000000000000000000000000000000000000000000000000000000"
  },
  TxHashes: ["txhash1", "txhash2", "txhash3"],
  UnicityCertificate: {
      input_record: {
          previous_hash: "prevhash1",
          hash: "hash1",
          block_hash: "blockhash1",
          summary_value: "summary1",
          round_number: 105n,
          sum_of_earned_fees: 5000n
      },
      unicity_tree_certificate: {
          system_identifier: 1,
          sibling_hashes: [{ Key: "key1", Hash: "hash1" }, { Key: "key2", Hash: "hash2" }],
          system_description_hash: "sysdeschash1"
      },
      unicity_seal: {
          root_chain_round_number: 10n,
          timestamp: 1650000000,
          previous_hash: "prevhash1",
          hash: "sealhash1",
          signatures: {
              "node1": "signature1",
              "node2": "signature2"
          }
      }
  }
};

const fakeBlock2: Block = {
  Header: {
      SystemID: 2,
      ShardID: "shard-002",
      ProposerID: "proposer-def456",
      PreviousBlockHash: "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"
  },
  TxHashes: ["txhash4", "txhash5"],
  UnicityCertificate: {
      input_record: {
          previous_hash: "prevhash2",
          hash: "hash2",
          block_hash: "blockhash2",
          summary_value: "summary2",
          round_number: 20n,
          sum_of_earned_fees: 10000n
      },
      unicity_tree_certificate: {
          system_identifier: 2,
          sibling_hashes: [{ Key: "key3", Hash: "hash3" }, { Key: "key4", Hash: "hash4" }],
          system_description_hash: "sysdeschash2"
      },
      unicity_seal: {
          root_chain_round_number: 20n,
          timestamp: 1655000000,
          previous_hash: "prevhash2",
          hash: "sealhash2",
          signatures: {
              "node3": "signature3",
              "node4": "signature4"
          }
      }
  }
};

export {fakeBlock1,fakeBlock2}
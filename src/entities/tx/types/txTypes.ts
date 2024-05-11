type Header = {
    SystemID: number;
    ShardID: null | string; // Assuming ShardID can be null or a string
    ProposerID: string;
    PreviousBlockHash: string;
}

type UnicityCertificate = {
    input_record: {
        previous_hash: string;
        hash: string;
        block_hash: string;
        summary_value: string;
        round_number: bigint;
        sum_of_earned_fees: bigint;
    };
    unicity_tree_certificate: {
        system_identifier: number;
        sibling_hashes: {
            Key: string;
            Hash: string;
        }[];
        system_description_hash: string;
    };
}

type UnicitySeal = {
    root_chain_round_number: bigint;
    timestamp: number;
    previous_hash: string;
    hash: string;
    signatures: Record<string, string>; // Assuming signatures are key-value pairs of string
}

export type Tx =  {
    Header: Header;
    TxHashes: string[];
    UnicityCertificate: UnicityCertificate;
    unicity_seal: UnicitySeal;
}
import { CborDecoder } from '@alphabill/alphabill-js-sdk/lib/codec/cbor/CborDecoder';
import { InputRecord } from '@alphabill/alphabill-js-sdk/lib/unit/UnicityCertificate';
import { Base16Converter } from '@alphabill/alphabill-js-sdk/lib/util/Base16Converter';

import { computeTimeAgo } from './timeUtils';

function parseInputRecord(rawData: Uint8Array): InputRecord {
  const tag = CborDecoder.readTag(rawData);
  const data = CborDecoder.readArray(tag.data);
  const inputRecordCbor = data[1];
  return InputRecord.fromCbor(inputRecordCbor);
}
export function extractPreviousHash(rawData: Uint8Array): string {
  const inputRecord = parseInputRecord(rawData);
  return inputRecord.previousHash != null
    ? Base16Converter.encode(inputRecord.previousHash)
    : 'N/A';
}

export function extractBlockHash(rawData: Uint8Array): string {
  const inputRecord = parseInputRecord(rawData);
  return inputRecord.blockHash != null
    ? Base16Converter.encode(inputRecord.blockHash)
    : 'N/A';
}

export function extractSummaryValue(rawData: Uint8Array): string {
  const inputRecord = parseInputRecord(rawData);
  return Base16Converter.encode(inputRecord.summaryValue);
}

export function getCertificateTimeAgo(cert: string): string {
  try {
    const certHex = cert.startsWith('0x') ? cert.slice(2) : cert;
    const rawCert = Base16Converter.decode(certHex);
    const timestamp = Number(parseInputRecord(rawCert).timestamp);
    return computeTimeAgo(timestamp);
  } catch (e) {
    console.error('Error decoding certificate', e);
    return 'N/A';
  }
}

export interface ICertificateValues {
  timeAgo: string;
  summaryValue: string;
  blockHash: string;
  previousHash: string;
}

export function parseCertificateValues(cert: string): ICertificateValues {
  let timeAgo = 'N/A';
  let summaryValue = 'N/A';
  let blockHash = 'N/A';
  let previousHash = 'N/A';
  try {
    const certHex = cert.startsWith('0x') ? cert.slice(2) : cert;
    const rawCert = Base16Converter.decode(certHex);
    timeAgo = getCertificateTimeAgo(cert);
    summaryValue = extractSummaryValue(rawCert);
    blockHash = extractBlockHash(rawCert);
    previousHash = extractPreviousHash(rawCert);
  } catch (e) {
    console.error('Error decoding certificate in parseCertificateValues', e);
  }
  return { blockHash, previousHash, summaryValue, timeAgo };
}

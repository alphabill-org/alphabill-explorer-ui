import { CborDecoder } from '@alphabill/alphabill-js-sdk/lib/codec/cbor/CborDecoder';
import {
  UnicityCertificate,
  InputRecord,
} from '@alphabill/alphabill-js-sdk/lib/unit/UnicityCertificate';
import { Base16Converter } from '@alphabill/alphabill-js-sdk/lib/util/Base16Converter';

import { computeTimeAgo } from './timeUtils';

export function extractCertificateTimestamp(rawData: Uint8Array): number {
  const tag = CborDecoder.readTag(rawData);
  const data = CborDecoder.readArray(tag.data);
  const inputRecordCbor = data[1];
  const inputRecord: InputRecord = InputRecord.fromCbor(inputRecordCbor);

  return Number(inputRecord.timestamp);
}

export function decodeUnicityCertificate(rawData: Uint8Array): {
  certificate: UnicityCertificate;
  timestamp: number;
} {
  const certificate: UnicityCertificate = UnicityCertificate.fromCbor(rawData);
  const timestamp = Number(certificate.inputRecord.timestamp);

  return { certificate, timestamp };
}

export function extractSummaryValue(rawData: Uint8Array): string {
  const tag = CborDecoder.readTag(rawData);
  const data = CborDecoder.readArray(tag.data);
  const inputRecordCbor = data[1];
  const inputRecord: InputRecord = InputRecord.fromCbor(inputRecordCbor);
  return Base16Converter.encode(inputRecord.summaryValue);
}

export function getCertificateTimeAgo(cert: string): string {
  try {
    let certHex = cert;
    if (certHex.startsWith('0x')) {
      certHex = certHex.slice(2);
    }
    const rawCert = Base16Converter.decode(certHex);
    const timestamp = extractCertificateTimestamp(rawCert);

    return computeTimeAgo(timestamp);
  } catch (e) {
    console.error('Error decoding certificate', e);
    return 'N/A';
  }
}

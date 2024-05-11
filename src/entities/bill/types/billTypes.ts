import { UnitID } from "../../unit";

type BillData = {
  value: string; // The monetary value of this bill
  lastUpdate: string; // The round number of the last transaction with the bill
  backlink: string; // Backlink (256-bit hash)
  locked: string; // locked status of the bill, non-zero value means locked
};

export type Bill = {
  ID: UnitID; // Assuming types.UnitID is a string
  BillData: BillData | null; // Assuming BillData can be null
};

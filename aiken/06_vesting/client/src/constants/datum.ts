import { Data } from "lucid-cardano";


const DatumSchema = Data.Object({
    lock_until: Data.Integer(),
    owner: Data.Bytes(),
    beneficiary: Data.Bytes(),
})

export type Datum = Data.Static<typeof DatumSchema>;
export const Datum = DatumSchema as unknown as Datum;
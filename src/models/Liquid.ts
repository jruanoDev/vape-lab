import { Flavour } from "./Flavour";

export class Liquid {
    baseVG:number;
    basePG:number;
    totalQuantity:number;
    totalNicotine:number;
    nicokitConcentration:number;
    nicokitVG:number;
    nicokitPG:number;
    flavours:Array<Flavour>;
    name:string;
    createdAt: Date;
    reminderAddedAt: Date;
}
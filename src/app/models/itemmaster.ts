export interface Itemmaster
{
    id:number;
    catCode:string;
    itemBarCode:string;
    itemCode:string;
    itemName:string;
    description?:number;
    uom:string;
    rate?:number;
    minimumStock:number;
    maximumStock:number;
    isActive:number;
}


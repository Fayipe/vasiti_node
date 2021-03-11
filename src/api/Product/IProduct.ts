import { IBaseInterface } from "../baseInterface";

export interface IProduct extends IBaseInterface {
    // type any is used to prevent error on validation level
    product_name?: any;
    product_description?: any;
    slug?: any;
    product_varieties?: IVariety[];
}

export interface IVariety {
    size?: any;
    color?: any;
    quantity?: any;
    price?: any;
}
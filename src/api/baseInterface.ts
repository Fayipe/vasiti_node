import { SchemaMap } from "joi";

export interface IBaseInterface extends SchemaMap {
    id?: number;
    dateUploaded?: Date;
    dateEdited?: Date;
}

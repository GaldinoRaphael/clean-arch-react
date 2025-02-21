import { ITransactionType } from "./ITransactionType";

export interface ITransactionTypeRepository{
    listAll: () => Promise<ITransactionType[]>;
}
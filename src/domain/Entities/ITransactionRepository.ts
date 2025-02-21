import { ITransaction } from "./ITransaction";

export interface ITransactionRepository {
    listAll(): Promise<ITransaction[]>;
    save(userId: string, value: number, transactionTypeId: number): Promise<void>;
}
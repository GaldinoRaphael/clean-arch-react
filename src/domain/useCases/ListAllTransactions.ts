import { ITransaction } from "../Entities/ITransaction";
import { ITransactionRepository } from "../Entities/ITransactionRepository";

export class ListAllTransactions{
    constructor(private transactionRepository: ITransactionRepository) {}

    async execute(): Promise<ITransaction[]> {
        return this.transactionRepository.listAll();
    }
}
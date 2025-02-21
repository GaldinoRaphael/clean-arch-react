import { ITransactionRepository } from "../Entities/ITransactionRepository";
import { ITransactionType } from "../Entities/ITransactionType";

export class CreateTransaction {
    constructor(private transactionRepository: ITransactionRepository) {}

    execute(userId: string, value: number, transactionTypeId: number): void {
        this.transactionRepository.save(userId, value, transactionTypeId);
    }
}
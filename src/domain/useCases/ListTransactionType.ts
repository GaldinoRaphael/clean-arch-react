import { ITransactionTypeRepository } from "../Entities/ITransactionTypeRepository";

export class ListTransactionType {
    constructor(private transactionTypeRepository: ITransactionTypeRepository) {}
    
    execute(){
        return this.transactionTypeRepository.listAll();
    }
}
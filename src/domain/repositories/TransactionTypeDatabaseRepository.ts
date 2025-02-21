import { supabase } from "../../infra/supabase/config";
import { ITransactionTypeRepository } from "../Entities/ITransactionTypeRepository";

export class TransactionTypeDatabaseRepository implements ITransactionTypeRepository {
    async listAll(){
        const { data: transaction_type, error } = await supabase
        .from('transaction_type')
        .select('*')

        if(error) {
            throw 'Não foi possível listar as transações';
        }

        return transaction_type;
    }
}
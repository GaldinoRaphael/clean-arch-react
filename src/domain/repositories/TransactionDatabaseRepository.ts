import { supabase } from "../../infra/supabase/config";
import { ITransaction } from "../Entities/ITransaction";
import { ITransactionRepository } from "../Entities/ITransactionRepository";

export class TransactionDatabaseRepository implements ITransactionRepository {
    async listAll(): Promise<ITransaction[]> {

        const { data: transactions, error } = await supabase
            .from('transactions')
            .select(`
                *,
                transaction_type (id, display)
            `)

        if (error) {
            throw new Error('Erro ao listar transações')
        }

        if(!transactions){
            return [];
        }

        const result: ITransaction[] = transactions.map(transaction => {
            if (!transaction.transaction_type) {
                throw Error('Transação sem tipo encontrada!')
            }

            return {
                id: transaction.id,
                value: transaction.value,
                type: {
                    id: transaction.transaction_type.id,
                    display: transaction.transaction_type.display,
                },
                date: new Date(transaction.created_at),
            }
        });

        return result;
    }

    async save(userId: string, value: number, transactionTypeId: number): Promise<void> {
        const { error } = await supabase
            .from('transactions')
            .insert([
                {
                    user_id: userId,
                    value: value,
                    transaction_type_id: transactionTypeId,
                },
            ])
            .select()

        if (error) {
            throw new Error('Erro ao criar transação')
        }

        return;
    }
}
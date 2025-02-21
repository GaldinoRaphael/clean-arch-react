import { useEffect, useState } from "react"
import { Form, Heading, Wrapper } from "./styles"
import { Button } from "../../components/Button"
import { Card } from "../../components/Card"
import { TextField } from "../../components/TextField"
import { FormLabel } from "../../components/FormLabel"
import { Dropdown } from "../../components/Dropdown"
import { ListTransactionType } from "../../domain/useCases/ListTransactionType"
import { TransactionTypeDatabaseRepository } from "../../domain/repositories/TransactionTypeDatabaseRepository"
import { ITransactionType } from "../../domain/Entities/ITransactionType"
import { TransactionDatabaseRepository } from "../../domain/repositories/TransactionDatabaseRepository"
import { CreateTransaction } from "../../domain/useCases/CreateTransaction"
import { useAuthContext } from "../../app/hooks/useAuthContext"
import { toast } from "react-toastify"

export const TransactionForm = () => {

    
    const [transactionType, setTransactionType] = useState('');
    const [transactionTypes, setTransactionTypes] = useState<ITransactionType[]>();
    const [transactionValue, setTransactionValue] = useState('');
    const { session } = useAuthContext();

    const transactionTypeRepository = new TransactionTypeDatabaseRepository();
    const listTransactionType = new ListTransactionType(transactionTypeRepository);

    const transactionRepository = new TransactionDatabaseRepository();
    const createTransaction = new CreateTransaction(transactionRepository);

    useEffect(() => {
        listTransactionType.execute().then(transactionTypes => {
            setTransactionTypes(transactionTypes)
        });
    }, [])

    const handleFormSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try{
            createTransaction.execute(session?.user.id!, parseFloat(transactionValue), parseInt(transactionType));
            setTransactionType('');
            setTransactionValue('');
            toast.success('Transação realizada com sucesso')
        }catch(err){
            console.error(err);
            toast.error('Erro ao criar transação');
        }

    }

    return (
        <Card>
            <Wrapper>
                <Form onSubmit={handleFormSubmit}>
                    <Heading>
                        Nova transação
                    </Heading>
                    <fieldset>
                        <FormLabel>
                            Transação
                        </FormLabel>
                        <Dropdown
                            value={transactionType}
                            onChange={evt => setTransactionType(evt.target.value)}
                            required
                        >
                            <option value="" disabled hidden>
                                Selecione o tipo de transação
                            </option>
                            {transactionTypes && transactionTypes.map(transactionType => (
                                <option key={transactionType.id} value={transactionType.id}>{transactionType.display}</option>
                            ))}
                        </Dropdown>
                    </fieldset>
                    <fieldset>
                        <FormLabel>
                            Valor
                        </FormLabel>
                        <TextField
                            placeholder="R$ 00,00"
                            type="number"
                            value={transactionValue}
                            onChange={evt => setTransactionValue(evt.target.value)}
                            required
                        />
                    </fieldset>
                    <Button>
                        Concluir transação
                    </Button>
                </Form>
            </Wrapper>
        </Card>
    )
}
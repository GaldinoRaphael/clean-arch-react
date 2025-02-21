import styled from "styled-components"
import { Sidebar } from "../presentation/Sidebar"
import { TransactionForm } from "../presentation/TransactionForm"
import { Account } from "../presentation/Account"
import { Statement } from "../presentation/Statement"
import { useState, useEffect } from "react"
import { ITransaction } from "../domain/Entities/ITransaction"
import { TransactionDatabaseRepository } from "../domain/repositories/TransactionDatabaseRepository"
import { ListAllTransactions } from "../domain/useCases/ListAllTransactions"

const Main = styled.main`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    gap: 34px;
`



const transactionRepository = new TransactionDatabaseRepository();
const listAllTransactions = new ListAllTransactions(transactionRepository);

const Home = () => {

  const [transactions, setTransactions] = useState<ITransaction[]>([])
  useEffect(() => {
    listAllTransactions.execute()
      .then(data => setTransactions(data))
  }, [])


  return (
    <>
      <Sidebar />
      <Main>
        <Account />
        <TransactionForm />
      </Main>
      <div>
        <Statement allTransactions={transactions} />
      </div>
    </>
  )
}

export default Home

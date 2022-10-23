import { useSelector } from 'react-redux';

import { format } from 'date-fns';
import { selectTransactionCategories } from 'redux/transactions/transactionsSelectors';
import {
  Li,
  DivItem,
  PName,
  PValue,
  // Sum
} from './DashboardPage.styled';
import EmptyTransactions from '../EmptyTransactions/EmptyTransactions';
import useSortedTtransactions from 'hooks/sortedTtransactions';
import ActionBlock from 'components/ActionBlock/ActionBlock';
const MobileDashboard = () => {
  const transactions = useSortedTtransactions();
  const categories = useSelector(selectTransactionCategories);

  return (
    <>
      {transactions ? (
        transactions.map(item => {
          return (
            <Li key={item.id}>
              <DivItem transaction={item.type}>
                <PName> Date</PName>
                <PValue>
                  {format(new Date(item.transactionDate), 'dd.MM.yy')}
                </PValue>
              </DivItem>

              <DivItem transaction={item.type}>
                <PName> Type</PName>
                <PValue>{item.type === 'INCOME' ? '+' : '-'}</PValue>
              </DivItem>

              <DivItem transaction={item.type}>
                <PName> Category</PName>
                <PValue>
                  {categories.map(
                    cat => cat.id === item.categoryId && cat.name
                  )}
                </PValue>
              </DivItem>

              <DivItem transaction={item.type}>
                <PName> Comment</PName>
                <PValue> {item.comment}</PValue>
              </DivItem>

              <DivItem transaction={item.type}>
                <PName> Sum</PName>
                <PValue transaction={item.type}>
                  {item.amount < 0
                    ? item.amount.toFixed(2) * -1
                    : item.amount.toFixed(2)}
                </PValue>
              </DivItem>

              <DivItem transaction={item.type}>
                <PName> Balance</PName>
                <PValue>{item.balanceAfter.toFixed(2)}</PValue>
              </DivItem>
              <ActionBlock item={item} />
            </Li>
          );
        })
      ) : (
        <EmptyTransactions />
      )}
    </>
  );
};
export default MobileDashboard;

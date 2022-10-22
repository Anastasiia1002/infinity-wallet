import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import HeroBar from 'components/HeroBar';
import Table from 'components/Table';
import Loader from 'components/Loader';
import Container from 'components/Container';
import Navigation from 'components/Navigation';
import { Wrapper, DiagramBox } from './DiagramTable.styled';

import { getTransactionsForPeriod } from 'redux/transactions/transactionsOperation';
import { selectIsLoadingTransaction } from 'redux/transactions/transactionsSelectors';

import timeConverter from 'utility/timeConvertor';
import useIsMobile from 'hooks/isMobile';

const DiagramTable = () => {
  const isMobileScreen = useIsMobile();

  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoadingTransaction);
  const defaultDate = timeConverter();
  const [date, setDate] = useState(defaultDate);
  useEffect(() => {
    dispatch(getTransactionsForPeriod(date));
  }, [dispatch, date]);
  return (
    <Container>
      <Wrapper>
        {!isMobileScreen ? <HeroBar /> : <Navigation />}
        <DiagramBox>
          {isLoading ? <Loader /> : <Table setDate={setDate} />}
        </DiagramBox>
      </Wrapper>
    </Container>
  );
};

export default DiagramTable;

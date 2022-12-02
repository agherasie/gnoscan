import React from 'react';
import styled from 'styled-components';
import MainCard from '@/components/view/main-card/main-card';
import MainRealm from '@/components/view/main-realm/main-realm';
import MainTransactionNews from '@/components/view/main-transaction-news/main-transaction-news';
import MainActiveList from '@/components/view/main-active-list';
import Tooltip from '@/components/ui/tooltip';
import {Button} from '@/components/ui/button';

const Home: React.FC = () => {
  return (
    <Wrapper>
      <div className="inner-layout">
        <MainCard />
        <MainActiveList />
        <MainRealm />
        <MainTransactionNews />
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.main`
  width: 100%;
  flex: 1;
  padding: 48px 0px;
`;

const SecondLine = styled.div`
  width: 100%;
`;

export default Home;

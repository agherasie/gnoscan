'use client';

import React from 'react';
import styled from 'styled-components';
import Card from '@/components/ui/card';
import Text from '@/components/ui/text';
import {eachMedia} from '@/common/hooks/use-media';
import axios from 'axios';
import {useQuery, UseQueryResult} from 'react-query';
import {numberWithCommas, numberWithFixedCommas} from '@/common/utils';
import mixins from '@/styles/mixins';
import IconInfo from '@/assets/svgs/icon-info.svg';
import {Button} from '@/components/ui/button';
import {Tooltip} from '@/components/ui/tooltip';

interface SupplyResultType {
  supply: string;
  exit: string;
  holders: string;
}

const MainCard = () => {
  const media = eachMedia();
  const {data: card01, isSuccess: card01Success}: UseQueryResult<SupplyResultType> = useQuery(
    'info/card01',
    async () => await axios.get('http://3.218.133.250:7677/v3/info/card01'),
    {
      select: (res: any) => {
        const supply = res.data.gnot_supply;
        return {
          ...supply,
          supply: numberWithCommas(supply.supply),
          exit: numberWithCommas(supply.exit),
          holders: numberWithCommas(supply.holders),
        };
      },
    },
  );

  const {data: card02, isSuccess: card02Success} = useQuery(
    'info/card02',
    async () => await axios.get('http://3.218.133.250:7677/v3/info/card02'),
    {
      select: (res: any) => {
        const block = res.data.block;
        return {
          ...block,
          height: numberWithCommas(block.height),
          avg_tx: numberWithFixedCommas(block.avg_time, 2),
          avg_time: numberWithFixedCommas(block.avg_tx, 2),
        };
      },
    },
  );

  const {data: card03, isSuccess: card03Success} = useQuery(
    'info/card03',
    async () => await axios.get('http://3.218.133.250:7677/v3/info/card03'),
    {
      select: (res: any) => {
        const tx = res.data.tx;
        return {
          avg_24hr: numberWithFixedCommas(tx.avg_24hr, 6),
          total_fee: numberWithFixedCommas(tx.total_fee / 1000000, 2),
          total_txs: numberWithCommas(tx.total_txs),
        };
      },
    },
  );

  const {data: card04, isSuccess: card04Success} = useQuery(
    'info/card04',
    async () => await axios.get('http://3.218.133.250:7677/v3/info/card04'),
    {
      select: (res: any) => {
        const account = res.data.account;
        return {
          num: numberWithCommas(account.num),
          registered: numberWithCommas(account.registered),
          validators: numberWithCommas(account.validators),
        };
      },
    },
  );

  return (
    <Wrapper className={media}>
      <StyledCard>
        {card01Success && (
          <>
            <Text type="h5" color="primary">
              GNOT&nbsp;Supply
            </Text>
            <Text type="h3" color="primary" margin="10px 0px 24px">
              {card01?.supply}
              <Text type="p4" display="inline-block" color="primary">
                &nbsp;GNOT
              </Text>
            </Text>
            <DataBox>
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    Exitdroptotal_Supply
                  </Text>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {card01?.exit}
                  </Text>
                </dd>
              </BundleDl>
              <hr />
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    Holders
                  </Text>
                  <Button width="16px" height="16px" radius="50%" bgColor="surface">
                    <IconInfo className="svg-info" />
                  </Button>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {card01?.holders}
                  </Text>
                </dd>
              </BundleDl>
            </DataBox>
          </>
        )}
      </StyledCard>
      <StyledCard>
        {card02Success && (
          <>
            <Text type="h5" color="primary">
              Block&nbsp;Height
            </Text>
            <Text type="h3" color="primary" margin="10px 0px 24px">
              {card02.height}
            </Text>
            <DataBox>
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    Avg.&nbsp;Block Time
                  </Text>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {`${card02?.avg_time} seconds`}
                  </Text>
                </dd>
              </BundleDl>
              <hr />
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    Avg.&nbsp;Tx/Block
                  </Text>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {card02?.avg_tx}
                  </Text>
                </dd>
              </BundleDl>
            </DataBox>
          </>
        )}
      </StyledCard>
      <StyledCard>
        {card03Success && (
          <>
            <Text type="h5" color="primary">
              Total&nbsp;Transactions
            </Text>
            <Text type="h3" color="primary" margin="10px 0px 24px">
              {card03?.total_txs}
            </Text>
            <DataBox>
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    24h&nbsp;Avg.&nbsp;Fee
                  </Text>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {/* {`${card03?.avg_24hr} GNOT`} */}
                    123,456 GNOT
                  </Text>
                </dd>
              </BundleDl>
              <hr />
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    Total&nbsp;Fees
                  </Text>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {`${card03?.total_fee} GNOT`}
                  </Text>
                </dd>
              </BundleDl>
            </DataBox>
          </>
        )}
      </StyledCard>
      <StyledCard>
        {card04Success && (
          <>
            <Text type="h5" color="primary" className="title-info">
              Total&nbsp;Accounts
              <Button width="16px" height="16px" radius="50%" bgColor="base">
                <IconInfo className="svg-info" />
              </Button>
            </Text>
            <Text type="h3" color="primary" margin="10px 0px 24px">
              {card04?.num}
            </Text>
            <DataBox>
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    Validators
                  </Text>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {`${card04?.validators} GNOT`}
                  </Text>
                </dd>
              </BundleDl>
              <hr />
              <BundleDl>
                <dt>
                  <Text type="p4" color="tertiary">
                    Total&nbsp;Users
                  </Text>
                  <Button width="16px" height="16px" radius="50%" bgColor="surface">
                    <IconInfo className="svg-info" />
                  </Button>
                </dt>
                <dd>
                  <Text type="p4" color="primary">
                    {`${card04?.registered} GNOT`}
                  </Text>
                </dd>
              </BundleDl>
            </DataBox>
          </>
        )}
      </StyledCard>
    </Wrapper>
  );
};

const DataBox = ({children}: {children: React.ReactNode}) => {
  return <DataBoxContainer>{children}</DataBoxContainer>;
};

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  grid-gap: 32px;
  grid-template-columns: repeat(4, 1fr);
  &.tablet {
    grid-template-columns: 1fr 1fr;
    grid-gap: 16px;
  }
  &.mobile {
    grid-template-columns: 1fr;
    grid-gap: 16px;
  }
  .title-info {
    ${mixins.flexbox('row', 'center', 'flex-start')};
    gap: 6px;
  }
  .svg-info {
    fill: ${({theme}) => theme.colors.reverse};
  }
  .u-gnot {
  }
`;

const DataBoxContainer = styled.div`
  background-color: ${({theme}) => theme.colors.base};
  border: 1px solid ${({theme}) => theme.colors.dimmed50};
  border-radius: 10px;
  width: 100%;
  padding: 16px;
  hr {
    width: 100%;
    border-top: 1px solid ${({theme}) => theme.colors.dimmed50};
    margin: 10px 0px;
  }
`;

const StyledCard = styled(Card)`
  overflow: hidden;
  width: 100%;
  min-height: 223px;
`;

const BundleDl = styled.dl`
  ${mixins.flexbox('row', 'center', 'space-between')};
  dt {
    ${mixins.flexbox('row', 'center', 'flex-start')};
    gap: 6px;
  }
`;

export default MainCard;

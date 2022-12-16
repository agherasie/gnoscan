'use client';

import React from 'react';
import Datatable, {DatatableOption} from '@/components/ui/datatable';
import usePageQuery from '@/common/hooks/use-page-query';
import {DatatableItem} from '..';
import Link from 'next/link';
import {Button} from '@/components/ui/button';
import styled from 'styled-components';
import theme from '@/styles/theme';
import {numberWithCommas} from '@/common/utils';
import {eachMedia} from '@/common/hooks/use-media';
import useLoading from '@/common/hooks/use-loading';
import {API_URI} from '@/common/values/constant-value';
import {useRecoilValue} from 'recoil';
import {themeState} from '@/states';
interface Realms {
  name: string;
  path: string;
  functions: number;
  block: number;
  publisher: string;
  username: string;
  total_calls: number;
  total_gas_used: number;
}

interface ResponseData {
  hits: number;
  next: boolean;
  realms: Array<Realms>;
}

export const RealmDatatable = () => {
  const media = eachMedia();
  const themeMode = useRecoilValue(themeState);
  const {data, hasNext, fetchNextPage, sortOption, setSortOption, finished} =
    usePageQuery<ResponseData>({
      key: 'realm/realm-list',
      uri: API_URI + '/latest/list/realms',
      pageable: true,
    });
  useLoading({finished});

  const getRealms = (): Array<Realms> => {
    if (!data) {
      return [];
    }
    return data.pages.reduce((accum: Array<Realms>, current) => {
      return current ? [...accum, ...current.realms] : accum;
    }, []);
  };

  const createHeaders = () => {
    return [
      createHeaderName(),
      createHeaderPath(),
      createHeaderFunctions(),
      createHeaderBlock(),
      createHeaderPublisher(),
      createHeaderTotalCalls(),
      createHeaderTotalGasUsed(),
    ];
  };

  const createHeaderName = () => {
    return DatatableOption.Builder.builder<Realms>()
      .key('name')
      .name('Name')
      .sort()
      .width(172)
      .build();
  };

  const createHeaderPath = () => {
    return DatatableOption.Builder.builder<Realms>()
      .key('path')
      .name('Path')
      .width(200)
      .colorName('blue')
      .renderOption(packagePath => <DatatableItem.RealmPakage packagePath={packagePath} />)
      .build();
  };

  const createHeaderFunctions = () => {
    return DatatableOption.Builder.builder<Realms>()
      .key('functions')
      .name('Functions')
      .width(121)
      .build();
  };

  const createHeaderBlock = () => {
    return DatatableOption.Builder.builder<Realms>()
      .key('block')
      .name('Block')
      .width(93)
      .colorName('blue')
      .renderOption(height => <DatatableItem.Block height={height} />)
      .build();
  };

  const createHeaderPublisher = () => {
    return DatatableOption.Builder.builder<Realms>()
      .key('publisher')
      .name('Publisher')
      .width(201)
      .colorName('blue')
      .renderOption((_, data) => (
        <DatatableItem.Publisher address={data.publisher} username={data.username} />
      ))
      .build();
  };

  const createHeaderTotalCalls = () => {
    return DatatableOption.Builder.builder<Realms>()
      .key('total_calls')
      .name('Total Calls')
      .sort()
      .width(166)
      .renderOption(numberWithCommas)
      .build();
  };

  const createHeaderTotalGasUsed = () => {
    return DatatableOption.Builder.builder<Realms>()
      .key('total_gas_used')
      .name('Total Gas Used')
      .width(166)
      .renderOption(gasUsed => <DatatableItem.Amount value={gasUsed} denom={'ugnot'} />)
      .build();
  };

  return (
    <Container>
      <Datatable
        headers={createHeaders().map(item => {
          return {
            ...item,
            themeMode: themeMode,
          };
        })}
        sortOption={sortOption}
        setSortOption={setSortOption}
        datas={getRealms()}
      />

      {hasNext ? (
        <div className="button-wrapper">
          <Button className={`more-button ${media}`} radius={'4px'} onClick={() => fetchNextPage()}>
            {'View More Realms'}
          </Button>
        </div>
      ) : (
        <></>
      )}
    </Container>
  );
};

const Container = styled.div<{maxWidth?: number}>`
  & {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: auto;
    align-items: center;
    background-color: ${({theme}) => theme.colors.base};
    padding-bottom: 24px;
    border-radius: 10px;

    .button-wrapper {
      display: flex;
      width: 100%;
      height: auto;
      margin-top: 4px;
      padding: 0 20px;
      justify-content: center;

      .more-button {
        width: 100%;
        padding: 16px;
        color: ${({theme}) => theme.colors.primary};
        background-color: ${({theme}) => theme.colors.surface};
        ${theme.fonts.p4}
        font-weight: 600;

        &.desktop {
          width: 344px;
        }
      }
    }
  }
`;
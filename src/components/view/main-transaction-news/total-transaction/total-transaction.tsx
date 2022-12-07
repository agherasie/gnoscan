import React, {useEffect, useState} from 'react';
import dynamic from 'next/dynamic';
import {TotalTransactionModel} from './total-transaction-model';

const BarChart = dynamic(() => import('@/components/ui/chart').then(mod => mod.BarChart), {
  ssr: false,
});

interface TotalTransactionResponse {
  date: string;
  num_txs: number;
}

export const MainTotalTransaction = () => {
  const [totalTransactionModel, setTotalTransactionModel] = useState<TotalTransactionModel>(
    new TotalTransactionModel([]),
  );

  useEffect(() => {
    fetchGasShareData();
  }, []);

  const fetchGasShareData = () => {
    try {
      fetch('http://3.218.133.250:7677/v3/info/daily_txs')
        .then(res => res.json())
        .then(res => updatChartData(res));
    } catch (e) {
      console.log(e);
    }
  };

  const updatChartData = (responseDatas: Array<TotalTransactionResponse>) => {
    setTotalTransactionModel(new TotalTransactionModel(responseDatas));
  };

  return <BarChart labels={totalTransactionModel.labels} datas={totalTransactionModel.chartData} />;
};

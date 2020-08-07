import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface ExibitionState {
  last15Exibitions: ExibitionData[];
  currentReport: ReportData;
}

export interface ReportData {
  id: string;
  exibition_id: string;
  memberlist_id?: string;
  report_finished: boolean;
  created_at: Date;
  updated_at: Date;
  exibition: ExibitionData;
}

interface ProductData {
  id: string;
  name: string;
  site: string;
  avatar_link: string;
  studio: string;
  alias: string;
  control: string;
  exibition_days: number[];
  initial_time: string;
  end_time: string;
  created_at: Date;
  updated_at: Date;
}

export interface ExibitionData {
  id: string;
  admin_id: string;
  product_id: string;
  exibition_date: Date;
  ready_time: string;
  report_sent: boolean;
  created_at: Date;
  updated_at: Date;
  product: ProductData;
}

interface ExibitionContextData {
  last15Exibitions: ExibitionData[];
  currentReport: ReportData;
  setupProductExibition(product_id: string): Promise<void>;
  setReport(exibition_id: string): Promise<void>;
}

const ExibitionContext = createContext<ExibitionContextData>(
  {} as ExibitionContextData,
);

export const ExibitionProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ExibitionState>({} as ExibitionState);

  const setupProductExibition = useCallback(async (product_id: string) => {
    const exibitionResponse = await api.get(`exibitions/last15/${product_id}`);
    const sortedExibitions: ExibitionData[] = exibitionResponse.data.sort(
      (a: ExibitionData, b: ExibitionData) =>
        a.exibition_date < b.exibition_date
          ? 1
          : a.exibition_date > b.exibition_date
          ? -1
          : 0,
    );
    const currentReport = await api.get(`reports/${sortedExibitions[0].id}`);
    setData({
      last15Exibitions: sortedExibitions,
      currentReport: currentReport.data,
    });
  }, []);

  const setReport = useCallback(
    async (exibition_id) => {
      const report = await api.get(`reports/${exibition_id}`);
      setData({
        last15Exibitions: data.last15Exibitions,
        currentReport: report.data,
      });
    },
    [data.last15Exibitions],
  );

  return (
    <ExibitionContext.Provider
      value={{
        last15Exibitions: data.last15Exibitions,
        currentReport: data.currentReport,
        setupProductExibition,
        setReport,
      }}
    >
      {children}
    </ExibitionContext.Provider>
  );
};

export function useExibition(): ExibitionContextData {
  const context = useContext(ExibitionContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

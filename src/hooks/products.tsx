/* eslint-disable no-restricted-syntax */
import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface ProductsState {
  morningProducts: ProductData[];
  afterProducts: ProductData[];
  eveningProducts: ProductData[];
}

// interface ReportData {
//   id: string;
//   exibition_id: string;
//   memberlist_id?: string;
//   report_finished: boolean;
//   created_at: Date;
//   updated_at: Date;
//   exibition: ExibitionData;
// }

interface ExibitionData {
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
  exibitions: ExibitionData[];
}

interface ProductsContextData {
  morningProducts: ProductData[];
  afterProducts: ProductData[];
  eveningProducts: ProductData[];
  setupProducts(): Promise<void>;
}

const ProductsContext = createContext<ProductsContextData>(
  {} as ProductsContextData,
);

export const ProductsProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<ProductsState>({} as ProductsState);

  const setupProducts = useCallback(async () => {
    const response = await api.get('/products');
    const productExibition = [];

    for await (const product of response.data) {
      const exibition = await api.get(`/exibitions/last15/${product.id}`);
      product.exibitions = exibition.data;
      productExibition.push(product);
    }

    const morning: ProductData[] = productExibition.filter(
      (product: ProductData) => parseFloat(product.initial_time) < 12,
    );

    const after: ProductData[] = productExibition.filter(
      (product: ProductData) =>
        parseFloat(product.initial_time) < 18 &&
        parseFloat(product.initial_time) > 11,
    );

    const evening: ProductData[] = productExibition.filter(
      (product: ProductData) => parseFloat(product.initial_time) > 17,
    );

    setData({
      morningProducts: morning,
      afterProducts: after,
      eveningProducts: evening,
    });
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        morningProducts: data.morningProducts,
        afterProducts: data.afterProducts,
        eveningProducts: data.eveningProducts,
        setupProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export function useProducts(): ProductsContextData {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

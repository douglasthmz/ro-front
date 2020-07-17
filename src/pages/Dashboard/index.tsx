import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  DayPartContainer,
  ProductCard,
  DayPartTitle,
  CardHeader,
  CardProfile,
  CardBody,
  CardInfo,
  CardFooter,
} from './styles';
import api from '../../services/api';
import Clock from '../../components/Clock';

interface StoredProduct {
  id: string;
  name: string;
  site: string;
  avatar_link?: string;
  studio: string;
  alias: string;
  control: string;
  exibition_days: number[];
  initial_time: string;
  end_time: string;
}

const Dashboard: React.FC = () => {
  const history = useHistory();

  const [morningProducts, setMorningProducts] = useState([] as StoredProduct[]);
  const [afterProducts, setAfterProducts] = useState([] as StoredProduct[]);
  const [eveningProducts, setEveningProducts] = useState([] as StoredProduct[]);

  useEffect(() => {
    const getProducts = async () => {
      const response = await api.get('/products');
      const morning: StoredProduct[] = response.data.filter(
        (product: StoredProduct) => parseFloat(product.initial_time) < 12,
      );
      morning && setMorningProducts(morning);

      const after: StoredProduct[] = response.data.filter(
        (product: StoredProduct) =>
          parseFloat(product.initial_time) < 18 &&
          parseFloat(product.initial_time) > 11,
      );
      after && setAfterProducts(after);

      const evening: StoredProduct[] = response.data.filter(
        (product: StoredProduct) => parseFloat(product.initial_time) > 17,
      );

      evening && setEveningProducts(evening);
    };

    getProducts();
  }, []);

  return (
    <Container>
      <DayPartTitle>
        <span>Manhã</span>
      </DayPartTitle>
      <DayPartContainer>
        {morningProducts &&
          morningProducts.map((product) => (
            <ProductCard
              key={product.id}
              onClick={() => history.push(`/report/${product.id}`)}
            >
              <CardHeader>
                <img src={product.avatar_link} alt="avatar" />
                <CardProfile>
                  <h1>{product.alias}</h1>
                  <h3>{product.initial_time}</h3>
                  <h3>{product.control}</h3>
                </CardProfile>
              </CardHeader>
              <CardBody>
                <CardInfo>
                  <h3>{product.studio}</h3>
                  <h3>{product.site}</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Checklist</h3>
                  <h3>xx//xx</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Matérias</h3>
                  <h3>xx//xx</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Relatório</h3>
                  <h3>Em breve</h3>
                </CardInfo>
              </CardBody>
              <CardFooter>
                <Clock
                  initialTime={product.initial_time}
                  endTime={product.end_time}
                />
              </CardFooter>
            </ProductCard>
          ))}
      </DayPartContainer>

      <DayPartTitle>
        {' '}
        <span>Tarde</span>
      </DayPartTitle>

      <DayPartContainer>
        {afterProducts &&
          afterProducts.map((product) => (
            <ProductCard key={product.id}>
              <CardHeader>
                <img src={product.avatar_link} alt="avatar" />
                <CardProfile>
                  <h1>{product.alias}</h1>
                  <h3>{product.initial_time}</h3>
                  <h3>{product.control}</h3>
                </CardProfile>
              </CardHeader>
              <CardBody>
                <CardInfo>
                  <h3>{product.studio}</h3>
                  <h3>{product.site}</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Checklist</h3>
                  <h3>xx//xx</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Matérias</h3>
                  <h3>xx//xx</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Relatório</h3>
                  <h3>Em breve</h3>
                </CardInfo>
              </CardBody>
              <CardFooter>
                <Clock
                  initialTime={product.initial_time}
                  endTime={product.end_time}
                />
              </CardFooter>
            </ProductCard>
          ))}
      </DayPartContainer>

      <DayPartTitle>
        {' '}
        <span>Noite</span>
      </DayPartTitle>

      <DayPartContainer>
        {eveningProducts &&
          eveningProducts.map((product) => (
            <ProductCard key={product.id}>
              <CardHeader>
                <img src={product.avatar_link} alt="avatar" />
                <CardProfile>
                  <h1>{product.alias}</h1>
                  <h3>{product.initial_time}</h3>
                  <h3>{product.control}</h3>
                </CardProfile>
              </CardHeader>
              <CardBody>
                <CardInfo>
                  <h3>{product.studio}</h3>
                  <h3>{product.site}</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Checklist</h3>
                  <h3>xx//xx</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Matérias</h3>
                  <h3>xx//xx</h3>
                </CardInfo>
                <CardInfo>
                  <h3>Relatório</h3>
                  <h3>Em breve</h3>
                </CardInfo>
              </CardBody>
              <CardFooter>
                <Clock
                  initialTime={product.initial_time}
                  endTime={product.end_time}
                />
              </CardFooter>
            </ProductCard>
          ))}
      </DayPartContainer>
    </Container>
  );
};

export default Dashboard;

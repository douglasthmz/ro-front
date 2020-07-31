import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
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
  ReportData,
} from './styles';
import Clock from '../../components/Clock';
import { useProducts } from '../../hooks/products';

const Dashboard: React.FC = () => {
  const history = useHistory();
  const {
    afterProducts,
    eveningProducts,
    morningProducts,
    setupProducts,
  } = useProducts();

  const Today =
    parseInt(format(Date.now(), 'i'), 10) === 7
      ? 0
      : parseInt(format(Date.now(), 'i'), 10);

  useEffect(() => {
    setupProducts();
  }, [setupProducts]);

  return (
    <Container>
      <DayPartTitle>
        <span>Manhã</span>
      </DayPartTitle>
      <DayPartContainer>
        {morningProducts &&
          morningProducts
            .sort((a, b) =>
              a.initial_time < b.initial_time
                ? -1
                : a.initial_time > b.initial_time
                ? 1
                : 0,
            )
            .map((product) => {
              const isReportDone = product.exibitions.filter(
                (exibition) =>
                  !exibition.report_sent &&
                  format(new Date(exibition.exibition_date), 'Y-MM-dd') ===
                    format(new Date(Date.now()), 'Y-MM-dd'),
              );

              return (
                <ProductCard
                  key={product.id}
                  onClick={() => history.push(`/report/${product.id}`)}
                  haveExibition={product.exibition_days.includes(Today)}
                >
                  <CardHeader
                    haveExibition={product.exibition_days.includes(Today)}
                  >
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
                      <ReportData reportInfo={!(isReportDone.length > 0)}>
                        {isReportDone && isReportDone.length > 0
                          ? `${isReportDone.length} de 15 não feito`
                          : 'sem pendências'}
                      </ReportData>
                    </CardInfo>
                  </CardBody>
                  <CardFooter
                    haveExibition={product.exibition_days.includes(Today)}
                  >
                    <Clock
                      initialTime={product.initial_time}
                      endTime={product.end_time}
                    />
                  </CardFooter>
                </ProductCard>
              );
            })}
      </DayPartContainer>

      <DayPartTitle>
        {' '}
        <span>Tarde</span>
      </DayPartTitle>

      <DayPartContainer>
        {afterProducts &&
          afterProducts
            .sort((a, b) =>
              a.initial_time < b.initial_time
                ? -1
                : a.initial_time > b.initial_time
                ? 1
                : 0,
            )
            .map((product) => {
              const isReportDone = product.exibitions.filter(
                (exibition) =>
                  !exibition.report_sent &&
                  format(new Date(exibition.exibition_date), 'Y-MM-dd') ===
                    format(new Date(Date.now()), 'Y-MM-dd'),
              );

              return (
                <ProductCard
                  key={product.id}
                  onClick={() => history.push(`/report/${product.id}`)}
                  haveExibition={product.exibition_days.includes(Today)}
                >
                  <CardHeader
                    haveExibition={product.exibition_days.includes(Today)}
                  >
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
                      <ReportData reportInfo={!(isReportDone.length > 0)}>
                        {isReportDone && isReportDone.length > 0
                          ? `${isReportDone.length} de 15 não feito`
                          : 'sem pendências'}
                      </ReportData>
                    </CardInfo>
                  </CardBody>
                  <CardFooter
                    haveExibition={product.exibition_days.includes(Today)}
                  >
                    <Clock
                      initialTime={product.initial_time}
                      endTime={product.end_time}
                    />
                  </CardFooter>
                </ProductCard>
              );
            })}
      </DayPartContainer>

      <DayPartTitle>
        {' '}
        <span>Noite</span>
      </DayPartTitle>

      <DayPartContainer>
        {eveningProducts &&
          eveningProducts
            .sort((a, b) =>
              a.initial_time < b.initial_time
                ? -1
                : a.initial_time > b.initial_time
                ? 1
                : 0,
            )
            .map((product) => {
              const isReportDone = product.exibitions.filter(
                (exibition) =>
                  !exibition.report_sent &&
                  format(new Date(exibition.exibition_date), 'Y-MM-dd') ===
                    format(new Date(Date.now()), 'Y-MM-dd'),
              );

              return (
                <ProductCard
                  key={product.id}
                  onClick={() => history.push(`/report/${product.id}`)}
                  haveExibition={product.exibition_days.includes(Today)}
                >
                  <CardHeader
                    haveExibition={product.exibition_days.includes(Today)}
                  >
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
                      <ReportData reportInfo={!(isReportDone.length > 0)}>
                        {isReportDone && isReportDone.length > 0
                          ? `${isReportDone.length} de 15 não feito`
                          : 'sem pendências'}
                      </ReportData>
                    </CardInfo>
                  </CardBody>
                  <CardFooter
                    haveExibition={product.exibition_days.includes(Today)}
                  >
                    <Clock
                      initialTime={product.initial_time}
                      endTime={product.end_time}
                    />
                  </CardFooter>
                </ProductCard>
              );
            })}
      </DayPartContainer>
    </Container>
  );
};

export default Dashboard;

import React, { useEffect } from 'react';
import { RouteComponentProps, useParams } from 'react-router-dom';
import { Container } from './styles';
import { useExibition } from '../../hooks/exibition';

interface IdParams {
  id: string;
}
const Report: React.FC = () => {
  const { id } = useParams<IdParams>();
  const {
    currentReport,
    last15Exibitions,
    setReport,
    setupProductExibition,
  } = useExibition();

  useEffect(() => {
    const getProducts = async () => {
      await setupProductExibition(id);
    };

    getProducts();
  }, [id, setupProductExibition]);
  return (
    <Container>
      <h1>
        Em construção, {console.log(last15Exibitions || 'não deu')}{' '}
        {console.log(currentReport || 'não deu')}
      </h1>
      {currentReport && (
        <img src={currentReport.exibition.product.avatar_link} alt="" />
      )}
    </Container>
  );
};

export default Report;

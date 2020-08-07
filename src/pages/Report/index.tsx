import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container } from './styles';
import { useExibition } from '../../hooks/exibition';
import ReportHeader from './ReportHeader';

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
      {last15Exibitions && currentReport && (
        <ReportHeader
          setReport={setReport}
          last15Exibitions={last15Exibitions}
          currentReport={currentReport}
        />
      )}
    </Container>
  );
};

export default Report;

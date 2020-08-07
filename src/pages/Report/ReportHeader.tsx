import React, { useRef, useCallback } from 'react';
import { FiCheckCircle, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import {
  HeaderContainer,
  HeaderLabel,
  HeaderAction,
  HeaderData,
  ProductShow,
  ReportStatus,
  FinishButton,
  SendMail,
  Calendar,
  DayWeek,
  ReportClock,
} from './styles';
import Select from '../../components/select';
import { ExibitionData, ReportData } from '../../hooks/exibition';

interface CustomProps {
  setReport(exibition_id: string): Promise<void>;
  last15Exibitions: ExibitionData[];
  currentReport: ReportData;
}

const ReportHeader: React.FC<CustomProps> = ({
  setReport,
  last15Exibitions,
  currentReport,
}) => {
  const formRef = useRef<FormHandles>(null);
  const productInfo = currentReport && currentReport.exibition.product;
  const options =
    last15Exibitions &&
    last15Exibitions.map((exibition: ExibitionData) => ({
      value: exibition.id,
      label: format(new Date(exibition.exibition_date), 'dd-MM-yyyy'),
    }));
  const getExibitionDate = (date: Date) => {
    return format(new Date(date), 'cccc', {
      locale: ptBR,
    });
  };

  const handleSubmit = useCallback(
    async (event): Promise<void> => {
      try {
        setReport(event.value);
        console.log('Entrei no submit', event);
      } catch (err) {
        alert('Something wrong');
      }
    },
    [setReport],
  );

  return (
    <HeaderContainer>
      <HeaderLabel>
        <ProductShow>
          <img src={productInfo.avatar_link} alt="avatar" />
          <div>
            <h1>{productInfo.name}</h1>
            <h3>{productInfo.studio}</h3>
            <h3>{productInfo.control}</h3>
          </div>
        </ProductShow>
        <ReportStatus isDone={currentReport.exibition.report_sent}>
          <p>Status do relatório:</p>
          <h1>
            {currentReport && currentReport.exibition.report_sent
              ? `Finalizado`
              : `Não Finalizado`}
          </h1>
        </ReportStatus>
      </HeaderLabel>
      <HeaderAction>
        <FinishButton>
          <p>Finalizar Relatório</p>
          <FiCheckCircle size={28} />
        </FinishButton>
        <SendMail>
          <p>Enviar email</p>
          <FiMail size={28} />
        </SendMail>
      </HeaderAction>
      <HeaderData>
        <Calendar>
          <Form ref={formRef} onSubmit={handleSubmit}>
            <p>Data do relatório:</p>
            <Select
              name="exibitions"
              options={options}
              defaultValue={options[0]}
              onChange={handleSubmit}
            />
          </Form>
          <DayWeek>
            {getExibitionDate(currentReport.exibition.exibition_date)}
          </DayWeek>
        </Calendar>
        <ReportClock
          initialTime={productInfo.initial_time}
          endTime={productInfo.end_time}
        />
      </HeaderData>
    </HeaderContainer>
  );
};

export default ReportHeader;

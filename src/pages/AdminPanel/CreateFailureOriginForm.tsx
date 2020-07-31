import React, { useRef, useCallback, useState, useEffect } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiAlertTriangle, FiXCircle } from 'react-icons/fi';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@material-ui/core';
import { FormContainer, Title } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/Button';

interface SignUpFormData {
  type: 'técnica' | 'operacional';
  origin: string;
}

type PersistedFailureOriginData = Array<{
  id: string;
  type: string;
  origin: string;
}>;

const CreateFailureOriginForm: React.FC = () => {
  const [failures, setFailures] = useState([] as PersistedFailureOriginData);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const getRoles = async () => {
      const persistedFailures = await api.get('/failures');
      setFailures(persistedFailures.data);
    };

    getRoles();
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await api.delete(`/failures/${id}`);
        const previousFailures = failures.filter((role) => role.id !== id);

        setFailures(previousFailures);

        addToast({
          title: 'Remoção realizada com sucesso!',
          type: 'info',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar esta função',
        });
      }
    },
    [addToast, failures],
  );

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          type: Yup.string().required('Tipo de falha obrigatório'),
          origin: Yup.string().required('Agente causador obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/failures', data);

        setFailures([...failures, response.data]);

        formRef.current?.reset();

        addToast({
          title: 'Cadastro do tipo de falha realizado!',
          type: 'info',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro no cadastro do tipo de falha',
        });
      }
    },
    [addToast, failures],
  );

  const options = [
    {
      value: 'Técnica',
      label: 'Técnica',
    },
    {
      value: 'Operacional',
      label: 'Operacional',
    },
  ];

  return (
    <FormContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Title>Cadastre um novo tipo de falha</Title>
        <Select name="type" options={options} placeholder="Tipo da falha" />
        <Input
          name="origin"
          icon={FiAlertTriangle}
          placeholder="Agente causador"
        />
        <Button type="submit">Cadastrar tipo de falha</Button>
      </Form>
      <Divider />
      <Divider />
      <Title>Lista de tipos de falha:</Title>
      <List aria-label="members show">
        {failures.map((failure) => (
          <>
            <Divider />
            <ListItem key={failure.id} button>
              <ListItemText primary={`${failure.type}/${failure.origin}`} />
              <ListItemIcon onClick={() => handleDelete(failure.id)}>
                <FiXCircle color="red" size={24} />
              </ListItemIcon>
            </ListItem>
          </>
        ))}
      </List>
    </FormContainer>
  );
};

export default CreateFailureOriginForm;

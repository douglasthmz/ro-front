import React, { useRef, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiXCircle } from 'react-icons/fi';
import { MdWork } from 'react-icons/md';
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
import Button from '../../components/Button';

interface SignUpFormData {
  role: string;
}

const CreateRoleForm: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          role: Yup.string().required('Nome obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await api.post('/members', data);
        console.log('dados da função', data);
        // Lembrar de dar push neste novo membro na lista de membros
        addToast({
          title: 'Cadastro do membro realizado!',
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
          title: 'Erro no cadastro da função',
        });
      }
    },
    [addToast],
  );

  const mockedMembers = [
    { id: 1, full_name: 'Técnico de sistemas' },
    { id: 2, full_name: 'Diretor de tv' },
    { id: 3, full_name: 'Assitente AV 1' },
    { id: 4, full_name: 'Assistente AV 2' },
    { id: 5, full_name: 'Operador de câmera' },
    { id: 6, full_name: 'Coordenador de TJ' },
    { id: 7, full_name: 'Douglas Thomaz' },
    { id: 8, full_name: 'Fulano da Silva' },
    { id: 9, full_name: 'Lorem Ipśum' },
    { id: 10, full_name: 'Douglas Thomaz' },
    { id: 11, full_name: 'Fulano da Silva' },
    { id: 12, full_name: 'Lorem Ipśum' },
  ];

  return (
    <FormContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Title>Cadastre uma nova função</Title>
        <Input name="name" icon={MdWork} placeholder="Nome da Função" />
        <Button type="submit">Cadastrar função</Button>
      </Form>
      <Divider />
      <Title>Lista de funções:</Title>
      <List aria-label="roles show">
        {mockedMembers.map((member) => (
          <div key={member.id}>
            <Divider />
            <ListItem button>
              <ListItemText primary={member.full_name} />
              <ListItemIcon>
                <FiXCircle color="red" size={24} />
              </ListItemIcon>
            </ListItem>
          </div>
        ))}
      </List>
    </FormContainer>
  );
};

export default CreateRoleForm;

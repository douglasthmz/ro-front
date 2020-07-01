import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import { FiUser, FiMail, FiXCircle } from 'react-icons/fi';
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
  name: string;
  email: string;
}

interface Role {
  id: string;
  role: string;
}

const CreateMemberForm: React.FC = () => {
  const [roles, setRoles] = useState([]);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const getRoles = async () => {
      const response = await api.get('/roles');
      setRoles(response.data);
    };

    getRoles();
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('Email obrigatório')
            .email('Digite um email válido'),
          role_id: Yup.string().required('Função obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        // await api.post('/members', data);
        console.log('dados do membro', data);
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
          title: 'Erro no cadastro do membro',
          description:
            'Ocorreu um erro ao realizar o cadastro. Garanta que está usando um email corporativo. Verifique os dados.',
        });
      }
    },
    [addToast],
  );

  const options =
    roles &&
    roles.map((singleRole: Role) => ({
      value: singleRole.id,
      label: singleRole.role,
    }));

  const mockedMembers = [
    { id: 1, full_name: 'Douglas Thomaz' },
    { id: 2, full_name: 'Fulano da Silva' },
    { id: 3, full_name: 'Lorem Ipśum' },
    { id: 4, full_name: 'Douglas Thomaz' },
    { id: 5, full_name: 'Fulano da Silva' },
    { id: 6, full_name: 'Lorem Ipśum' },
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
        <Title>Cadastre um novo membro</Title>
        <Input name="name" icon={FiUser} placeholder="Nome Completo" />
        <Input name="email" icon={FiMail} placeholder="E-mail Corp" />
        <Select name="role_id" options={options} placeholder="Função" />
        <Button type="submit">Cadastrar membro</Button>
      </Form>
      <Divider />
      <Title>Lista de membros:</Title>
      <List aria-label="members show">
        {mockedMembers.map((member) => (
          <>
            <Divider />
            <ListItem key={member.id} button>
              <ListItemText primary={member.full_name} />
              <ListItemIcon>
                <FiXCircle color="red" size={24} />
              </ListItemIcon>
            </ListItem>
          </>
        ))}
      </List>
    </FormContainer>
  );
};

export default CreateMemberForm;

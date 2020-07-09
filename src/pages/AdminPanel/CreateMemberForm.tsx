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
  full_name: string;
  role_id: string;
}

interface Role {
  id: string;
  role: string;
}

type PersistedMemberData = Array<{
  id: string;
  full_name: string;
  role_id: string;
  role: Role;
}>;

const CreateMemberForm: React.FC = () => {
  const [roles, setRoles] = useState([]);
  const [members, setMembers] = useState([] as PersistedMemberData);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const getServerData = async () => {
      const roleResponse = await api.get('/roles');
      setRoles(roleResponse.data);
      const memberResponse = await api.get('/members');
      setMembers(memberResponse.data);
    };

    getServerData();
  }, []);

  const handleSubmit = useCallback(
    async (data: SignUpFormData): Promise<void> => {
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          full_name: Yup.string().required('Nome obrigatório'),
          role_id: Yup.string().required('Função obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('/members', data);
        console.log('dados do membro', data);

        setMembers([...members, response.data]);

        formRef.current?.reset();

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
    [addToast, members],
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        await api.delete(`/members/${id}`);
        const previousMembers = members.filter((member) => member.id !== id);

        setMembers(previousMembers);

        addToast({
          title: 'Remoção realizada com sucesso!',
          type: 'info',
        });
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar este membro',
        });
      }
    },
    [addToast, members],
  );

  const options =
    roles &&
    roles.map((singleRole: Role) => ({
      value: singleRole.id,
      label: singleRole.role,
    }));

  return (
    <FormContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Title>Cadastre um novo membro</Title>
        <Input name="full_name" icon={FiUser} placeholder="Nome Completo" />
        <Select name="role_id" options={options} placeholder="Função" />
        <Button type="submit">Cadastrar membro</Button>
      </Form>
      <Divider />
      <Divider />
      <Title>Lista de membros:</Title>
      <List aria-label="members show">
        {members.map((member) => (
          <>
            <Divider />
            <ListItem key={member.id} button>
              <ListItemText
                primary={`${member.full_name} / ${
                  member.role && member.role.role
                }`}
              />
              <ListItemIcon onClick={() => handleDelete(member.id)}>
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

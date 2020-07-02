import React, { useRef, useCallback, useState, useEffect } from 'react';
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

type PersistedRoleData = Array<{
  id: string;
  role: string;
}>;

const CreateRoleForm: React.FC = () => {
  const [roles, setRoles] = useState([] as PersistedRoleData);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const getRoles = async () => {
      const persistedRoles = await api.get('/roles');
      setRoles(persistedRoles.data);
    };

    getRoles();
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      try {
        await api.delete(`/roles/${id}`);
        const previousRoles = roles.filter((role) => role.id !== id);

        setRoles(previousRoles);
      } catch (err) {
        addToast({
          type: 'error',
          title: 'Erro ao deletar esta função',
        });
      }
    },
    [addToast, roles],
  );

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

        const response = await api.post('/roles', data);

        setRoles([...roles, response.data]);

        addToast({
          title: 'Cadastro da função realizado!',
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
    [addToast, roles],
  );

  return (
    <FormContainer>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Title>Cadastre uma nova função</Title>
        <Input name="role" icon={MdWork} placeholder="Nome da Função" />
        <Button type="submit">Cadastrar função</Button>
      </Form>
      <Divider />
      <Title>Lista de funções:</Title>
      <List aria-label="roles show">
        {roles &&
          roles.map((role) => (
            <div key={role.id}>
              <Divider />
              <ListItem button>
                <ListItemText primary={role.role} />
                <ListItemIcon onClick={() => handleDelete(role.id)}>
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

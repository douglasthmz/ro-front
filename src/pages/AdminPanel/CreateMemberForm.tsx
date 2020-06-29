import React, { useState, useRef, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { FiUser, FiMail } from 'react-icons/fi';
import { FormContainer } from './styles';
import { useToast } from '../../hooks/toast';
import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import Input from '../../components/input';
import Select from '../../components/select';
import Button from '../../components/Button';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface Role {
  id: string;
  role: string;
}

const CreateMemberForm: React.FC = () => {
  const [roles, setRoles] = useState([]);
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

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
          password: Yup.string().min(6, 'No mínimo 6 dígitos'),
          role_id: Yup.string().required('Função obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/admins', data);
        history.push('/');

        addToast({
          title: 'Cadastro realizado!',
          type: 'success',
          description: 'Você já pode fazer seu logon no Relatório operacional.',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao realizar seu login. Garanta que está usando um email corporativo. Cheque suas credenciais.',
        });
      }
    },
    [addToast, history],
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
        <Input name="name" icon={FiUser} placeholder="Nome" />
        <Input name="email" icon={FiMail} placeholder="E-mail" />
        <Select name="role_id" options={options} placeholder="Função" />
        <Button type="submit">Cadastrar membro</Button>
      </Form>
    </FormContainer>
  );
};

export default CreateMemberForm;

import React, { useRef, useCallback, useEffect, useState } from 'react';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { FiMail, FiLock, FiUser, FiArrowLeft } from 'react-icons/fi';

import { useToast } from '../../hooks/toast';
import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Card, Footer } from './styles';
import GloboSign from '../../assets/rede-globo-logo-4.png';

import Input from '../../components/input';
import Button from '../../components/Button';
import api from '../../services/api';
import Select from '../../components/select';

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

interface Role {
  id: string;
  role: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();
  const [roles, setRoles] = useState([]);

  useEffect(() => {
    const getRoles = async () => {
      const response = await api.get('/roles');
      console.log(response.data);
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
    <Container>
      <img src={GloboSign} alt="Rede Globo" />
      <Card>
        <p>Faça seu cadastro</p>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Select name="role_id" options={options} placeholder="Função" />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <Footer>
          <Link to="/">
            <FiArrowLeft />
            Voltar para logon
          </Link>
        </Footer>
      </Card>
    </Container>
  );
};

export default SignUp;

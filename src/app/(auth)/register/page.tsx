import RegisterForm from '@/components/form/register-form';
import AuthLayout from '@/layout/authLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register ',
};

const Login = () => {
  return (
    <AuthLayout title='Register'>
      <RegisterForm />
    </AuthLayout>
  );
};

export default Login;

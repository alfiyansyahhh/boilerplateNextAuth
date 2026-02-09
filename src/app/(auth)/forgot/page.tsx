import ForgotForm from '@/components/form/forgot-form';
import AuthLayout from '@/layout/authLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password ',
};

const ForgotPassword = async () => {
  {
    return (
      <AuthLayout title='Forgot Password'>
        <ForgotForm />
      </AuthLayout>
    );
  }
};

export default ForgotPassword;

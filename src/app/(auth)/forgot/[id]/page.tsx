import ResetPasswordForm from '@/components/form/reset-password-form';
import AuthLayout from '@/layout/authLayout';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Forgot Password ',
};

const ForgotPassword = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  {
    return (
      <AuthLayout title='Reset Password'>
        <ResetPasswordForm />
      </AuthLayout>
    );
  }
};

export default ForgotPassword;

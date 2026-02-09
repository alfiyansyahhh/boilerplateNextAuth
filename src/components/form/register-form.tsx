'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { FormInput } from '../ui/form-input';
import { Form } from '../ui/form';
import { useTranslation } from 'react-i18next';
import { registerSchema } from '@/schemas'; // pastikan ini beda dengan login
import { Button } from '../ui/button';
import { signIn, useSession } from 'next-auth/react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const RegisterForm = () => {
  const [isPending, setisPending] = useState(false);
  const { t } = useTranslation();
  let router = useRouter();

  const { data: session } = useSession();

  // ----------- HANDLE GOOGLE REGISTER -----------
  useEffect(() => {
    const handleGoogleRegister = async () => {
      if (!session?.user || session?.user?.provider !== 'google') return;

      try {
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}api/register`,
          {
            name: session.user.name,
            email: session.user.email,
            image: session.user.image,
            provider: 'google',
          }
        );

        if (res.data.success) {
          toast.success(t('Register Google berhasil!'));
          router.push('/login');
        } else {
          toast.error(t('Google register gagal'));
        }
      } catch (err) {
        toast.error(t('Terjadi kesalahan pada Google Register'));
      }
    };

    handleGoogleRegister();
  }, [session]);

  // ----------- REGISTER MANUAL USING FORM -----------
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    setisPending(true);

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}api/register`,
        values
      );

      if (res.status === 200 && res.data.success) {
        toast.success(t('Register berhasil, silakan login.'));
        router.push('/login');
      } else {
        toast.error(res.data.message || t('Registrasi gagal'));
      }
    } catch (e) {
      toast.error(t('Terjadi kesalahan saat registrasi'));
    }

    setisPending(false);
  });

  return (
    <div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit}
          className='space-y-6'
        >
          <div className='space-y-5'>
            <FormInput
              control={form.control}
              name='name'
              label={t('Name')}
              type='text'
              placeholder={t('Nama lengkap')}
              isPending={isPending}
            />

            <FormInput
              control={form.control}
              name='email'
              label={t('E-mail')}
              type='email'
              placeholder={t('Masukkan E-mail')}
              isPending={isPending}
            />

            <FormInput
              control={form.control}
              name='password'
              label={t('Password')}
              type='password'
              placeholder={t('Masukkan Kata Sandi')}
              isPending={isPending}
            />

            {/* REGISTER BUTTON */}
            {/* REGISTER BUTTON */}
            <Button
              type='submit'
              disabled={!form.formState.isValid}
              loading={isPending}
              className='w-full rounded-full h-11 font-medium text-base'
            >
              {t('Daftar')}
            </Button>

            <div className='relative flex items-center py-2'>
              <div className='flex-grow border-t border-border'></div>
              <span className='flex-shrink-0 mx-4 text-muted-foreground text-sm'>{t('or')}</span>
              <div className='flex-grow border-t border-border'></div>
            </div>

            {/* GOOGLE REGISTER BUTTON */}
            <Button
              type='button'
              variant='outline'
              loading={isPending}
              className='w-full rounded-full h-11 font-medium bg-card hover:bg-muted text-foreground border-border'
              onClick={() => signIn('google')}
            >
              <Image
                src={'/img/googleIcon.png'}
                alt={'Google'}
                width={20}
                height={20}
                className="mr-2"
              />
              {t('Masuk Dengan Google')}
            </Button>

            <div className='text-center text-sm text-muted-foreground'>
              {t('Already have an account? Let’s')}
              <Link
                className='font-bold ml-1 text-primary hover:underline underline-offset-4 transition-colors'
                href={'/login'}
              >
                {t('Masuk')}
              </Link>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;

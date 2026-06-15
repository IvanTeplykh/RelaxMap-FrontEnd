'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { login } from '@/lib/authApi';
import { useAuthStore } from '@/store';
import type { LoginData } from '@/types';
import { Input } from '@/components/auth/Input/Input';
import { AppButton } from '@/components/ui';
import styles from './LoginForm.module.css';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Некоректна електронна пошта')
    .required('Вкажіть електронну пошту'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .required('Вкажіть пароль'),
});

const initialValues: LoginData = {
  email: '',
  password: '',
};

export function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik<LoginData>({
    initialValues,
    validationSchema: loginSchema,
    validateOnChange: false,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const user = await login(values);
        setUser(user);
        router.push('/profile');
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Не вдалося увійти. Спробуйте ще раз.'
        );
      }
    },
  });

  return (
    <form className={styles.Form} onSubmit={formik.handleSubmit} noValidate>
      <Input
        label="Пошта*"
        type="email"
        placeholder="hello@relaxmap.ua"
        error={formik.touched.email ? formik.errors.email : undefined}
        {...formik.getFieldProps('email')}
      />
      <Input
        label="Пароль*"
        type="password"
        placeholder="********"
        error={formik.touched.password ? formik.errors.password : undefined}
        {...formik.getFieldProps('password')}
      />
      <AppButton
        type="submit"
        disabled={formik.isSubmitting}
        className={styles.SubmitButton}
      >
        Увійти
      </AppButton>
    </form>
  );
}

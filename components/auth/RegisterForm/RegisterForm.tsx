'use client';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { register } from '@/lib/authApi';
import { useAuthStore } from '@/store';
import type { RegisterData } from '@/types';
import { Input } from '@/components/auth/Input/Input';
import { Button } from '@/components/auth/Button/Button';
import styles from './RegisterForm.module.css';

const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Ім'я має містити щонайменше 2 символи")
    .max(32, "Ім'я має містити не більше 32 символів")
    .required("Вкажіть ім'я"),
  email: Yup.string()
    .email('Некоректна електронна пошта')
    .required('Вкажіть електронну пошту'),
  password: Yup.string()
    .min(8, 'Пароль має містити щонайменше 8 символів')
    .required('Вкажіть пароль'),
});

const initialValues: RegisterData = {
  name: '',
  email: '',
  password: '',
};

export function RegisterForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const formik = useFormik<RegisterData>({
    initialValues,
    validationSchema: registerSchema,
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: async (values) => {
      try {
        const user = await register(values);
        setUser(user);
        router.push('/');
      } catch (error) {
        toast.error(
          error instanceof Error
            ? error.message
            : 'Не вдалося зареєструватися. Спробуйте ще раз.'
        );
      }
    },
  });

  return (
    <form className={styles.Form} onSubmit={formik.handleSubmit} noValidate>
      <Input
        label="Ім'я*"
        placeholder="Ваше ім'я"
        error={formik.errors.name}
        {...formik.getFieldProps('name')}
      />
      <Input
        label="Пошта*"
        type="email"
        placeholder="hello@relaxmap.ua"
        error={formik.errors.email}
        {...formik.getFieldProps('email')}
      />
      <Input
        label="Пароль*"
        type="password"
        placeholder="********"
        error={formik.errors.password}
        {...formik.getFieldProps('password')}
      />
      <Button type="submit" disabled={formik.isSubmitting}>
        Зареєструватись
      </Button>
    </form>
  );
}

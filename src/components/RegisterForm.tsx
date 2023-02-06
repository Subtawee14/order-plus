import { useFormik } from 'formik';
import Link from 'next/link';
import Input from './Input';
import * as Yup from 'yup';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';

interface ISignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string()
    .required('Required')
    .min(6, 'Password must be at least 6 characters'),
  confirmPassword: Yup.string()
    .required('Required')
    .equals([Yup.ref('password')], 'Confirm password must match password'),
});

export default function RegisterForm() {
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const { signup } = useAuth();
  const router = useRouter();

  const handleSubmit = async ({
    email,
    password,
  }: Omit<ISignUpValues, 'confirmPassword'>) => {
    setLoading(true);
    try {
      await signup(email, password);
      router.push('/login');
    } catch (error) {
      if (error instanceof Error) {
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          setErrorMessage('Email already in use');
        }
      }
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik<ISignUpValues>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    onSubmit: async (values) => await handleSubmit(values),
    validationSchema,
  });
  return (
    <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form className="space-y-6" onSubmit={formik.handleSubmit}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <div className="mt-1">
              <Input
                onChange={formik.handleChange}
                value={formik.values.email}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
              />
              {formik.errors?.email && formik.touched?.email && (
                <ErrorMessage message={formik?.errors?.email} />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="mt-1">
              <Input
                onChange={formik.handleChange}
                value={formik.values.password}
                id="password"
                name="password"
                type="password"
              />
              {formik?.errors?.password && formik?.touched?.password && (
                <ErrorMessage message={formik?.errors?.password} />
              )}
            </div>
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm password
            </label>
            <div className="mt-1">
              <Input
                onChange={formik.handleChange}
                value={formik.values.confirmPassword}
                id="confirmPassword"
                name="confirmPassword"
                type="password"
              />
              {formik?.errors?.confirmPassword &&
                formik?.touched?.confirmPassword && (
                  <ErrorMessage message={formik?.errors?.confirmPassword} />
                )}
            </div>
          </div>

          {isError && (
            <ErrorMessage
              message={
                errorMessage || 'Something went wrong. Please try again.'
              }
            />
          )}

          <div>
            <Button
              type="submit"
              disabled={!formik.isValid || formik.isSubmitting || loading}
              loading={loading}
            >
              Sign up
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/login">
                <p className="font-medium text-indigo-600 hover:text-indigo-500">
                  Already have an account? Sign in
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

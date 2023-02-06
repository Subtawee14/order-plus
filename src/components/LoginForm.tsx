import { useAuth } from '@/hooks/useAuth';
import { useFormik } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import * as Yup from 'yup';
import Button from './Button';
import ErrorMessage from './ErrorMessage';
import Input from './Input';

interface ILoginValues {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Required'),
  password: Yup.string().required('Required'),
});

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleLogin = async ({ email, password }: ILoginValues) => {
    setLoading(true);
    try {
      await login(email, password);
      router.replace('/');
    } catch (err) {
      console.log(err);
      setIsError(true);
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik<ILoginValues>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: async (values: ILoginValues) => await handleLogin(values),
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
                autoComplete="current-password"
              />
              {formik?.errors?.password && formik?.touched?.password && (
                <ErrorMessage message={formik?.errors?.password} />
              )}
            </div>
          </div>

          {isError && <ErrorMessage message="Invalid email or password" />}

          <div>
            <Button
              type="submit"
              loading={loading}
              disabled={!formik.isValid || formik.isSubmitting || loading}
            >
              Sign in
            </Button>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link href="/register">
                <p className="font-medium text-indigo-600 hover:text-indigo-500">
                  {`Don't have an account? Register`}
                </p>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

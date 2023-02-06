import RegisterForm from '@/components/RegisterForm';
import SignInRegisterContainer from '@/components/SignInRegisterContainer';
import Head from 'next/head';

export default function Register() {
  return (
    <SignInRegisterContainer type="register">
      <Head>
        <title>Order Plus - Create a new account</title>
      </Head>
      <RegisterForm />
    </SignInRegisterContainer>
  );
}

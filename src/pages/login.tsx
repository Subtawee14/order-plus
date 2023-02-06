import LoginForm from '@/components/LoginForm';
import SignInRegisterContainer from '@/components/SignInRegisterContainer';
import Head from 'next/head';

export default function SignIn() {
  return (
    <SignInRegisterContainer type="login">
      <Head>
        <title>Order Plus - Sign in to your account</title>
      </Head>
      <LoginForm />
    </SignInRegisterContainer>
  );
}

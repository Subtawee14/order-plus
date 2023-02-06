import { IMAGE_URLS } from '@/constants/imageUrls';
import Image from 'next/image';

interface Props {
  children: React.ReactNode;
  type: 'login' | 'register';
}

export default function SignInRegisterContainer({ children, type }: Props) {
  return (
    <>
      <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            className="mx-auto w-auto h-32"
            loader={() => IMAGE_URLS.LOGO}
            src={IMAGE_URLS.LOGO}
            alt="Order plus"
            width={150}
            height={150}
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {type === 'login' ? 'Sign in to your account' : 'Create an account'}
          </h2>
        </div>

        {children}
      </div>
    </>
  );
}

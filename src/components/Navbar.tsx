import Image from 'next/image';
import { IMAGE_URLS } from '@/constants/imageUrls';
import Link from 'next/link';
import Button from './Button';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { logout, user } = useAuth();
  return (
    <div className="relative bg-white">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between border-b-2 border-gray-100 py-2">
          <div className="flex justify-start lg:flex-1">
            <Link href="/">
              <Image
                className="h-12 w-auto"
                loader={() => IMAGE_URLS.LOGO}
                src={IMAGE_URLS.LOGO}
                alt="logo"
                width={100}
                height={100}
              />
            </Link>
          </div>

          <div className="mr-2">
            <p>{user?.email}</p>
          </div>

          <div>
            <Button onClick={logout}>Sign Out</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

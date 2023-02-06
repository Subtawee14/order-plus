import { cleanEnv, str } from 'envalid';

const env = cleanEnv(process.env, {
  NEXT_PUBLIC_FIREBASE_API_KEY: str(),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: str(),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: str(),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: str(),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: str(),
  NEXT_PUBLIC_FIREBASE_APP_ID: str(),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: str(),
});

export default env;

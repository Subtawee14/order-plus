/** @type {import('next').NextConfig} */

/**
 * Need to store the api key in server side env variables
 * But already restricted the api key to only be used from the domain order-pl.web.app/*
 */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    apiKey: 'AIzaSyCpfv5FbXTKcw0uDT6kEomXpqUfeomrVws',
    authDomain: 'order-pl.firebaseapp.com',
    projectId: 'order-pl',
    storageBucket: 'order-pl.appspot.com',
    messagingSenderId: '79328169951',
    appId: '1:79328169951:web:21825c56bd96704238be6a',
    measurementId: 'G-23K2BP4BYY',
  },
};

module.exports = nextConfig;

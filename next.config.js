/** @type {import('next').NextConfig} */

module.exports = {
  env: {
    apiKey: "AIzaSyCgeXImMnFbA5qdDGmylKVduxZZSg8imlU",
    authDomain: "auth-ix.firebaseapp.com",
    projectId: "auth-ix",
    storageBucket: "auth-ix.appspot.com",
    messagingSenderId: "984262885855",
    appId: "1:984262885855:web:2444844f011e227e05446a",
  },
  // reactStrictMode: true,
  images: {
    domains: ["i.ibb.co"],
  },

  // images: {
  //   loader: 'imgix',
  //   path: 'https://i.ibb.co/H4f3Hkv/profile.png',
  // },
  async rewrites() {
    return [
      {
        source: "/login",
        destination: "/auth/login",
      },
      {
        source: "/register",
        destination: "/auth/register",
      },
    ];
  },
};

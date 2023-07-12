module.exports = {
  i18n: {
    locales: ['it', 'en'],
    defaultLocale: 'it',
  },
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'assets.example.com',
      //   port: '',
      //   pathname: '/account123/**',
      // },
      // "https://nappitello-demo.s3.eu-south-1.amazonaws.com/Screenshot%202023-05-03%20at%2015.37.26.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA473SPABNN65PSSAO%2F20230712%2Feu-south-1%2Fs3%2Faws4_request&X-Amz-Date=20230712T081127Z&X-Amz-Expires=60&X-Amz-Signature=cf2f5a55716b1ea72449b57f97994a87cca8fc555943c67036b3d7aa5dd58b61&X-Amz-SignedHeaders=host&x-id=GetObject"
      {
        protocol: 'https',
        hostname: 'nappitello-demo.s3.eu-south-1.amazonaws.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

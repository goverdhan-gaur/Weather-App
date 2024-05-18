/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    METEOMATIC_USERNAME: process.env.METEOMATIC_USERNAME,
    METEOMATIC_PASSWORD: process.env.METEOMATIC_PASSWORD,
    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY
    
  },
  reactStrictMode: true,
}

module.exports = nextConfig

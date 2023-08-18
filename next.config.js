/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler:{
    styledComponents:true
  },
  images:{
    domains:['ivansh-ecommerce.s3.eu-north-1.amazonaws.com'],
  }
}

module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {   
    
    env: {
    //BASE_URL_PIRAMIDE : "https://contingencia.segurospiramide.com",
    //BASE_URL_OCEANICA : "https://contingencia.oceanicadeseguros.com"
    // BASE_URL_PIRAMIDE : "https://asesores.segurospiramide.com",
    BASE_URL : "http://dev-segurospiramide.com/asg-api",
    BASE_URL_QR : "http://dev-segurospiramide.com/",

    //  BASE_URL : "http://dev-segurospiramide.com/asg-api",
    //  BASE_URL_QR : "http://dev-segurospiramide.com",

    //BASE_URL : "https://segurospiramide.com/asg-api",
    //BASE_URL_QR : "https://segurospiramide.com",
    COMPANY : 'OCEANICA'
  },
  images: {
    domains: ['oceanicadeseguros.com']
}
};

export default nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  async rewrites() {
      return [
        {
          source: "/api/alunos", // Endpoint local
          destination: "https://rmi6vdpsq8.execute-api.us-east-2.amazonaws.com/msAluno", // API remota
        },
        {
          source: "/api/disciplinas", // Endpoint local
          destination: "https://sswfuybfs8.execute-api.us-east-2.amazonaws.com/disciplinaServico/msDisciplina", // API remota
        },
        {
          source: "/api/livros", // Endpoint local
          destination: "https://qiiw8bgxka.execute-api.us-east-2.amazonaws.com/acervo/biblioteca", // API remota
        },
      ];
    },
};

export default nextConfig;

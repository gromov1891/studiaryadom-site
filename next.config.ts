import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Корень проекта задаём явно — в системе есть посторонний package-lock.json
  // в домашней папке, из-за которого Next ошибочно определял workspace root.
  outputFileTracingRoot: path.join(__dirname),
  output: "export",
};

export default nextConfig;

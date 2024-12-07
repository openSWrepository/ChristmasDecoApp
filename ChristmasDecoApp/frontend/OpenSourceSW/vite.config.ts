import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vite Configuration
export default defineConfig({
  plugins: [react()], // React 플러그인 사용
  resolve: {
    alias: {
      // 필요한 경우 별칭 추가
      "@": "/src",
    },
  },
  build: {
    rollupOptions: {
      // 모든 외부 패키지를 번들링
      external: [],
    },
    outDir: "dist", // 빌드 결과물이 저장될 디렉토리
    assetsDir: "assets", // 정적 파일 저장 디렉토리
  },
  base: "./", // 상대 경로 설정 (HTML 파일에서 모든 경로를 해결)
  server: {
    port: 3000, // 개발 서버 포트
    open: true, // 브라우저 자동 실행
  },
});

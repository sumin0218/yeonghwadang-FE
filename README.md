# Yeonghwadang FE

React 기반 모바일 웹 프론트엔드 프로젝트입니다.

## 기술 스택

- React
- TypeScript
- Vite
- React Router
- ESLint

## 사전 준비

아래 버전 이상을 권장합니다.

```bash
node --version
npm --version
```

현재 프로젝트 세팅 기준:

- Node.js 22.x
- npm 10.x

## 프로젝트 설치

처음 프로젝트를 받은 뒤 의존성을 설치합니다.

```bash
npm install
```

## 개발 서버 실행

로컬 개발 서버를 실행합니다.

```bash
npm run dev
```

실행 후 터미널에 표시되는 주소로 접속합니다.

기본 주소:

```txt
http://localhost:5173
```

같은 네트워크의 모바일 기기에서 확인하려면 개발 PC와 모바일 기기가 같은 Wi-Fi에 있어야 합니다.  
터미널에 표시되는 `Network` 주소로 접속하면 됩니다.

예시:

```txt
http://192.168.0.10:5173
```

## 빌드

배포용 정적 파일을 생성합니다.

```bash
npm run build
```

빌드 결과물은 `dist` 폴더에 생성됩니다.

## 빌드 결과 미리보기

빌드된 결과물을 로컬에서 확인합니다.

```bash
npm run preview
```

## 코드 검사

ESLint로 코드 스타일과 기본 오류를 검사합니다.

```bash
npm run lint
```

## 주요 폴더 구조

```txt
yeonghwadang-FE/
+-- src/
|   +-- components/    # 공통 컴포넌트
|   +-- pages/         # 페이지 단위 컴포넌트
|   +-- styles/        # 전역 스타일
|   +-- App.tsx        # 라우팅 진입점
|   +-- main.tsx       # React 앱 진입점
+-- index.html
+-- package.json
+-- tsconfig.json
+-- vite.config.ts
```

## import alias

`src` 폴더는 `@` alias로 접근할 수 있습니다.

```tsx
import { HomePage } from "@/pages/HomePage";
```

## 자주 사용하는 명령어

```bash
npm install
npm run dev
npm run lint
npm run build
npm run preview
```

## 개발 흐름

1. `npm install`로 의존성을 설치합니다.
2. `npm run dev`로 개발 서버를 실행합니다.
3. `src/pages`에 화면 단위 페이지를 추가합니다.
4. `src/components`에 재사용 가능한 UI 컴포넌트를 추가합니다.
5. 작업 후 `npm run lint`와 `npm run build`로 확인합니다.

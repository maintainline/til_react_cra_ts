# Tailwind CSS

## 1.설치

- 안정화 버전 설치

```bash
npm i -D tailwindcss@3.4.10 postcss@8.4.38 autoprefixer@10.4.20

```

- 만약 이미 prettier 를 셋팅했다면 아래로 추가 설치 필요

```bash
npm i -D prettier@3.3.3 prettier-plugin-tailwindcss@0.6.8
```

## 2. 기본 환경 파일 자동 생성

```bash
npx tailwindcss init -p
```

### 2.1. tailwind.config.js

- Tailwind CSS 의 여러가지 옵션들을 정의함.
- Tailwind CSS 에 전역 변수 및 기능 설정.
- 색상, 폰트, 다크모드 등을 설정함.

```js
//tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
```

### 2.2. postcsss.config.js

- 웹 브라우저 호환성 관련한 셋팅

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

## 3. index.css 수정

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* 프로젝트 공통 유틸(선택) */
:root {
  --app-max-w: 720px;
}

html,
body,
#root {
  height: 100%;
}

.container-app {
  @apply mx-auto max-w-[var(--app-max-w)] px-4;
}
```

## 4. 테마 여러개 적용해 보기

- index.css

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

:root {
  --app-max-w: 720px;
}

html,
body,
#root {
  height: 100%;
}

.container-app {
  @apply max-w-[var(--app-max-w)] mx-auto px-4;
}

/* ------------- 테마 변수 ------------- */
/* Light (기본) */
:root {
  --bg: 0 0% 98%;
  --fg: 222 47% 11%;
  --surface: 0 0% 100%;
  --border: 220 13% 91%;
  --primary: 245 83% 60%; /* 보라 */
  --primary-fg: 0 0% 100%;
}

/* Dark */
.theme-dark {
  --bg: 222 47% 7%;
  --fg: 210 40% 96%;
  --surface: 222 47% 11%;
  --border: 217 19% 27%;
  --primary: 245 83% 60%;
  --primary-fg: 0 0% 100%;
}

/* Ocean */
.theme-ocean {
  --bg: 200 60% 97%;
  --fg: 210 24% 20%;
  --surface: 200 50% 99%;
  --border: 206 15% 85%;
  --primary: 200 90% 45%; /* 파랑 */
  --primary-fg: 0 0% 100%;
}

/* High Contrast */
.theme-hc {
  --bg: 0 0% 100%;
  --fg: 0 0% 0%;
  --surface: 0 0% 100%;
  --border: 0 0% 0%;
  --primary: 62 100% 50%; /* 노랑 */
  --primary-fg: 0 0% 0%;
}
```

- 속성 참조하기

```css
.theme-테마명 {
  --bg: 배경색;
  --fg: 글자색;
  --surface: 카드 영역 배경;
  --border: 테두리 색;
  --primary: 중요한 색;
  --primary-fg: 중요한 글자 색;
}
```

- tailwind.config.js

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#4f46e5',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
        // CSS 변수(HSL 값) 연결
        bg: 'hsl(var(--bg))',
        fg: 'hsl(var(--fg))',
        surface: 'hsl(var(--surface))',
        borderc: 'hsl(var(--border))',
        primary: 'hsl(var(--primary))',
        'primary-fg': 'hsl(var(--primary-fg))',
      },
      boxShadow: {
        card: '0 2px 10px rgba(0,0,0,0.08)',
      },
      borderRadius: {
        xl2: '1rem',
      },
    },
  },
  plugins: [],
};
```

- App.tsx

```tsx
import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';
import { TodoProvider } from './context/todo/TodoProvider';

// 여러 개의 테마 적용하기
function setTheme(themeName: string) {
  const root = document.documentElement;
  root.classList.remove('theme-dark', 'theme-ocean', 'theme-hc');
  // if (themeName === 'light') {
  // }
  if (themeName === 'dark') {
    root.classList.add('theme-dark');
  }
  if (themeName === 'ocean') {
    root.classList.add('theme-ocean');
  }
  if (themeName === 'hc') {
    root.classList.add('theme-hc');
  }
}

function App(): JSX.Element {
  //ts
  const toggleDark = () => {
    document.documentElement.classList.toggle('dark');
  };

  // tsx 자리
  return (
    <div className="min-h-screen bg-bg text-fg">
      <TodoProvider>
        <header className="border-b border-neutral-200 dark:border-neutral-800">
          <div className="container-app py-6 flex items-center">
            <h1 className="text-2xl font-bold tracking-tighter flex-1">할일 앱 서비스</h1>
            <button
              onClick={toggleDark}
              className="rounded-md bg-black px-3 py-1 text-sm text-white hover:opacity-90 dark:bg-white dark:text-black"
            >
              <span className="inline dark:hidden">다크 모드</span>
              <span className="hidden dark:inline">라이트 모드</span>
            </button>
          </div>
        </header>
        <div className="container-app py-8 flex gap-2">
          {/* 여러개 테마 토글버튼 */}
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('ligth')}
          >
            Ligth
          </button>
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('dark')}
          >
            Dark
          </button>
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('ocean')}
          >
            Ocean
          </button>
          <button
            className="rounded border border-borderc px-3 py-1"
            onClick={() => setTheme('hc')}
          >
            High Contrast
          </button>
        </div>
        <main className="container-app py-8">
          <div className="dark: space-y-6 rounded-xl2 bg-white p-6 shadow-card dark:bg-neutral-800">
            <TodoWrite />
            <TodoList />
          </div>
        </main>
        <footer className="container-app py-8 text-sm text-neutral-500 dark:text-neutral-400">
          할일 앱 서비스 개발 @ 홍길동
        </footer>
      </TodoProvider>
    </div>
  );
}

export default App;
```

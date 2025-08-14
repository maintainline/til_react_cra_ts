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

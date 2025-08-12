import { useState } from 'react';
import TodoList from './components/todos/TodoList';
import TodoWrite from './components/todos/TodoWrite';

// 공통으로 사용하는 type 정의 및 interface 는 별도의 폴더에 보관하자.
import { ITodoType, TodoType } from './types/todoType';
import TodoItem from './components/todos/TodoItem';
import { title } from 'process';

// 테스트를 위한 목업 데이터(/src/api/dummy.ts 추천)
const initialTodos: TodoType[] = [];

function App(): JSX.Element {
  //ts
  //{id:"", title:"",completed:false}
  const [todos, setTodos] = useState<(ITodoType | TodoType)[]>(initialTodos);

  // todos를 업데이트 하는 함수
  const handleTodoUpdate = (newTodo: TodoType): void => {
    // 아래는 prev : 현재 최신 state 를 나타냄
    // setTodos(prev=>[newTodo, ...prev])

    const arr: TodoType[] = [newTodo, ...todos];
    setTodos(arr);
  };

  //todo 목록에서 실행할 함수들
  const onToggle = (id: string): void => {
    console.log('onToggle:', id);
    // 전달받은 ID 를 이용해서 .map으로 id가 같으면 찾아서 completed 변경
    const arr: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo,
    );
    setTodos(arr);
  };

  const onDelete = (id: string): void => {
    console.log('onDelete:', id);
    // 전달받은 ID 를 제외한 나머지만 모아서 목록 변경
    const arr: TodoType[] = todos.filter(todo => todo.id !== id);
    setTodos(arr);
  };

  const onEdit = (id: string, newTitle: string): void => {
    // 아이디와 새로운 타이틀을 알 수 있다.
    // 아이디를 이용해서 해당 타이틀을 수정하고 업데이트 해보자
    const arr: TodoType[] = todos.map(todo =>
      todo.id === id ? { ...todo, title: newTitle } : todo,
    );
    setTodos(arr);
  };
  //tsx
  return (
    <div>
      <h1>할일 앱서비스</h1>
      <div>
        <TodoWrite setTodos={setTodos} handleTodoUpdate={handleTodoUpdate} />
        <TodoList todos={todos} onToggle={onToggle} onDelete={onDelete} onEdit={onEdit} />
      </div>
    </div>
  );
}

export default App;

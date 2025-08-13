import { useState } from 'react';
import { TodoType } from '../../types/todoType';
import { useTodoActions } from '../../context/todo/hooks';

const TodoWrite = () => {
  //ts
  const { addTodo } = useTodoActions();
  //1. 할일 제목 값 관리
  const [title, setTilte] = useState<string>('');
  // title 변경시 onchange 이벤트 처리해보기
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTilte(e.target.value);
  };
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //enter키를 입력시 처리
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  //2. 새 할일 등록하기
  const handleAdd = () => {
    if (title.trim()) {
      const newTodo: TodoType = {
        id: Date.now().toString(),
        title: title,
        completed: false,
      };
      addTodo(newTodo);
      setTilte('');
    }
  };
  //jsx
  return (
    <div>
      <input type="text" value={title} onChange={e => handleChange(e)} onKeyDown={handleKeyDown} />
      <button onClick={handleAdd}>등록</button>
    </div>
  );
};

export default TodoWrite;

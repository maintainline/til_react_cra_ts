import { useContext } from 'react';
import { TodoActionContext, TodoStateContext } from './TodoProvider';

export function useTodosState() {
  const state = useContext(TodoStateContext);
  if (!state) {
    throw new Error('state가 없습니다.');
  }
  return state;
}

// 액션 context전용
export function useTodoActions() {
  const actions = useContext(TodoActionContext);
  if (!actions) {
    throw new Error('액션이 없습니다.');
  }
  return actions;
}

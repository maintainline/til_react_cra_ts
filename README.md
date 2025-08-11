# useState

- 리액트용 변수이다.(수업편의상..)
- set 으로 값을 변화시키면 리랜더링을 한다.

## 0. `@` 으로 절대 경로 설정하기

- tsconfig.json

```json
"baseUrl": "src",// 프로젝트 기본경로
    "paths": {
      "@/*": ["*"], // @/ 로 src 폴더 전체를 참조
      "@types/*": ["types/*"] // @types 로 src/types 참조
    },
```

## 1. 기본 예제

-/src/components 폴더 생성
-/src/components/Counter.tsx 파일 생성

```tsx
import { useState } from 'react';

const Counter: () => JSX.Element = (): JSX.Element => {
  //ts
  const [count, setCount] = useState<number>(0);

  const handleAdd: () => void = (): void => {
    setCount(count + 1);
  };
  const handleMinus: () => void = (): void => {
    setCount(count - 1);
  };
  const handleReset: () => void = (): void => {
    setCount(0);
  };

  //tsx
  return (
    <div>
      <h2>Counte : {count}</h2>
      <button onClick={handleAdd}>증가</button>
      <button onClick={handleMinus}>감소</button>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
};

export default Counter;
```

- type / interface로 타입을 정의하고 유니온으로 적용해보기

```tsx
import { useState } from 'react';

// 2번 이상 반복되고, 가독성이 떨어지는 타입추론  : () => void
//1. 타입으로 정의해 보기
type VoidFunction = () => void;
type JSXElement = () => JSX.Element;

//2. interface로 정의해 보자.
interface IVoidFunction {
  (): void;
}
interface IJSXElement {
  (): JSX.Element;
}

const Counter: IJSXElement | JSXElement = () => {
  //ts
  const [count, setCount] = useState<number>(0);

  const handleAdd: IVoidFunction | VoidFunction = () => {
    setCount(count + 1);
  };
  const handleMinus: IVoidFunction | VoidFunction = () => {
    setCount(count - 1);
  };
  const handleReset: IVoidFunction | VoidFunction = () => {
    setCount(0);
  };

  //tsx
  return (
    <div>
      <h2>Counte : {count}</h2>
      <button onClick={handleAdd}>증가</button>
      <button onClick={handleMinus}>감소</button>
      <button onClick={handleReset}>초기화</button>
    </div>
  );
};

export default Counter;
```

## 2. 실습 예제-1

- /src/components/NameEditor.tsx 파일 생성

```tsx
import { ChangeEvent, MouseEvent, useState } from 'react';

//1. type 으로 함수 리턴형을 생성해 보자.
type JSXElement = () => JSX.Element;
type ChangeEventInput = (e: ChangeEvent<HTMLInputElement>) => void;
type ClickEventButton = (e: MouseEvent<HTMLButtonElement>) => void;

type MainType = string;

//2. interface로 만들어보기
interface IJSXElement {
  (): JSX.Element;
}
interface IChangeEventInput {
  (e: ChangeEvent<HTMLInputElement>): void;
}
interface IClickEventButton {
  (e: MouseEvent<HTMLButtonElement>): void;
}

const NameEditor: JSXElement | IJSXElement = () => {
  // ts 자리
  const [name, setName] = useState<MainType>('');

  const handleName: ChangeEventInput | IChangeEventInput = e => {
    setName(e.target.value);
  };
  const handleClick: ClickEventButton | IClickEventButton = e => {
    console.log('클릭');
    setName('');
  };
  // tsx 자리
  return (
    <div>
      <h2>NameEditor : {name}</h2>
      <div>
        <input type="text" value={name} onChange={e => handleName(e)} />
        <button onClick={e => handleClick(e)}>확인</button>
      </div>
    </div>
  );
};

export default NameEditor;
```

## 3. 실습 예제-2

- /src/components/ToggleSwitch.tsx 파일 생성

```tsx
import { useState } from 'react';
// type 정의하기
type JSXElement = () => JSX.Element;
type ClickEvent = () => void;
type MainType = boolean;

// interface 정의하기
interface IJSXElement {
  (): JSX.Element;
}
interface IClickEvent {
  (): void;
}

const ToggleSwitch: JSXElement | IJSXElement = () => {
  //ts
  const [isOn, setIsOn] = useState<MainType>(false);
  const handleClick: ClickEvent | IClickEvent = () => {
    setIsOn(!isOn);
  };
  //tsx
  return (
    <div>
      <br />
      <h2>ToggleSwitch : {isOn ? '밝당' : '어둡당'}</h2>
      <div>
        <button onClick={handleClick}>토글</button>
      </div>
    </div>
  );
};

export default ToggleSwitch;
```

## 4. 실습 예제-3

- /src/components/User.tsx 파일 생성

```tsx
import { useState } from 'react';
//type 정의하기
type UserType = { age: number; name: string };
type ClickEvent = () => void;
//interface 정의하기
interface IUser {
  age: number;
  name: string;
}
interface IClickEvent {
  (): void;
}

const User = (): JSX.Element => {
  //ts
  const [user, setUser] = useState<UserType | IUser>({ name: '아이유', age: 20 });
  const handleClick: ClickEvent | IClickEvent = () => {
    setUser({ ...user, age: user.age + 1 });
  };
  //tsx
  return (
    <div>
      <br />
      <h2>
        User : {user.name}님 나이는 {user.age} 입니다.
      </h2>
      <div>
        <button onClick={handleClick}>나이 증가 </button>
      </div>
    </div>
  );
};

export default User;
```

## 5. 실습예제-4 (useState 버전 Todo)

- 타입정의를 위한 폴더 : /src/types 폴더 생성
  - todoType.ts 파일생성

- 글쓰기 : /src/components/todos/TodoWrite.tsx
  - 입력창, 등록버튼

- 글목록 : /src/components/todos/TodoList.tsx

- 글한개의 아이템 : /src/components/todos/TodoItem.tsx
  - 아이디, 제목, 완료여부, 수정버튼, 삭제버튼
  - 상태 2가지 : 목록상태, 편집상태

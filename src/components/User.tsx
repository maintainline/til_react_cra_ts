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

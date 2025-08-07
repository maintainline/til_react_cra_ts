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
      <br />
      <h2>NameEditor : {name}</h2>
      <div>
        <input type="text" value={name} onChange={e => handleName(e)} />
        <button onClick={e => handleClick(e)}>확인</button>
      </div>
    </div>
  );
};

export default NameEditor;

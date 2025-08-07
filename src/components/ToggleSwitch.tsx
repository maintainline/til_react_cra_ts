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

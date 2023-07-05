import CSS from 'csstype';
import { useRef } from 'react';

interface Props {
  style: CSS.Properties;
  jostle?: boolean;
}

const PopoutShape = (props: Props): JSX.Element => {
  const initial = useRef<boolean>(true);

  let flyIn = false;
  if (initial.current) {
    flyIn = true;
    initial.current = false;
  }

  let style: any = { ...props.style };

  for (let i = 1; i < 9; i++) {
    style[`--jostle-${i}`] = `${(Math.random() - 0.5) * (10 - i)}px`;
  }

  return <div className={`popout-shape ${flyIn ? 'fly-in' : ''} ${props.jostle ? 'jostle' : ''}`} style={style}></div>;
};

export default PopoutShape;

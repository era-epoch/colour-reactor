import CSS from 'csstype';
import { useState } from 'react';
import Color from 'colorjs.io';

interface Props {
  pxHeight: number;
  pxWidth: number;
}

const Square = (props: Props): JSX.Element => {
  const defaultColour = new Color('white');
  const hoverColour = new Color('rebeccapurple');
  // const hoverColour = new Color('blue');
  const outlineColour = new Color('rgb(235, 235, 235)');
  const hoverFadeTime = 2000; // in ms
  const [bgColour, setBgColour] = useState<Color>(defaultColour);
  const [transitionDuration, setTransitionDuration] = useState(0);

  const style: CSS.Properties = {
    // cursor: 'none',
    outline: `1px solid ${outlineColour}`,
    height: `${props.pxHeight}px`,
    width: `${props.pxWidth}px`,
    backgroundColor: bgColour.toString(),
    transition: `background-color ${transitionDuration}ms ease`,
  };

  const handleMouseOver = () => {
    setTransitionDuration(0);
    setBgColour(hoverColour);
  };

  const handleMouseOut = () => {
    setTransitionDuration(hoverFadeTime);
    setBgColour(defaultColour);
  };

  const handleMouseDown = () => {};

  const handleMouseUp = () => {};

  return (
    <div
      className="square"
      style={style}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></div>
  );
};

export default Square;

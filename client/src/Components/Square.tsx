import CSS from 'csstype';
import { useState } from 'react';
import Color from 'colorjs.io';
import { useDispatch, useSelector } from 'react-redux';
import { BoardState, spawnVPong } from '../State/Slices/boardSlice';
import { SquareState } from '../types';

interface Props {
  squareState: SquareState;
  pxHeight: number;
  pxWidth: number;
}

const Square = (props: Props): JSX.Element => {
  const defaultColour = new Color('white');
  // const hoverColourString = useSelector((state: BoardState) => state.cursorColour);
  // const hoverColour = new Color(hoverColourString);
  const hoverColour = new Color('blue');
  const outlineColour = new Color('rgb(235, 235, 235)');
  const hoverFadeTime = 2000; // in ms
  const [objLastTick, setObjLastTick] = useState(false);
  const [bgColour, setBgColour] = useState<Color>(defaultColour);
  const [transitionDuration, setTransitionDuration] = useState(0);
  const dispatch = useDispatch();

  const style: CSS.Properties = {
    // cursor: 'none',
    outline: `1px solid ${outlineColour}`,
    height: `${props.pxHeight}px`,
    width: `${props.pxWidth}px`,
    backgroundColor: bgColour.toString(),
    transition: `background-color ${transitionDuration}ms ease`,
  };

  for (const object of props.squareState.content) {
    setBgColour(new Color(object.primary));
    setObjLastTick(true);
  }

  if (props.squareState.content.length === 0 && objLastTick) {
    setTransitionDuration(hoverFadeTime);
    setBgColour(defaultColour);
    setObjLastTick(false);
  }

  const handleMouseOver = () => {
    setTransitionDuration(0);
    setBgColour(hoverColour);
  };

  const handleMouseOut = () => {
    setTransitionDuration(hoverFadeTime);
    setBgColour(defaultColour);
  };

  const handleOnClick = () => {
    dispatch(spawnVPong({ x: props.squareState.x, y: props.squareState.y }));
  };

  const handleMouseDown = () => {};

  const handleMouseUp = () => {};

  return (
    <div
      className="square"
      style={style}
      onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    ></div>
  );
};

export default Square;

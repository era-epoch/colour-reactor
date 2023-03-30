import CSS from 'csstype';
import { MouseEvent, useState } from 'react';
import Color from 'colorjs.io';
import { useDispatch, useSelector } from 'react-redux';
import { spawnVPong } from '../State/Slices/boardSlice';
import { createVPong, VPong } from '../State/BoardObjects/VPong';
import { RootState } from '../State/rootReducer';

interface Props {
  x: number;
  y: number;
}

const Square = (props: Props): JSX.Element => {
  const squareState = useSelector((state: RootState) => state.board.squares[props.y][props.x]);
  const pixelSize = useSelector((state: RootState) => state.board.pixelSquareSize);
  const defaultColour = new Color('white');
  const hoverColour = new Color('rebeccapurple');
  const outlineColour = new Color('rgb(235, 235, 235)');
  const hoverFadeTime = 1000; // in ms
  const [bgColour, setBgColour] = useState<Color>(defaultColour);
  const [transitionDuration, setTransitionDuration] = useState(hoverFadeTime);
  const dispatch = useDispatch();

  const style: CSS.Properties = {
    // cursor: 'none',
    outline: `1px solid ${outlineColour}`,
    height: `${pixelSize}px`,
    width: `${pixelSize}px`,
    backgroundColor: bgColour.toString(),
    transitionProperty: `background-color`,
    transitionDuration: `${transitionDuration}ms`,
    transitionTimingFunction: `ease`,
  };

  for (const object of squareState.content) {
    style.backgroundColor = object.primary;
    style.transitionDuration = `0ms`;
  }

  if (squareState.content.length === 0) {
    style.backgroundColor = bgColour.toString();
  }

  const handleMouseOver = () => {
    setTransitionDuration(0);
    setBgColour(hoverColour);
  };

  const handleMouseOut = () => {
    setTransitionDuration(hoverFadeTime);
    setBgColour(defaultColour);
  };

  const handleOnClick = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      const vpong: VPong = createVPong('red', squareState.x, squareState.y, 1);
      dispatch(spawnVPong({ vpong: vpong }));
    } else {
      const vpong: VPong = createVPong('green', squareState.x, squareState.y, 1);
      dispatch(spawnVPong({ vpong: vpong }));
    }
    console.log(`Mouse Click on ${squareState.y}:${squareState.x}`);
  };

  const handleMouseDown = (event: MouseEvent) => {};

  const handleMouseUp = () => {};

  return (
    <div
      className="square"
      style={style}
      // onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseDown={handleOnClick}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    ></div>
  );
};

export default Square;

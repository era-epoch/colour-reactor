import Color from 'colorjs.io';
import CSS from 'csstype';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VPong, createVPong } from '../State/BoardObjects/VPong';
import { spawnVPong } from '../State/Slices/boardSlice';
import { RootState } from '../State/rootReducer';

interface Props {
  x: number;
  y: number;
}

const Square = (props: Props): JSX.Element => {
  const squareState = useSelector((state: RootState) => state.board.squares[props.y][props.x]);
  const pixelSize = useSelector((state: RootState) => state.board.pixelSquareSize);
  const leftClickColor = useSelector((state: RootState) => state.app.leftClickColor);
  const rightClickColor = useSelector((state: RootState) => state.app.rightClickColor);
  const middleClickColor = useSelector((state: RootState) => state.app.middleClickColor);
  const defaultColorString = useSelector((state: RootState) => state.app.defaultColor);
  const defaultColor = new Color(defaultColorString);
  const hoverColorString = useSelector((state: RootState) => state.app.cursorColor);
  const hoverColor = new Color(hoverColorString);
  const outlineColour = new Color('rgb(235, 235, 235)');
  const fadeTime = useSelector((state: RootState) => state.app.defaultFadeTime);
  const [bgColour, setBgColour] = useState<Color>(defaultColor);
  const [transitionDuration, setTransitionDuration] = useState(fadeTime);
  const dispatch = useDispatch();

  const style: CSS.Properties = {
    // cursor: 'none',
    outline: `1px solid ${outlineColour}`,
    height: `${pixelSize}px`,
    minWidth: `${pixelSize}px`,
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
    setBgColour(hoverColor);
  };

  const handleMouseOut = () => {
    setTransitionDuration(fadeTime);
    setBgColour(defaultColor);
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      const vpong: VPong = createVPong(leftClickColor, squareState.x, squareState.y, 1);
      dispatch(spawnVPong({ vpong: vpong }));
    } else if (e.button === 2) {
      const vpong: VPong = createVPong(rightClickColor, squareState.x, squareState.y, 1);
      dispatch(spawnVPong({ vpong: vpong }));
    } else {
      const vpong: VPong = createVPong(middleClickColor, squareState.x, squareState.y, 1);
      dispatch(spawnVPong({ vpong: vpong }));
    }
  };

  const handleMouseUp = () => {};

  return (
    <div
      className="square"
      style={style}
      // onClick={handleOnClick}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    ></div>
  );
};

export default Square;

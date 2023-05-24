import Color from 'colorjs.io';
import CSS from 'csstype';
import { MouseEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HPongGhost } from '../State/BoardObjects/HPong';
import { VPong, createVPong } from '../State/BoardObjects/VPong';
import { spawnVPong } from '../State/Slices/boardSlice';
import { RootState } from '../State/rootReducer';

interface Props {
  x: number;
  y: number;
}

const Square = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const squareState = useSelector((state: RootState) => state.board.squares[props.y][props.x]);
  const pixelSize = useSelector((state: RootState) => state.board.pixelSquareSize);

  const leftClickColor = useSelector((state: RootState) => state.app.leftClickColor);
  const rightClickColor = useSelector((state: RootState) => state.app.rightClickColor);
  const middleClickColor = useSelector((state: RootState) => state.app.middleClickColor);

  const timeDelta = useSelector((state: RootState) => state.app.timeDelta);

  const defaultColorString = useSelector((state: RootState) => state.app.defaultColor);
  const defaultColor = new Color(defaultColorString);

  const hoverColorString = useSelector((state: RootState) => state.app.cursorColor);
  const hoverColor = new Color(hoverColorString);

  const outlineColour = new Color('rgb(235, 235, 235)');

  const [hovering, setHovering] = useState(false);

  const style: CSS.Properties = {
    // cursor: 'none',
    outline: `1px solid ${outlineColour}`,
    height: `${pixelSize}px`,
    minWidth: `${pixelSize}px`,
    backgroundColor: defaultColor.toString(),
    transitionProperty: `all`,
    transitionTimingFunction: `ease`,
    transitionDuration: `${timeDelta}ms`,
  };

  let combinedColor = defaultColor;

  for (const object of squareState.content) {
    const objectColor = new Color(object.primary);
    if (object.tag === 'HPongGhost' || object.tag === 'VPongGhost') {
      const ghost = object as HPongGhost;
      const p_factor = 1 - (ghost.age + 1) / (ghost.lifespan + 2);
      const p = 0.5 * p_factor;
      // console.log('Render % of ghost: ' + p);
      // const ghostColor = Color.mix(defaultColor, objectColor, p) as unknown as Color;
      // const ghostColor = objectColor.al
      combinedColor = Color.mix(combinedColor, objectColor, p) as unknown as Color;
    } else {
      combinedColor = Color.mix(combinedColor, objectColor) as unknown as Color;
    }
  }

  if (hovering) {
    combinedColor = Color.mix(combinedColor, hoverColor) as unknown as Color;
  }

  // switch (squareState.content.length) {
  //   default:
  //     break;
  //   case 2:
  //     combinedColor = new Color('red');
  //     break;
  // }

  style.backgroundColor = combinedColor.toString();

  const handleMouseOver = () => {
    setHovering(true);
  };

  const handleMouseOut = () => {
    setHovering(false);
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (e.button === 0) {
      const vpong: VPong = createVPong(leftClickColor, squareState.x, squareState.y, 1, 8);
      dispatch(spawnVPong({ vpong: vpong }));
    } else if (e.button === 2) {
      const vpong: VPong = createVPong(rightClickColor, squareState.x, squareState.y, 1, 8);
      dispatch(spawnVPong({ vpong: vpong }));
    } else {
      const vpong: VPong = createVPong(middleClickColor, squareState.x, squareState.y, 1, 8);
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

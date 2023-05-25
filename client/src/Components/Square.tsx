import Color from 'colorjs.io';
import CSS from 'csstype';
import { MouseEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { RenderMap } from '../State/BoardObjects/Maps';
import { VPong, createVPong } from '../State/BoardObjects/VPong';
import { spawnVPong } from '../State/Slices/boardSlice';
import { RootState } from '../State/rootReducer';
import { BoardObjectCSSClass, BoardObjectRenderOptions, BoardObjectRenderOutput } from '../types';

interface Props {
  x: number;
  y: number;
}

interface SquareRenderInfoEntry {
  objectCSSClasses: BoardObjectCSSClass[];
  backgroundColor: Color;
}

const GlobalSquareRenderingInfo = new Map<string, SquareRenderInfoEntry>();

const Square = (props: Props): JSX.Element => {
  const squareTag = `${props.x}-${props.y}`;
  // console.log(squareTag);
  const dispatch = useDispatch();

  const squareState = useSelector((state: RootState) => state.board.squares[props.y][props.x]);
  const pixelSize = useSelector((state: RootState) => state.board.pixelSquareSize);

  const leftClickColor = useSelector((state: RootState) => state.app.leftClickColor);
  const rightClickColor = useSelector((state: RootState) => state.app.rightClickColor);
  const middleClickColor = useSelector((state: RootState) => state.app.middleClickColor);

  const timeDelta = useSelector((state: RootState) => state.app.timeDelta);
  const ticksElapsed = useSelector((state: RootState) => state.board.ticksElapsed);
  const prevTickRef = useRef<number>(ticksElapsed);

  const defaultColorString = useSelector((state: RootState) => state.app.defaultColor);
  const defaultColor = new Color(defaultColorString);

  const hoverColorString = useSelector((state: RootState) => state.app.cursorColor);
  const hoverColor = new Color(hoverColorString);

  const outlineColour = new Color('rgb(235, 235, 235)');

  // This should only run on the very first render
  if (!GlobalSquareRenderingInfo.has(squareTag)) {
    GlobalSquareRenderingInfo.set(squareTag, {
      objectCSSClasses: [],
      backgroundColor: defaultColor,
    });
  }

  const [hovering, setHovering] = useState(false);
  const [rotateY, setRotateY] = useState(false);
  const [rotateX, setRotateX] = useState(false);
  const [animTrigger, setAnimTrigger] = useState('');

  const renderingInfo: SquareRenderInfoEntry = GlobalSquareRenderingInfo.get(squareTag) as SquareRenderInfoEntry;

  const style: CSS.Properties = {
    outline: `1px solid ${outlineColour}`,
    height: `${pixelSize}px`,
    minWidth: `${pixelSize}px`,
    backgroundColor: defaultColor.toString(),
    transitionProperty: `all`,
    transitionTimingFunction: `ease`,
    transitionDuration: `${timeDelta}ms`,
  };

  // if (squareTag === '0-0') console.log(renderingInfo);

  let combinedColor = defaultColor;

  // This should only run ONCE per tick
  // eslint-disable-next-line no-lone-blocks
  if (ticksElapsed > prevTickRef.current) {
    for (const object of squareState.content) {
      const renderFunction = RenderMap.get(object.tag);
      const renderOps: BoardObjectRenderOptions = { obj: object, backgroundColor: combinedColor };
      if (renderFunction) {
        const renderOut: BoardObjectRenderOutput = renderFunction(renderOps);

        // Replace the current color with the one from this render pass
        combinedColor = renderOut.backgroundColor;

        // Add the renderer classes to the global scope map
        for (const renderClass of renderOut.cssClasses) {
          renderingInfo.objectCSSClasses.push(renderClass);
          const timeout = setTimeout(() => {
            renderingInfo.objectCSSClasses = renderingInfo.objectCSSClasses.filter(
              (entry) => entry.uid !== renderClass.uid,
            );
            clearTimeout(timeout);
            setAnimTrigger(uuidv4());
          }, renderClass.duration);
        }
      }
    }
    renderingInfo.backgroundColor = combinedColor;
    prevTickRef.current = ticksElapsed;
  } else {
    combinedColor = renderingInfo.backgroundColor;
  }

  if (hovering) {
    combinedColor = Color.mix(combinedColor, hoverColor) as unknown as Color;
  }

  style.backgroundColor = combinedColor.toString();

  let renderClassString = ' ';
  for (const objectCSSClass of renderingInfo.objectCSSClasses) {
    renderClassString += objectCSSClass.className + ' ';
  }

  console.log(renderClassString);

  // #region
  // EVENT FUNCTIONS

  const handleMouseOver = () => {
    setHovering(true);
  };

  const handleMouseOut = () => {
    setHovering(false);
  };

  const handleMouseDown = (e: MouseEvent) => {
    e.preventDefault();
    if (e.ctrlKey) {
      rotateSquareY();
      return;
    }
    if (e.altKey) {
      rotateSquareX();
      return;
    }
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

  const rotateSquareY = () => {
    setRotateY(!rotateY);
  };

  const rotateSquareX = () => {
    setRotateX(!rotateX);
  };

  return (
    <div
      className={'square ' + renderClassString + (rotateY ? 'rotate3d-y ' : '') + (rotateX ? 'rotate3d-x ' : '')}
      style={style}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onContextMenu={(e) => e.preventDefault()}
    ></div>
  );
};

export default Square;

import Color from 'colorjs.io';
import CSS from 'csstype';
import { MouseEvent, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { createFirefly } from '../State/BoardObjects/FireFly';
import { RenderMap } from '../State/BoardObjects/Maps';
import { createMorphPaint } from '../State/BoardObjects/MorphPaint';
import { createMover } from '../State/BoardObjects/Mover';
import { createPaint } from '../State/BoardObjects/Paint';
import { fallbackColor } from '../State/Slices/appSlice';
import { loadObjects } from '../State/Slices/boardSlice';
import { RootState } from '../State/rootReducer';
import {
  BoardObjectCSSClass,
  BoardObjectRenderOptions,
  BoardObjectRenderOutput,
  CompassDirection,
  CursorMode,
  SpawnWidget,
} from '../types';

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
  const dispatch = useDispatch();

  const squareState = useSelector((state: RootState) => state.board.squares[props.y][props.x]);
  const pixelSize = useSelector((state: RootState) => state.board.pixelSquareSize);

  const timeDelta = useSelector((state: RootState) => state.app.timeDelta);
  const ticksElapsed = useSelector((state: RootState) => state.board.ticksElapsed);
  const prevTickRef = useRef<number>(ticksElapsed);

  const outlineColour = new Color('rgb(235, 235, 235)');

  const defaultColorString = useSelector((state: RootState) => state.app.defaultColor);
  const defaultColor = new Color(defaultColorString);

  // Object Spawning
  const activeObject = useSelector((state: RootState) => state.app.activeObject);
  const moverOps = useSelector((state: RootState) => state.app.moverOps);
  const fireflyOps = useSelector((state: RootState) => state.app.fireflyOps);

  // BRUSHES
  const cursorMode = useSelector((state: RootState) => state.app.cursorMode);
  const cursorColor = useSelector((state: RootState) => state.app.cursorColor);
  const paintOps = useSelector((state: RootState) => state.app.paintOps);
  const morphPaintOps = useSelector((state: RootState) => state.app.morphPaintOps);

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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [animTrigger, setAnimTrigger] = useState('');

  const renderingInfo: SquareRenderInfoEntry = GlobalSquareRenderingInfo.get(squareTag) as SquareRenderInfoEntry;

  const style: CSS.Properties = {
    outline: `1px solid ${outlineColour}`,
    height: `${pixelSize}px`,
    minWidth: `${pixelSize}px`,
    backgroundColor: defaultColor.toString(),
    transition: `background-color ${timeDelta}ms ease`,
    left: `${props.x * pixelSize}px`,
    top: `${props.y * pixelSize}px`,
  };

  let combinedColor = defaultColor;
  let previousColorRenderedFlag = false;

  // This should only run ONCE per tick
  if (ticksElapsed > prevTickRef.current) {
    for (const object of squareState.content) {
      const renderFunction = RenderMap.get(object.tag);
      const renderOps: BoardObjectRenderOptions = { obj: object, backgroundColor: combinedColor };
      if (renderFunction) {
        const renderOut: BoardObjectRenderOutput = renderFunction(renderOps);

        // Replace the current color with the one from this render pass
        combinedColor = renderOut.backgroundColor;
        // if (!previousColorRenderedFlag) {
        //   // On the first render pass, we don't take the combined colour so we can *ignore* the background color of the square
        //   combinedColor = renderOut.rawBackgroundColor;
        //   previousColorRenderedFlag = true;
        // } else {
        //   combinedColor = renderOut.backgroundColor;
        // }

        for (const renderClass of renderOut.cssClasses) {
          // Add the renderer classes to the global scope map
          renderingInfo.objectCSSClasses.push(renderClass);

          // When the animation times out, remove it from the rendering classes and force a component re-render
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

  if (activeObject === SpawnWidget.none) {
    // If we're not spawning an object, hover style based on cursor mode
    switch (cursorMode) {
      case CursorMode.default:
        if (hovering) {
          combinedColor = Color.mix(combinedColor, new Color(cursorColor)) as unknown as Color;
          // if (!previousColorRenderedFlag) {
          //   combinedColor = new Color(cursorColor);
          // } else {
          //   combinedColor = Color.mix(combinedColor, new Color(cursorColor)) as unknown as Color;
          // }
          style.cursor = 'default';
        }
        break;
      case CursorMode.painting:
        if (hovering) {
          style.outline = `2px dashed ${paintOps.primary}`;
          style.zIndex = 2;
        }
        break;
      case CursorMode.morphPainting:
        if (hovering) {
          style.outline = `2px dashed ${morphPaintOps.morphColors![0]}`;
          style.zIndex = 2;
        }
        break;
    }
  } else {
    // If we ARE spawning an object, hover styling based on that
    if (hovering) {
      style.outline = `2px dashed ${fallbackColor}`;
      style.zIndex = 2;
    }
  }

  style.backgroundColor = combinedColor.toString();

  let renderClassString = ' ';
  for (const objectCSSClass of renderingInfo.objectCSSClasses) {
    renderClassString += objectCSSClass.className + ' ';
  }

  // #region
  // EVENT FUNCTIONS

  const handleMouseOver = () => {
    setHovering(true);
  };

  const handleMouseOut = () => {
    setHovering(false);
  };

  const handleClick = (e: MouseEvent) => {
    e.preventDefault();
    if (activeObject === SpawnWidget.none) {
      handleBrushOnClick(e);
    } else {
      handleObjectSpawnOnClick(e);
    }
  };

  const handleBrushOnClick = (e: MouseEvent) => {
    switch (cursorMode) {
      case CursorMode.default:
        if (e.ctrlKey) {
          rotateSquareY();
          return;
        }
        if (e.altKey) {
          rotateSquareX();
          return;
        }
        break;
      case CursorMode.painting:
        if (e.button === 0) {
          dispatch(loadObjects([createPaint({ primary: paintOps.primary, posX: props.x, posY: props.y })]));
        }
        break;
      case CursorMode.morphPainting:
        if (e.button === 0) {
          dispatch(
            loadObjects([createMorphPaint({ morphColors: morphPaintOps.morphColors, posX: props.x, posY: props.y })]),
          );
        }
        break;
    }
  };

  const handleObjectSpawnOnClick = (e: MouseEvent) => {
    switch (activeObject) {
      case SpawnWidget.mover:
        dispatch(
          loadObjects([
            createMover({
              posX: props.x,
              posY: props.y,
              primary: moverOps.primary,
              touchdownAnimation: moverOps.touchdownAnimation,
              direction: moverOps.direction,
            }),
          ]),
        );
        break;
      case SpawnWidget.firefly:
        dispatch(
          loadObjects([
            createFirefly({
              posX: props.x,
              posY: props.y,
              primary: fireflyOps.primary,
              touchdownAnimation: fireflyOps.touchdownAnimation,
              compassDirection: CompassDirection.none,
            }),
          ]),
        );
        break;
    }
  };

  const handleMouseUp = () => {};

  const handleMouseDown = () => {};

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
      onClick={handleClick}
      onContextMenu={(e) => e.preventDefault()}
    ></div>
  );
};

export default Square;

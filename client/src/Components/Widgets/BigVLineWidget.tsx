import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMover } from '../../State/BoardObjects/Mover';
import { setBigVLineOps, setTooltipState, unsetTooltip } from '../../State/Slices/appSlice';
import { loadObjects } from '../../State/Slices/boardSlice';
import { RootState } from '../../State/rootReducer';
import { BoardObject, Direction, TooltipDirection } from '../../types';
import AnimationSelector from '../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';
import DirectionSelector from '../SubtoolbarOptions/DirectionSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const BigVLineWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const bigVLineOps = useSelector((state: RootState) => state.app.bigVLineOps);
  const directionOptions = useSelector((state: RootState) => state.app.horizontalDirections);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  const [hover, setHover] = useState(false);
  widgetWrapperStyle.color = bigVLineOps.primary;
  widgetWrapperStyle.borderColor = bigVLineOps.primary;

  const iconStyle: CSS.Properties = {};
  if (hover) {
    iconStyle.animationName = `wobble`;
    iconStyle.animationTimingFunction = `ease`;
    iconStyle.animationDuration = '400ms';
    iconStyle.animationIterationCount = '1';
  }

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleMouseEnter = () => {
    setHover(true);
    dispatch(
      setTooltipState({
        active: true,
        text: 'Vertical Line',
        direction: TooltipDirection.right,
        targetID: 'big-vline-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    setHover(false);
    dispatch(unsetTooltip());
  };

  const handleClick = () => {
    const objects: BoardObject[] = [];
    for (let i = 0; i < boardHeight; i++) {
      objects.push(
        createMover(
          {
            primary: bigVLineOps.primary,
            touchdownAnimation: bigVLineOps.touchdownAnimation,
            direction: bigVLineOps.direction,
          },
          0,
          i,
          1,
          8,
        ),
      );
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setBigVLineOps({ primary: color }));
  };

  const setTouchdownAnimation = (anim: string) => {
    dispatch(setBigVLineOps({ touchdownAnimation: anim }));
  };

  const setDirection = (dir: Direction) => {
    console.log('Setting direction to: ' + dir);
    dispatch(setBigVLineOps({ direction: dir }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="big-vline-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faGripLinesVertical} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={bigVLineOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={bigVLineOps.touchdownAnimation as string}
            />
            <DirectionSelector
              selectionCallback={setDirection}
              directionOptions={directionOptions}
              initDirection={bigVLineOps.direction as Direction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigVLineWidget;

import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createMover } from '../../State/BoardObjects/Mover';
import { setBigHLineOps, setTooltipState, unsetTooltip } from '../../State/Slices/appSlice';
import { loadObjects } from '../../State/Slices/boardSlice';
import { RootState } from '../../State/rootReducer';
import { BoardObject, Direction, TooltipDirection } from '../../types';
import AnimationSelector from '../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';
import DirectionSelector from '../SubtoolbarOptions/DirectionSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const BigHLineWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const bigHLineOps = useSelector((state: RootState) => state.app.bigHLineOps);
  const directionOptions = useSelector((state: RootState) => state.app.verticalDirections);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  const [hover, setHover] = useState(false);
  widgetWrapperStyle.color = bigHLineOps.primary;
  widgetWrapperStyle.borderColor = bigHLineOps.primary;

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
        text: 'Horizontal Line',
        direction: TooltipDirection.right,
        targetID: 'big-hline-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    setHover(false);
    dispatch(unsetTooltip());
  };

  const handleClick = () => {
    const objects: BoardObject[] = [];
    for (let i = 0; i < boardWidth; i++) {
      objects.push(
        createMover(
          {
            primary: bigHLineOps.primary,
            touchdownAnimation: bigHLineOps.touchdownAnimation,
            direction: bigHLineOps.direction,
          },
          i,
          0,
          1,
          3,
        ),
      );
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setBigHLineOps({ primary: color }));
  };

  const setTouchdownAnimation = (anim: string) => {
    dispatch(setBigHLineOps({ touchdownAnimation: anim }));
  };

  const setDirection = (dir: Direction) => {
    dispatch(setBigHLineOps({ direction: dir }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="big-hline-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faGripLines} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={bigHLineOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={bigHLineOps.touchdownAnimation as string}
            />
            <DirectionSelector
              selectionCallback={setDirection}
              directionOptions={directionOptions}
              initDirection={bigHLineOps.direction as Direction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigHLineWidget;

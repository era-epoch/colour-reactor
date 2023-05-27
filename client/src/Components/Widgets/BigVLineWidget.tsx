import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHPong } from '../../State/BoardObjects/HPong';
import { setBigVLineOps } from '../../State/Slices/appSlice';
import { loadObjects } from '../../State/Slices/boardSlice';
import { RootState } from '../../State/rootReducer';
import { BoardObject } from '../../types';
import AnimationSelector from '../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const BigVLineWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const bigVLineOps = useSelector((state: RootState) => state.app.bigVLineOps);

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

  const handleMouseOver = () => {
    setHover(true);
  };

  const handleMouseOut = () => {
    setHover(false);
  };

  const handleClick = () => {
    const objects: BoardObject[] = [];
    for (let i = 0; i < boardHeight; i++) {
      objects.push(
        createHPong({ primary: bigVLineOps.primary, touchdownAnimation: bigVLineOps.touchdownAnimation }, 0, i, 1, 8),
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

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle}>
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default BigVLineWidget;

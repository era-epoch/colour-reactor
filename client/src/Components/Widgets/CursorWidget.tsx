import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setCursorColor,
  setLeftClickColor,
  setMiddleClickColor,
  setRightClickColor,
} from '../../State/Slices/appSlices';
import { RootState } from '../../State/rootReducer';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const CursorWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const cursorColor = useSelector((state: RootState) => state.app.cursorColor);
  const leftClickColor = useSelector((state: RootState) => state.app.leftClickColor);
  const rightClickColor = useSelector((state: RootState) => state.app.rightClickColor);
  const middleClickColor = useSelector((state: RootState) => state.app.middleClickColor);
  const widgetColor = cursorColor;

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  const [hover, setHover] = useState(false);
  widgetWrapperStyle.color = widgetColor;
  widgetWrapperStyle.borderColor = widgetColor;

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

  const handleSetLeftClickColor = (color: string) => {
    dispatch(setLeftClickColor(color));
  };

  const handleSetRightClickColor = (color: string) => {
    dispatch(setRightClickColor(color));
  };

  const handleSetMiddleClickColor = (color: string) => {
    dispatch(setMiddleClickColor(color));
  };

  const handleSetCursorColor = (color: string) => {
    dispatch(setCursorColor(color));
  };

  return (
    // <div className="toolbar-widget" style={widgetStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
    //   <FontAwesomeIcon icon={faArrowPointer} />
    // </div>
    <div className="widget-wrapper" style={widgetWrapperStyle}>
      <div className="relative-parent">
        <div className="toolbar-widget" style={widgetStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
          <FontAwesomeIcon icon={faArrowPointer} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={handleSetCursorColor} initColor={cursorColor} />
            <div className="subtoolbar-separator"></div>
            <ColorSelector setColorCallback={handleSetLeftClickColor} initColor={leftClickColor} />
            <ColorSelector setColorCallback={handleSetMiddleClickColor} initColor={middleClickColor} />
            <ColorSelector setColorCallback={handleSetRightClickColor} initColor={rightClickColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorWidget;

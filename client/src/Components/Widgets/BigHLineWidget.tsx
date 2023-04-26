import { faGripLines } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVPong } from '../../State/BoardObjects/VPong';
import { setBigHLineColor } from '../../State/Slices/appSlices';
import { loadObjects } from '../../State/Slices/boardSlice';
import { RootState } from '../../State/rootReducer';
import { BoardObject } from '../../types';
import Subtoolbar from '../Subtoolbar';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const BigHLineWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const widgetColor = useSelector((state: RootState) => state.app.bigHLineColor);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  const [hover, setHover] = useState(false);
  widgetWrapperStyle.color = widgetColor;

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
    for (let i = 0; i < boardWidth; i++) {
      objects.push(createVPong(widgetColor, i, 0, 1));
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setBigHLineColor(color));
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
          <FontAwesomeIcon icon={faGripLines} style={iconStyle} />
        </div>
        <Subtoolbar setColorCallback={setWidgetColor} initColor={widgetColor} />
      </div>
    </div>
  );
};

export default BigHLineWidget;

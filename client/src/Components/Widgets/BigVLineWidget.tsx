import { faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createHPong } from '../../State/BoardObjects/HPong';
import { setBigVLineColor } from '../../State/Slices/appSlices';
import { loadObjects } from '../../State/Slices/boardSlice';
import { RootState } from '../../State/rootReducer';
import { BoardObject } from '../../types';
import Subtoolbar from '../Subtoolbar';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const BigVLineWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const widgetColor = useSelector((state: RootState) => state.app.bigVLineColor);

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

  const handleClick = () => {
    const objects: BoardObject[] = [];
    for (let i = 0; i < boardHeight; i++) {
      objects.push(createHPong(widgetColor, 0, i, 1, 8));
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setBigVLineColor(color));
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
        <Subtoolbar setColorCallback={setWidgetColor} initColor={widgetColor} />
      </div>
    </div>
  );
};

export default BigVLineWidget;

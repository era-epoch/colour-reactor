import { faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVPong } from '../../State/BoardObjects/VPong';
import { setWaveColor } from '../../State/Slices/appSlices';
import { loadObjects } from '../../State/Slices/boardSlice';
import { RootState } from '../../State/rootReducer';
import { BoardObject } from '../../types';
import Subtoolbar from '../Subtoolbar';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const WaveWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const widgetColor = useSelector((state: RootState) => state.app.waveColor);
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const backgroundColor = useSelector((state: RootState) => state.app.defaultColor);

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
    let j = 0;
    let j_direction = 'down';
    for (let i = 0; i < boardWidth; i++) {
      objects.push(createVPong(widgetColor, i, j, 1));
      if (j_direction === 'down') {
        if (j < boardHeight - 1) {
          j++;
        } else {
          j--;
          j_direction = 'up';
        }
      } else {
        if (j > 0) {
          j--;
        } else {
          j++;
          j_direction = 'down';
        }
      }
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setWaveColor(color));
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
          <FontAwesomeIcon icon={faWater} style={iconStyle} />
        </div>
        <Subtoolbar setColorCallback={setWidgetColor} initColor={widgetColor} />
      </div>
    </div>
  );
};

export default WaveWidget;

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
    const centerI = Math.floor(boardWidth / 2);
    let i = 0;
    let j = 0;
    let j_direction = 'down';
    while (centerI - i >= 0) {
      objects.push(createVPong(widgetColor, centerI - i, j, 1, 3));
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
      i++;
    }
    i = 1;
    j = 1;
    j_direction = 'down';
    while (centerI + i < boardWidth) {
      objects.push(createVPong(widgetColor, centerI + i, j, 1, 3));
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
      i++;
    }
    console.log('Last row: ' + j);
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

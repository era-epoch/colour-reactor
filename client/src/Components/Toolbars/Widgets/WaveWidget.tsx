import { faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVPong } from '../../../State/BoardObjects/VPong';
import { setWaveColor } from '../../../State/Slices/appSlices';
import { loadObjects } from '../../../State/Slices/boardSlice';
import { RootState } from '../../../State/rootReducer';
import { BoardObject } from '../../../types';
import { defaultWidgetStyle } from '../OpsToolbar';
import ColorWidget from './ColorWidget';

const widgetWrapperStyle: CSS.Properties = {
  // position: ''
};

const subtoolbarWrapperStyle: CSS.Properties = {
  position: 'relative',
  zIndex: '1',
};

interface Props {
  widgetStyle: CSS.Properties;
}

const WaveWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const widgetColor = useSelector((state: RootState) => state.app.waveColor);
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const widgetStyle = { ...props.widgetStyle };
  const [hover, setHover] = useState(false);
  widgetStyle.color = widgetColor;
  const iconStyle: CSS.Properties = {};
  if (hover) {
    iconStyle.animationName = `wobble`;
    iconStyle.animationTimingFunction = `ease`;
    iconStyle.animationDuration = '400ms';
    iconStyle.animationIterationCount = '1';
  }

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

  const subwidgetStyles = [
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
  ];
  for (let i = 0; i < subwidgetStyles.length; i++) {
    hover ? (subwidgetStyles[i].top = `${(i + 1) * 5}rem`) : (subwidgetStyles[i].top = '0');
    subwidgetStyles[i].transitionDuration = `${300 + 50 * i * i}ms`;
    subwidgetStyles[i].zIndex = `-${100 + i}`;
    subwidgetStyles[i].left = '0';
  }

  return (
    <div className="widget-wrapper">
      <div
        className="toolbar-widget"
        style={widgetStyle}
        onClick={handleClick}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <FontAwesomeIcon icon={faWater} style={iconStyle} />
      </div>
      <div className="subtoolbar-wrapper" style={subtoolbarWrapperStyle}>
        {colorScheme.map((color, i) => {
          return (
            <ColorWidget widgetStyle={subwidgetStyles[i]} clickCallback={() => setWidgetColor(color)} color={color} />
          );
        })}
      </div>
    </div>
  );
};

export default WaveWidget;

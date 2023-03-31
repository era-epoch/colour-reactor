import { faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createVPong } from '../../../State/BoardObjects/VPong';
import { loadObjects } from '../../../State/Slices/boardSlice';
import { RootState } from '../../../State/rootReducer';
import { BoardObject } from '../../../types';

interface Props {
  widgetStyle: CSS.Properties;
}

const WaveWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const widgetStyle = { ...props.widgetStyle };
  const [hover, setHover] = useState(false);
  if (hover) {
    widgetStyle.animationName = `wobble`;
    widgetStyle.animationTimingFunction = `ease`;
    widgetStyle.animationDuration = '400ms';
    widgetStyle.animationIterationCount = '1';
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
      objects.push(createVPong('rebeccapurple', i, j, 1));
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

  return (
    <div
      className="toolbar-widget"
      onClick={handleClick}
      style={widgetStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <FontAwesomeIcon icon={faWater} />
    </div>
  );
};

export default WaveWidget;

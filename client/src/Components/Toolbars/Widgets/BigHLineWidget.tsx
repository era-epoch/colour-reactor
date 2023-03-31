import { faGripLines } from '@fortawesome/free-solid-svg-icons';
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

const BigHLineWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const widgetColor = useSelector((state: RootState) => state.app.bigHLineColor);
  const widgetStyle = { ...props.widgetStyle };
  const [hover, setHover] = useState(false);
  widgetStyle.color = widgetColor;
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
    for (let i = 0; i < boardWidth; i++) {
      objects.push(createVPong(widgetColor, i, 0, 1));
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
      <FontAwesomeIcon icon={faGripLines} />
    </div>
  );
};

export default BigHLineWidget;

import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteAllObjects } from '../../State/Slices/boardSlice';

interface Props {
  widgetStyle: CSS.Properties;
}

const EraseWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
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

  const handleErase = () => {
    dispatch(deleteAllObjects());
  };

  return (
    <div
      className="toolbar-widget"
      onClick={handleErase}
      style={widgetStyle}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <FontAwesomeIcon icon={faEraser} />
    </div>
  );
};

export default EraseWidget;

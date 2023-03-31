import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../State/rootReducer';

interface Props {
  widgetStyle: CSS.Properties;
}

const CursorWidget = (props: Props): JSX.Element => {
  const widgetStyle = { ...props.widgetStyle };
  const cursorColour = useSelector((state: RootState) => state.board.cursorColour);
  const [hover, setHover] = useState(false);
  widgetStyle.color = cursorColour;
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

  return (
    <div className="toolbar-widget" style={widgetStyle} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
      <FontAwesomeIcon icon={faArrowPointer} />
    </div>
  );
};

export default CursorWidget;

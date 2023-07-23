import { faFileImport } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { setActiveDialogue, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { Dialogue, TooltipDirection } from '../../../types';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const LoadBoardWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleClick = () => {
    dispatch(unsetTooltip());
    dispatch(setActiveDialogue(Dialogue.loadPattern));
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Load Pattern`,
        direction: TooltipDirection.right,
        targetID: 'load-board-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="load-board-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faFileImport} />
        </div>
      </div>
    </div>
  );
};

export default LoadBoardWidget;

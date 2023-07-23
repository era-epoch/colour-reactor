import { faSave } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { setActiveDialogue, setPause, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { Dialogue, TooltipDirection } from '../../../types';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const SaveBoardWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleClick = () => {
    dispatch(unsetTooltip());
    dispatch(setActiveDialogue(Dialogue.savePattern));
    dispatch(setPause(true));
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Save Pattern`,
        direction: TooltipDirection.right,
        targetID: 'save-board-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="save-board-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faSave} />
        </div>
      </div>
    </div>
  );
};

export default SaveBoardWidget;

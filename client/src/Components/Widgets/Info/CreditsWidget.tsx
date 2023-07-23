import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { setActiveDialogue, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { Dialogue, TooltipDirection } from '../../../types';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const CreditsWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleClick = () => {
    dispatch(unsetTooltip());
    dispatch(setActiveDialogue(Dialogue.credits));
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Credits`,
        direction: TooltipDirection.right,
        targetID: 'credits-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="credits-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faList} />
        </div>
      </div>
    </div>
  );
};

export default CreditsWidget;

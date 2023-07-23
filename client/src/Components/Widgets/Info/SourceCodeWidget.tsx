import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { TooltipDirection } from '../../../types';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const SourceCodeWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleClick = () => {
    dispatch(unsetTooltip());
    window.open('https://github.com/era-epoch/ColourReactor', '_blank');
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Source Code`,
        direction: TooltipDirection.right,
        targetID: 'source-code-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="source-code-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faGithub} />
        </div>
      </div>
    </div>
  );
};

export default SourceCodeWidget;

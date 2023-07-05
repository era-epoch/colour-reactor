import { faPalette } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { setActiveDialogue, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { Dialogue, TooltipDirection } from '../../../types';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const PaletteWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleClick = () => {
    dispatch(unsetTooltip());
    dispatch(setActiveDialogue(Dialogue.palette));
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Colour Palette`,
        direction: TooltipDirection.right,
        targetID: 'palette-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="palette-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faPalette} />
        </div>
      </div>
    </div>
  );
};

export default PaletteWidget;

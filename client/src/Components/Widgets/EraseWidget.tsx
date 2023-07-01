import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { setTooltipState, unsetTooltip } from '../../State/Slices/appSlice';
import { deleteAllObjects } from '../../State/Slices/boardSlice';
import { TooltipDirection } from '../../types';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const EraseWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleErase = () => {
    dispatch(deleteAllObjects());
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Erase Everything',
        direction: TooltipDirection.right,
        targetID: 'erase-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="erase-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          onClick={handleErase}
          style={widgetStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faEraser} />
        </div>
      </div>
    </div>
  );
};

export default EraseWidget;

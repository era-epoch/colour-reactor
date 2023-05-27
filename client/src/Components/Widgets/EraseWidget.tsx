import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { deleteAllObjects } from '../../State/Slices/boardSlice';

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

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle}>
      <div className="relative-parent">
        <div className="toolbar-widget" onClick={handleErase} style={widgetStyle}>
          <FontAwesomeIcon icon={faEraser} />
        </div>
      </div>
    </div>
  );
};

export default EraseWidget;

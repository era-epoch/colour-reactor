import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch } from 'react-redux';
import { deleteAllObjects } from '../../State/Slices/boardSlice';

interface Props {
  widgetStyle: CSS.Properties;
}

const EraseWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const widgetStyle = { ...props.widgetStyle };

  const handleErase = () => {
    dispatch(deleteAllObjects());
  };

  return (
    <div className="toolbar-widget" onClick={handleErase} style={widgetStyle}>
      <FontAwesomeIcon icon={faEraser} />
    </div>
  );
};

export default EraseWidget;

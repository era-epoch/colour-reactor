import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import { defaultWidgetStyle, toolbarStyle } from '../../Styles/ComponentStyles';
import BigHLineWidget from '../Widgets/BigHLineWidget';
import EraseWidget from '../Widgets/EraseWidget';
import WaveWidget from '../Widgets/WaveWidget';

const OpsToolbar = (): JSX.Element => {
  const open = useSelector((state: RootState) => state.app.opsToolbarOpen);
  const dispatch = useDispatch();

  const widgetStyles = [
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
  ];
  for (let i = 0; i < widgetStyles.length; i++) {
    open ? (widgetStyles[i].right = `${(i + 1) * 5}rem`) : (widgetStyles[i].right = '0');
    widgetStyles[i].transitionDuration = `${300 + 50 * i * i}ms`;
    widgetStyles[i].zIndex = `-${i}`;
  }

  return (
    <div className="toolbar" style={toolbarStyle}>
      <div className="toolbar-widget" style={widgetStyles[0]}>
        <FontAwesomeIcon icon={faHourglassHalf} />
      </div>
      <EraseWidget widgetStyle={widgetStyles[1]} />
      <BigHLineWidget widgetWrapperStyle={widgetStyles[2]} />
      <WaveWidget widgetWrapperStyle={widgetStyles[3]} />
    </div>
  );
};

export default OpsToolbar;

import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import BigHLineWidget from './Widgets/BigHLineWidget';
import EraseWidget from './Widgets/EraseWidget';
import WaveWidget from './Widgets/WaveWidget';

export const toolbarStyle: CSS.Properties = {
  zIndex: '1',
};

export const defaultWidgetStyle: CSS.Properties = {
  position: 'absolute',
  bottom: '0',
  width: '4rem',
  height: '4rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '1.5rem',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '50% 50%',
  transitionProperty: 'all',
  transitionTimingFunction: 'ease',
  transitionDuration: '300ms',
  border: '2px solid rgb(235, 235, 235)',
  cursor: 'pointer',
};

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
      <BigHLineWidget widgetStyle={widgetStyles[2]} />
      <WaveWidget widgetStyle={widgetStyles[3]} />
    </div>
  );
};

export default OpsToolbar;

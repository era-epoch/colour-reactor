import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import { defaultWidgetStyle, toolbarStyle } from '../../Styles/ComponentStyles';
import BigHLineWidget from '../Widgets/BigHLineWidget';
import BigVLineWidget from '../Widgets/BigVLineWidget';
import WaveWidget from '../Widgets/WaveWidget';

const StampToolbar = (): JSX.Element => {
  const open = useSelector((state: RootState) => state.app.stampToolbarOpen);
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
      <BigHLineWidget widgetWrapperStyle={widgetStyles[0]} />
      <BigVLineWidget widgetWrapperStyle={widgetStyles[1]} />
      <WaveWidget widgetWrapperStyle={widgetStyles[2]} />
    </div>
  );
};

export default StampToolbar;

import { useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import { defaultWidgetStyle, toolbarStyle } from '../../Styles/ComponentStyles';
import EraseWidget from '../Widgets/EraseWidget';
import FillCanvasWidget from '../Widgets/FillCanvasWidget';
import FullscreenWidget from '../Widgets/FullscreenWidget';
import TimeWidget from '../Widgets/TimeWidget';

const OpsToolbar = (): JSX.Element => {
  const open = useSelector((state: RootState) => state.app.opsToolbarOpen);

  // TODO: change this
  const widgetStyles = [
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
    { ...defaultWidgetStyle },
  ];
  for (let i = 0; i < widgetStyles.length; i++) {
    if (open) {
      widgetStyles[i].left = `${(i + 1) * 5}rem`;
      widgetStyles[i].scale = '1';
    } else {
      widgetStyles[i].left = '0';
      widgetStyles[i].scale = '0.5';
    }
    widgetStyles[i].transitionDuration = `${300 + 50 * i * i}ms`;
    widgetStyles[i].zIndex = `-${i}`;
  }

  return (
    <div className="toolbar" style={toolbarStyle}>
      <EraseWidget widgetWrapperStyle={widgetStyles[0]} />
      <TimeWidget widgetWrapperStyle={widgetStyles[1]} />
      <FillCanvasWidget widgetWrapperStyle={widgetStyles[2]} />
      <FullscreenWidget widgetWrapperStyle={widgetStyles[3]} />
    </div>
  );
};

export default OpsToolbar;

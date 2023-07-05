import { useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import { defaultWidgetStyle, toolbarStyle } from '../../Styles/ComponentStyles';
import { Toolbar } from '../../types';
import CursorWidget from '../Widgets/Brushes/CursorWidget';
import MorphPaintWidget from '../Widgets/Brushes/MorphPaintWidget';
import PaintWidget from '../Widgets/Brushes/PaintWidget';

const BrushToolbar = (): JSX.Element => {
  const activeToolbar = useSelector((state: RootState) => state.app.activeToolbar);
  const open = activeToolbar === Toolbar.brushes;

  const widgetStyles = [
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
      <CursorWidget widgetWrapperStyle={widgetStyles[0]} />
      <PaintWidget widgetWrapperStyle={widgetStyles[1]} />
      <MorphPaintWidget widgetWrapperStyle={widgetStyles[2]} />
    </div>
  );
};

export default BrushToolbar;

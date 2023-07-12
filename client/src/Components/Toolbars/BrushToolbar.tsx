import { useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import { defaultWidgetStyle, toolbarStyle } from '../../Styles/ComponentStyles';
import { Toolbar } from '../../types';
import EraserWidget from '../Widgets/Brushes/EraserWidget';
import HoverCursorWidget from '../Widgets/Brushes/HoverCursorWidget';
import MorphPaintWidget from '../Widgets/Brushes/MorphPaintWidget';
import NeutralCursorWidget from '../Widgets/Brushes/NeutralCursorWidget';
import PaintWidget from '../Widgets/Brushes/PaintWidget';

const BrushToolbar = (): JSX.Element => {
  const activeToolbar = useSelector((state: RootState) => state.app.activeToolbar);
  const open = activeToolbar === Toolbar.brushes;

  const widgetStyles = [
    { ...defaultWidgetStyle },
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
      <NeutralCursorWidget widgetWrapperStyle={widgetStyles[0]} />
      <EraserWidget widgetWrapperStyle={widgetStyles[1]} />
      <HoverCursorWidget widgetWrapperStyle={widgetStyles[2]} />
      <PaintWidget widgetWrapperStyle={widgetStyles[3]} />
      <MorphPaintWidget widgetWrapperStyle={widgetStyles[4]} />
    </div>
  );
};

export default BrushToolbar;

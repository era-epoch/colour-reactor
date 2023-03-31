import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';
import { toolbarStyle, widgetStyle } from './OpsToolbar';
import CursorWidget from './Widgets/CursorWidget';

const BrushToolbar = (): JSX.Element => {
  const open = useSelector((state: RootState) => state.app.brushToolbarOpen);
  const dispatch = useDispatch();

  const widgetStyles = [{ ...widgetStyle }, { ...widgetStyle }, { ...widgetStyle }, { ...widgetStyle }];
  for (let i = 0; i < widgetStyles.length; i++) {
    open ? (widgetStyles[i].right = `${(i + 1) * 5}rem`) : (widgetStyles[i].right = '0');
    widgetStyles[i].transitionDuration = `${300 + 50 * i * i}ms`;
    widgetStyles[i].zIndex = `-${i}`;
  }

  return (
    <div className="toolbar" style={toolbarStyle}>
      <CursorWidget widgetStyle={widgetStyles[0]} />
    </div>
  );
};

export default BrushToolbar;

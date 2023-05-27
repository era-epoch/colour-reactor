import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setCursorMode, setPaintOps } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import { CursorMode } from '../../types';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const PaintWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const paintColor = useSelector((state: RootState) => state.app.paintOps.primary);
  const cursorMode = useSelector((state: RootState) => state.app.cursorMode);
  const widgetColor = paintColor;

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  widgetWrapperStyle.color = widgetColor;
  widgetWrapperStyle.borderColor = widgetColor;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (cursorMode === CursorMode.painting) {
    widgetStyle.backgroundColor = widgetColor;
    widgetStyle.color = widgetWrapperStyle.backgroundColor;
  }

  const handleSetPaintColor = (color: string) => {
    dispatch(setPaintOps({ primary: color }));
  };

  const handleClick = () => {
    if (cursorMode !== CursorMode.painting) {
      dispatch(setCursorMode(CursorMode.painting));
    } else {
      dispatch(setCursorMode(CursorMode.default));
    }
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle}>
      <div className="relative-parent">
        <div className="toolbar-widget" style={widgetStyle} onClick={handleClick}>
          <FontAwesomeIcon icon={faPaintBrush} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={handleSetPaintColor} initColor={paintColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaintWidget;

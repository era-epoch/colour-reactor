import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setCursorMode, setMorphPaintColorAtIndex } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import { CursorMode } from '../../types';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const MorphPaintWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const morphPaintColors = useSelector((state: RootState) => state.app.morphPaintOps.morphColors);
  const cursorMode = useSelector((state: RootState) => state.app.cursorMode);
  const widgetColor = morphPaintColors![0];

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  widgetWrapperStyle.color = widgetColor;
  widgetWrapperStyle.borderColor = widgetColor;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (cursorMode === CursorMode.morphPainting) {
    widgetStyle.backgroundColor = widgetColor;
    widgetStyle.color = widgetWrapperStyle.backgroundColor;
  }

  const handleSetMorphPaintColor1 = (color: string) => {
    dispatch(setMorphPaintColorAtIndex({ index: 0, color: color }));
  };

  const handleSetMorphPaintColor2 = (color: string) => {
    dispatch(setMorphPaintColorAtIndex({ index: 1, color: color }));
  };

  const handleClick = () => {
    if (cursorMode !== CursorMode.morphPainting) {
      dispatch(setCursorMode(CursorMode.morphPainting));
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
            <ColorSelector setColorCallback={handleSetMorphPaintColor1} initColor={morphPaintColors![0]} />
            <ColorSelector setColorCallback={handleSetMorphPaintColor2} initColor={morphPaintColors![1]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MorphPaintWidget;

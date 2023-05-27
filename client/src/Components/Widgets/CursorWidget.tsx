import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setCursorColor } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const CursorWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const cursorColor = useSelector((state: RootState) => state.app.cursorColor);
  const widgetColor = cursorColor;

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  widgetWrapperStyle.color = widgetColor;
  widgetWrapperStyle.borderColor = widgetColor;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleSetCursorColor = (color: string) => {
    dispatch(setCursorColor(color));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle}>
      <div className="relative-parent">
        <div className="toolbar-widget" style={widgetStyle}>
          <FontAwesomeIcon icon={faArrowPointer} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={handleSetCursorColor} initColor={cursorColor} />
            {/* <div className="subtoolbar-separator"></div>
            <ColorSelector setColorCallback={handleSetLeftClickColor} initColor={leftClickColor} />
            <ColorSelector setColorCallback={handleSetMiddleClickColor} initColor={middleClickColor} />
            <ColorSelector setColorCallback={handleSetRightClickColor} initColor={rightClickColor} /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CursorWidget;

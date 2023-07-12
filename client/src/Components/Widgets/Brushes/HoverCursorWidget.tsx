import { faArrowPointer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setCursorColor, setCursorMode, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { RootState } from '../../../State/rootReducer';
import { CursorMode, TooltipDirection } from '../../../types';
import ColorSelector from '../../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const HoverCursorWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const cursorColor = useSelector((state: RootState) => state.app.cursorColor);
  const cursorMode = useSelector((state: RootState) => state.app.cursorMode);
  const widgetColor = cursorColor;

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  widgetWrapperStyle.color = widgetColor;
  widgetWrapperStyle.borderColor = widgetColor;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (cursorMode === CursorMode.hover) {
    widgetStyle.backgroundColor = widgetColor;
    widgetStyle.color = widgetWrapperStyle.backgroundColor;
  }

  const handleClick = () => {
    if (cursorMode !== CursorMode.hover) {
      dispatch(setCursorMode(CursorMode.hover));
      pushTooltip(true);
    } else {
      dispatch(setCursorMode(CursorMode.default));
      pushTooltip(false);
    }
  };

  const handleSetCursorColor = (color: string) => {
    dispatch(setCursorColor(color));
  };

  const pushTooltip = (active: boolean) => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Hover Colour ${active ? '(Active)' : ''}`,
        direction: TooltipDirection.right,
        targetID: 'cursor-widget',
      }),
    );
  };

  const handleMouseEnter = () => {
    pushTooltip(cursorMode === CursorMode.hover);
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="cursor-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faArrowPointer} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={handleSetCursorColor} initColor={cursorColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCursorWidget;

import { faPaintBrush } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setCursorMode, setSpawnOps, setTooltipState, unsetTooltip } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import { CursorMode, SpawnWidget, TooltipDirection } from '../../types';
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
    dispatch(setSpawnOps({ ops: { primary: color }, target: SpawnWidget.paint }));
  };

  const handleClick = () => {
    if (cursorMode !== CursorMode.painting) {
      dispatch(setCursorMode(CursorMode.painting));
      pushTooltip(true);
    } else {
      dispatch(setCursorMode(CursorMode.default));
      pushTooltip(false);
    }
  };

  const pushTooltip = (active: boolean) => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Paint ${active ? '(Active)' : ''}`,
        direction: TooltipDirection.right,
        targetID: 'painting-widget',
      }),
    );
  };

  const handleMouseEnter = () => {
    pushTooltip(cursorMode === CursorMode.painting);
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="painting-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
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

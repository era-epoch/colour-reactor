import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setCursorMode, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { RootState } from '../../../State/rootReducer';
import { CursorMode, TooltipDirection } from '../../../types';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const NeutralCursorWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const cursorMode = useSelector((state: RootState) => state.app.cursorMode);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (cursorMode === CursorMode.default) {
    widgetStyle.color = widgetWrapperStyle.backgroundColor;
    widgetStyle.backgroundColor = 'var(--contrast)';
  }

  const handleClick = () => {
    dispatch(setCursorMode(CursorMode.default));
    pushTooltip(true);
  };

  const pushTooltip = (active: boolean) => {
    dispatch(
      setTooltipState({
        active: true,
        text: `None ${active ? '(Active)' : ''}`,
        direction: TooltipDirection.right,
        targetID: 'neutral-cursor-widget',
      }),
    );
  };

  const handleMouseEnter = () => {
    pushTooltip(cursorMode === CursorMode.default);
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="neutral-cursor-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faCircle} />
        </div>
      </div>
    </div>
  );
};

export default NeutralCursorWidget;

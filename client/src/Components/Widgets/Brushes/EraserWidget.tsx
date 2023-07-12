import { faArrowDownShortWide, faEraser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setCursorMode, setEraserOps, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { RootState } from '../../../State/rootReducer';
import { CursorMode, TooltipDirection } from '../../../types';
import NumberInput from '../../SubtoolbarOptions/NumberInput';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const EraserWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const eraserOps = useSelector((state: RootState) => state.app.eraserOps);
  const cursorMode = useSelector((state: RootState) => state.app.cursorMode);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (cursorMode === CursorMode.erasing) {
    widgetStyle.color = widgetWrapperStyle.backgroundColor;
    widgetStyle.backgroundColor = 'var(--contrast)';
  }

  const handleClick = () => {
    if (cursorMode !== CursorMode.erasing) {
      dispatch(setCursorMode(CursorMode.erasing));
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
        text: `Eraser ${active ? '(Active - Left Click)' : ''}`,
        direction: TooltipDirection.right,
        targetID: 'eraser-widget',
      }),
    );
  };

  const handleMouseEnter = () => {
    pushTooltip(cursorMode === CursorMode.erasing);
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  const setEraserStrength = (val: number) => {
    dispatch(setEraserOps({ strength: val }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="eraser-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faEraser} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <NumberInput
              labelIcon={faArrowDownShortWide}
              value={eraserOps.strength}
              min={1}
              max={99}
              changeCallback={setEraserStrength}
              units="layers"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EraserWidget;

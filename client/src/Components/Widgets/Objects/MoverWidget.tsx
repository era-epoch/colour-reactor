import { faSquareCaretDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveObject, setSpawnOps, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { RootState } from '../../../State/rootReducer';
import { Direction, SpawnWidget, TooltipDirection } from '../../../types';
import AnimationSelector from '../../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../../SubtoolbarOptions/ColorSelector';
import DirectionSelector from '../../SubtoolbarOptions/DirectionSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const MoverWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const moverOps = useSelector((state: RootState) => state.app.moverOps);
  const directionOptions = useSelector((state: RootState) => state.app.directions);
  const activeObject = useSelector((state: RootState) => state.app.activeObject);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  widgetWrapperStyle.color = moverOps.primary;
  widgetWrapperStyle.borderColor = moverOps.primary;

  const iconStyle: CSS.Properties = {};

  const widgetActive = activeObject === SpawnWidget.mover;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (widgetActive) {
    widgetStyle.backgroundColor = moverOps.primary;
    widgetStyle.color = widgetWrapperStyle.backgroundColor;
  }

  const pushTooltip = (active: boolean) => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Moving Pixel${active ? ' (Active)' : ''}`,
        direction: TooltipDirection.right,
        targetID: 'mover-widget',
      }),
    );
  };

  const handleMouseEnter = () => {
    pushTooltip(widgetActive);
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  const handleClick = () => {
    if (widgetActive) {
      dispatch(setActiveObject(SpawnWidget.none));
      pushTooltip(false);
    } else {
      dispatch(setActiveObject(SpawnWidget.mover));
      pushTooltip(true);
    }
  };

  const setWidgetColor = (color: string) => {
    dispatch(setSpawnOps({ ops: { primary: color }, target: SpawnWidget.mover }));
  };

  const setTouchdownAnimation = (anim: string) => {
    dispatch(setSpawnOps({ ops: { touchdownAnimation: anim }, target: SpawnWidget.mover }));
  };

  const setDirection = (dir: Direction) => {
    dispatch(setSpawnOps({ ops: { direction: dir }, target: SpawnWidget.mover }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="mover-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faSquareCaretDown} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={moverOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={moverOps.touchdownAnimation as string}
            />
            <DirectionSelector
              selectionCallback={setDirection}
              directionOptions={directionOptions}
              initDirection={moverOps.direction as Direction}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoverWidget;

import { faBug, faGhost } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveObject, setSpawnOps, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { RootState } from '../../../State/rootReducer';
import { SpawnWidget, TooltipDirection } from '../../../types';
import AnimationSelector from '../../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../../SubtoolbarOptions/ColorSelector';
import NumberInput from '../../SubtoolbarOptions/NumberInput';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const FireflyWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const fireflyOps = useSelector((state: RootState) => state.app.fireflyOps);
  const directionOptions = useSelector((state: RootState) => state.app.directions);
  const activeObject = useSelector((state: RootState) => state.app.activeObject);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  widgetWrapperStyle.color = fireflyOps.primary;
  widgetWrapperStyle.borderColor = fireflyOps.primary;

  const iconStyle: CSS.Properties = {};

  const widgetActive = activeObject === SpawnWidget.firefly;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (widgetActive) {
    widgetStyle.backgroundColor = fireflyOps.primary;
    widgetStyle.color = widgetWrapperStyle.backgroundColor;
  }

  const pushTooltip = (active: boolean) => {
    dispatch(
      setTooltipState({
        active: true,
        text: `Bug${active ? ' (Active - Right Click)' : ''}`,
        direction: TooltipDirection.right,
        targetID: 'firefly-widget',
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
      dispatch(setActiveObject(SpawnWidget.firefly));
      pushTooltip(true);
    }
  };

  const setWidgetColor = (color: string) => {
    dispatch(setSpawnOps({ ops: { primary: color }, target: SpawnWidget.firefly }));
  };

  const setTouchdownAnimation = (anim: string) => {
    dispatch(setSpawnOps({ ops: { touchdownAnimation: anim }, target: SpawnWidget.firefly }));
  };

  const setGhost = (ticks: number) => {
    dispatch(setSpawnOps({ ops: { ghostTicks: ticks }, target: SpawnWidget.firefly }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="firefly-widget" onMouseLeave={handleMouseLeave}>
      <div className="relative-parent">
        <div className="toolbar-widget" style={widgetStyle} onClick={handleClick} onMouseEnter={handleMouseEnter}>
          <FontAwesomeIcon icon={faBug} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={fireflyOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={fireflyOps.touchdownAnimation as string}
            />
            <NumberInput
              labelIcon={faGhost}
              value={fireflyOps.ghostTicks !== undefined ? fireflyOps.ghostTicks : 0}
              min={0}
              max={99}
              changeCallback={setGhost}
              units="ticks"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireflyWidget;

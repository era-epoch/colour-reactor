import { faBug } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveObject, setSpawnOps, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { RootState } from '../../../State/rootReducer';
import { SpawnWidget, TooltipDirection } from '../../../types';
import AnimationSelector from '../../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../../SubtoolbarOptions/ColorSelector';

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
        text: `Bug${active ? ' (Active)' : ''}`,
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

  // const setDirection = (dir: Direction) => {
  //   dispatch(setSpawnOps({ ops: { direction: dir }, target: SpawnWidget.firefly }));
  // };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="firefly-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faBug} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={fireflyOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={fireflyOps.touchdownAnimation as string}
            />
            {/* <DirectionSelector
              selectionCallback={setDirection}
              directionOptions={directionOptions}
              initDirection={fireflyOps.direction as Direction}
            /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireflyWidget;

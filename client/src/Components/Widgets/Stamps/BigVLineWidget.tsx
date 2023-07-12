import { faGhost, faGripLinesVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { createMover } from '../../../State/BoardObjects/Mover';
import { setSpawnOps, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { loadObjects } from '../../../State/Slices/boardSlice';
import { RootState } from '../../../State/rootReducer';
import { BoardObject, Direction, SpawnWidget, TooltipDirection } from '../../../types';
import AnimationSelector from '../../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../../SubtoolbarOptions/ColorSelector';
import DirectionSelector from '../../SubtoolbarOptions/DirectionSelector';
import NumberInput from '../../SubtoolbarOptions/NumberInput';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const BigVLineWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const bigVLineOps = useSelector((state: RootState) => state.app.bigVLineOps);
  const directionOptions = useSelector((state: RootState) => state.app.horizontalDirections);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  widgetWrapperStyle.color = bigVLineOps.primary;
  widgetWrapperStyle.borderColor = bigVLineOps.primary;

  const iconStyle: CSS.Properties = {};

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Vertical Line',
        direction: TooltipDirection.right,
        targetID: 'big-vline-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  const handleClick = () => {
    const objects: BoardObject[] = [];
    for (let i = 0; i < boardHeight; i++) {
      objects.push(
        createMover({
          primary: bigVLineOps.primary,
          touchdownAnimation: bigVLineOps.touchdownAnimation,
          direction: bigVLineOps.direction,
          posX: 0,
          posY: i,
          tickDelay: 1,
          ghostTicks: bigVLineOps.ghostTicks,
        }),
      );
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setSpawnOps({ ops: { primary: color }, target: SpawnWidget.bigVLine }));
  };

  const setTouchdownAnimation = (anim: string) => {
    dispatch(setSpawnOps({ ops: { touchdownAnimation: anim }, target: SpawnWidget.bigVLine }));
  };

  const setDirection = (dir: Direction) => {
    dispatch(setSpawnOps({ ops: { direction: dir }, target: SpawnWidget.bigVLine }));
  };

  const setGhost = (ticks: number) => {
    dispatch(setSpawnOps({ ops: { ghostTicks: ticks }, target: SpawnWidget.bigVLine }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="big-vline-widget" onMouseLeave={handleMouseLeave}>
      <div className="relative-parent">
        <div className="toolbar-widget" style={widgetStyle} onClick={handleClick} onMouseEnter={handleMouseEnter}>
          <FontAwesomeIcon icon={faGripLinesVertical} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={bigVLineOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={bigVLineOps.touchdownAnimation as string}
            />
            <DirectionSelector
              selectionCallback={setDirection}
              directionOptions={directionOptions}
              initDirection={bigVLineOps.direction as Direction}
            />
            <NumberInput
              labelIcon={faGhost}
              value={bigVLineOps.ghostTicks !== undefined ? bigVLineOps.ghostTicks : 0}
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

export default BigVLineWidget;

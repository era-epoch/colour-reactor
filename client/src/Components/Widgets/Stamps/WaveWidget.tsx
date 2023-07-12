import { faGhost, faWater } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { createMover } from '../../../State/BoardObjects/Mover';
import { setSpawnOps, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { loadObjects } from '../../../State/Slices/boardSlice';
import { RootState } from '../../../State/rootReducer';
import { BoardObject, SpawnWidget, TooltipDirection } from '../../../types';
import AnimationSelector from '../../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../../SubtoolbarOptions/ColorSelector';
import NumberInput from '../../SubtoolbarOptions/NumberInput';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const WaveWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const waveOps = useSelector((state: RootState) => state.app.waveOps);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  widgetWrapperStyle.color = waveOps.primary;
  widgetWrapperStyle.borderColor = waveOps.primary;

  const iconStyle: CSS.Properties = {};

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Mirrored Wave',
        direction: TooltipDirection.right,
        targetID: 'wave-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  const handleClick = () => {
    const objects: BoardObject[] = [];
    const centerI = Math.floor(boardWidth / 2);
    let i = 0;
    let j = 0;
    let j_direction = 'down';
    while (centerI - i >= 0) {
      objects.push(
        createMover(
          createMover({
            primary: waveOps.primary,
            touchdownAnimation: waveOps.touchdownAnimation,
            direction: waveOps.direction,
            posX: centerI - i,
            posY: j,
            tickDelay: 1,
            ghostTicks: waveOps.ghostTicks,
          }),
        ),
      );
      if (j_direction === 'down') {
        if (j < boardHeight - 1) {
          j++;
        } else {
          j--;
          j_direction = 'up';
        }
      } else {
        if (j > 0) {
          j--;
        } else {
          j++;
          j_direction = 'down';
        }
      }
      i++;
    }
    i = 1;
    j = 1;
    j_direction = 'down';
    while (centerI + i < boardWidth) {
      objects.push(
        createMover({
          primary: waveOps.primary,
          touchdownAnimation: waveOps.touchdownAnimation,
          direction: waveOps.direction,
          posX: centerI + i,
          posY: j,
          tickDelay: 1,
          ghostTicks: waveOps.ghostTicks,
        }),
      );
      if (j_direction === 'down') {
        if (j < boardHeight - 1) {
          j++;
        } else {
          j--;
          j_direction = 'up';
        }
      } else {
        if (j > 0) {
          j--;
        } else {
          j++;
          j_direction = 'down';
        }
      }
      i++;
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setSpawnOps({ ops: { primary: color }, target: SpawnWidget.wave }));
  };

  const setTouchdownAnimation = (anim: string) => {
    dispatch(setSpawnOps({ ops: { touchdownAnimation: anim }, target: SpawnWidget.wave }));
  };
  const setGhost = (ticks: number) => {
    dispatch(setSpawnOps({ ops: { ghostTicks: ticks }, target: SpawnWidget.wave }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="wave-widget" onMouseLeave={handleMouseLeave}>
      <div className="relative-parent">
        <div className="toolbar-widget" style={widgetStyle} onClick={handleClick} onMouseEnter={handleMouseEnter}>
          <FontAwesomeIcon icon={faWater} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={waveOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={waveOps.touchdownAnimation as string}
            />
            <NumberInput
              labelIcon={faGhost}
              value={waveOps.ghostTicks !== undefined ? waveOps.ghostTicks : 0}
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

export default WaveWidget;

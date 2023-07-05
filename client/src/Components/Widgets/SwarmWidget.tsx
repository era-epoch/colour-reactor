import { faBugs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { createFirefly } from '../../State/BoardObjects/FireFly';
import { setSpawnOps, setTooltipState, unsetTooltip } from '../../State/Slices/appSlice';
import { loadObjects } from '../../State/Slices/boardSlice';
import { RootState } from '../../State/rootReducer';
import { BoardObject, SpawnWidget, TooltipDirection } from '../../types';
import AnimationSelector from '../SubtoolbarOptions/AnimationSelector';
import ColorSelector from '../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const SwarmWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const swarmOps = useSelector((state: RootState) => state.app.swarmOps);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  widgetWrapperStyle.color = swarmOps.primary;
  widgetWrapperStyle.borderColor = swarmOps.primary;

  const iconStyle: CSS.Properties = {};

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Swarm',
        direction: TooltipDirection.right,
        targetID: 'swarm-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  const handleClick = () => {
    const objects: BoardObject[] = [];
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        let r = Math.random();
        if (r > 0.9) {
          objects.push(
            createFirefly({
              primary: swarmOps.primary,
              posX: j,
              posY: i,
              touchdownAnimation: swarmOps.touchdownAnimation,
            }),
          );
        }
      }
    }
    dispatch(loadObjects(objects));
  };

  const setWidgetColor = (color: string) => {
    dispatch(setSpawnOps({ ops: { primary: color }, target: SpawnWidget.swarm }));
  };

  const setTouchdownAnimation = (anim: string) => {
    dispatch(setSpawnOps({ ops: { touchdownAnimation: anim }, target: SpawnWidget.swarm }));
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="swarm-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          style={widgetStyle}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faBugs} style={iconStyle} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={setWidgetColor} initColor={swarmOps.primary} />
            <AnimationSelector
              selectionCallback={setTouchdownAnimation}
              initAnimation={swarmOps.touchdownAnimation as string}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwarmWidget;

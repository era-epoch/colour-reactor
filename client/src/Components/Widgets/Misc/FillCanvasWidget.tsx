import { faPaintRoller } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { createPaint } from '../../../State/BoardObjects/Paint';
import { setFillColor, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { loadObjects } from '../../../State/Slices/boardSlice';
import { RootState } from '../../../State/rootReducer';
import { BoardObject, TooltipDirection } from '../../../types';
import ColorSelector from '../../SubtoolbarOptions/ColorSelector';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const FillCanvasWidget = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const boardHeight = useSelector((state: RootState) => state.board.squares.length);
  const boardWidth = useSelector((state: RootState) => state.board.squares[0].length);
  const fillColor = useSelector((state: RootState) => state.app.fillColor);

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };
  widgetWrapperStyle.borderColor = fillColor;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
    color: fillColor,
  };

  const handleClick = () => {
    const objects: BoardObject[] = [];
    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        objects.push(createPaint({ primary: fillColor, posX: j, posY: i }));
      }
    }
    dispatch(loadObjects(objects));
  };

  const handleSetFillColor = (color: string) => {
    dispatch(setFillColor(color));
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Fill Canvas',
        direction: TooltipDirection.right,
        targetID: 'fill-canvas-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="fill-canvas-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          onClick={handleClick}
          style={widgetStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faPaintRoller} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <ColorSelector setColorCallback={handleSetFillColor} initColor={fillColor} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FillCanvasWidget;

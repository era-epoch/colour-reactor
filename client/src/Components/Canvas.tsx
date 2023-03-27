import Square from './Square';
import CSS from 'csstype';
import { uid } from 'react-uid';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../State/rootReducer';
import { useInterval } from 'usehooks-ts';
import { update } from '../State/Slices/boardSlice';

const Canvas = (): JSX.Element => {
  const boardState = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();

  const canvasStyle: CSS.Properties = {
    width: `${boardState.pixelBoardWidth}px`,
    height: `${boardState.pixelBoardHeight}px`,
    display: 'flex',
    flexDirection: 'column',
  };

  const rowStyle: CSS.Properties = {
    display: 'flex',
  };

  useInterval(() => {
    dispatch(update());
  }, boardState.timeDelta);

  return (
    <div className="canvas" style={canvasStyle}>
      {boardState.squares.map((row, i) => {
        return (
          <div className="row" style={rowStyle} key={uid(row)}>
            {row.map((square, j) => {
              return (
                <Square
                  squareState={square}
                  pxHeight={boardState.pixelSquareSize}
                  pxWidth={boardState.pixelSquareSize}
                  key={uid(square)}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;

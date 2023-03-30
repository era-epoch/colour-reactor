import CSS from 'csstype';
import { useSelector } from 'react-redux';
import { uid } from 'react-uid';
import { RootState } from '../State/rootReducer';
import Square from './Square';

const Canvas = (): JSX.Element => {
  const boardSizeY = useSelector((state: RootState) => state.board.squares.length);
  const boardSizeX = useSelector((state: RootState) => state.board.squares[0].length);
  const width = useSelector((state: RootState) => state.board.pixelBoardWidth);
  const height = useSelector((state: RootState) => state.board.pixelBoardHeight);

  const canvasStyle: CSS.Properties = {
    width: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    flexDirection: 'column',
  };

  const rowStyle: CSS.Properties = {
    display: 'flex',
  };

  const squares: number[][] = [];
  for (let i = 0; i < boardSizeY; i++) {
    squares.push([]);
    for (let j = 0; j < boardSizeX; j++) {
      squares[i].push(j);
    }
  }

  return (
    <div className="canvas" style={canvasStyle}>
      {squares.map((row, i) => {
        return (
          <div className="row" style={rowStyle} key={uid(row)}>
            {row.map((square, j) => {
              return <Square key={uid(j)} x={j} y={i} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;

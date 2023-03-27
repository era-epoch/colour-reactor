import Square from './Square';
import CSS from 'csstype';
import { uid } from 'react-uid';

export interface SquareInfo {
  row: number;
  col: number;
}

const Canvas = (): JSX.Element => {
  const numSquaresInColumn = 32;
  const width = window.innerWidth;
  const height = window.innerHeight;
  const squareSizePixels = Math.floor(height / numSquaresInColumn);
  const numSquaresInRow = Math.floor(width / squareSizePixels);

  const rows: SquareInfo[][] = [];
  for (let i = 0; i < numSquaresInColumn; i++) {
    rows.push([]);
    for (let j = 0; j < numSquaresInRow; j++) {
      rows[i].push({ row: i, col: j } as SquareInfo);
    }
  }

  const canvasStyle: CSS.Properties = {
    width: `${width}px`,
    height: `${height}px`,
    display: 'flex',
    flexDirection: 'column',
  };

  const rowStyle: CSS.Properties = {
    display: 'flex',
  };

  return (
    <div className="canvas" style={canvasStyle}>
      {rows.map((row) => {
        return (
          <div className="row" style={rowStyle} key={uid(row)}>
            {row.map((square) => {
              return <Square pxHeight={squareSizePixels} pxWidth={squareSizePixels} key={uid(square)} />;
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Canvas;

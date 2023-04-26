import CSS from 'csstype';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';

interface Props {
  setColorCallback: Function;
  initColor: string;
}

export const colorSelectButtonStyle: CSS.Properties = {};

const ColorSelector = (props: Props): JSX.Element => {
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const [selectionActive, setSelectionActive] = useState(false);
  const [color, setColor] = useState(props.initColor);
  const [colorIndex, setColorIndex] = useState(colorScheme.findIndex((c) => c === color));

  const buttonStyle = { ...colorSelectButtonStyle };
  buttonStyle.backgroundColor = color;

  const toggleSelectionMenu = () => {
    setSelectionActive(!selectionActive);
  };

  const toggleColor = () => {
    let newIndex = (colorIndex + 1) % colorScheme.length;
    props.setColorCallback(colorScheme[newIndex]);
    setColor(colorScheme[newIndex]);
    setColorIndex(newIndex);
  };

  return (
    <div className="color-selector-wrapper">
      <div className="relative-parent">
        <div className="color-select-button" style={buttonStyle} onClick={toggleColor}></div>
      </div>
    </div>
  );
};

export default ColorSelector;

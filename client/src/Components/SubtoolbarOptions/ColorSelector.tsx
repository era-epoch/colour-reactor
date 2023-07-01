import CSS from 'csstype';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';

interface Props {
  setColorCallback: Function;
  initColor?: string;
}

export const colorSelectButtonStyle: CSS.Properties = {};

const ColorSelector = (props: Props): JSX.Element => {
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme.colors);
  const [colorIndex, setColorIndex] = useState(colorScheme.findIndex((c) => c === props.initColor));

  const buttonStyle = { ...colorSelectButtonStyle };
  buttonStyle.backgroundColor = props.initColor;

  const toggleColor = () => {
    let newIndex = (colorIndex + 1) % colorScheme.length;
    props.setColorCallback(colorScheme[newIndex]);
    setColorIndex(newIndex);
  };

  return (
    <div className="color-selector-wrapper subtoolbar-option-wrapper">
      <div className="relative-parent">
        <div className="color-select-button subtoolbar-button" style={buttonStyle} onClick={toggleColor}></div>
      </div>
    </div>
  );
};

export default ColorSelector;

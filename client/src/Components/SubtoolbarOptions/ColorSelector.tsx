import CSS from 'csstype';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { pushSubTooltip } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';

interface Props {
  setColorCallback: Function;
  initColor?: string;
}

export const colorSelectButtonStyle: CSS.Properties = {};

const ColorSelector = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme.colors);
  const [colorIndex, setColorIndex] = useState(colorScheme.findIndex((c) => c === props.initColor));
  const idRef = useRef(uuid());

  const buttonStyle = { ...colorSelectButtonStyle };
  buttonStyle.backgroundColor = props.initColor;

  const toggleColor = () => {
    let newIndex = (colorIndex + 1) % colorScheme.length;
    props.setColorCallback(colorScheme[newIndex]);
    setColorIndex(newIndex);
  };

  const handleMouseEnter = () => {
    dispatch(pushSubTooltip({ target: idRef.current, content: 'Primary Colour' }));
  };

  return (
    <div
      className="color-selector-wrapper subtoolbar-option-wrapper"
      id={idRef.current}
      onMouseEnter={handleMouseEnter}
    >
      <div className="relative-parent">
        <div className="color-select-button subtoolbar-button" style={buttonStyle} onClick={toggleColor}></div>
      </div>
    </div>
  );
};

export default ColorSelector;

import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
  selectionCallback: Function;
  initValue: number;
  minValue: number;
  maxValue: number;
  steps: number;
}

const SubtoolSlider = (props: Props): JSX.Element => {
  const proportion = (props.initValue - props.minValue) / (props.maxValue - props.minValue);
  const stageValue = (props.maxValue - props.minValue) / props.steps;

  const knobStyle = {
    '--knob-value': proportion,
  } as React.CSSProperties;

  const increaseProportion = () => {
    const newVal = Math.min(props.maxValue, props.initValue + stageValue);
    props.selectionCallback(newVal);
  };

  const decreaseProportion = () => {
    const newVal = Math.max(props.minValue, props.initValue - stageValue);
    props.selectionCallback(newVal);
  };

  return (
    <div className="subtool-slider-wrapper subtoolbar-option-wrapper">
      <div className="relative-parent">
        <div className="subtoolbar-button" onClick={increaseProportion}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div className="subtool-slider">
          <div className="knob" style={knobStyle}></div>
        </div>
        <div className="subtoolbar-button" onClick={decreaseProportion}>
          <FontAwesomeIcon icon={faMinus} />
        </div>
      </div>
    </div>
  );
};

export default SubtoolSlider;

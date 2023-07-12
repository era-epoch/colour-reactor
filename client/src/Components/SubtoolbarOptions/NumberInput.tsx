import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';

interface Props {
  labelIcon?: IconProp;
  labelIconStyle?: CSS.Properties;
  value: number;
  min: number;
  max: number;
  changeCallback: Function;
  units?: string;
}

const NumberInput = (props: Props): JSX.Element => {
  const [value, setValue] = useState(props.value);
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (parseInt(e.target.value) < props.min) {
      e.target.value = `${props.min}`;
    }
    if (parseInt(e.target.value) > props.max) {
      e.target.value = `${props.max}`;
    }
    setValue(parseInt(e.target.value));
    props.changeCallback(parseInt(e.target.value));
  };
  return (
    <div className="subtoolbar-option-wrapper number-input-wrapper">
      {props.labelIcon ? (
        <div className="subtoolbar-button">
          <div className="label-icon">
            <FontAwesomeIcon icon={props.labelIcon} style={props.labelIconStyle} />
          </div>
        </div>
      ) : null}
      <div className="input-container">
        <div className="input-with-text">
          <input type="number" value={value} onInput={handleInput}></input>
          <div className="units">{props.units}</div>
        </div>
      </div>
    </div>
  );
};

export default NumberInput;

import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ChangeEventHandler } from 'react';

interface Props {
  labelIcon?: IconProp;
  value: number;
  changeCallback: ChangeEventHandler;
}

const NumberInput = (props: Props): JSX.Element => {
  return (
    <div className="subtoolbar-option-wrapper number-input-wrapper">
      {props.labelIcon ? (
        <div className="label-icon">
          <FontAwesomeIcon icon={props.labelIcon} />
        </div>
      ) : null}
      <div className="input-container">
        <input type="number" value={props.value} onChange={props.changeCallback}></input>
      </div>
    </div>
  );
};

export default NumberInput;

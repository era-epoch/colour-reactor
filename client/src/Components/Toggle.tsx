import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faSquare } from '@fortawesome/free-regular-svg-icons';
import { faSquareCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import '../Styles/toggle.css';

interface Props {
  initState: boolean;
  activeIcon?: IconProp;
  inactiveIcon?: IconProp;
  label?: string;
  onChange: (val: boolean) => void;
}

const Toggle = (props: Props): JSX.Element => {
  const [active, setActive] = useState(props.initState);
  const handleClick = () => {
    const newVal = !active;
    setActive(newVal);
    props.onChange(newVal);
  };
  let icon: IconProp;
  if (active) {
    if (props.activeIcon) {
      icon = props.activeIcon;
    } else {
      icon = faSquareCheck;
    }
  } else {
    if (props.inactiveIcon) {
      icon = props.inactiveIcon;
    } else {
      icon = faSquare;
    }
  }
  return (
    <div className="toggle" onClick={handleClick}>
      <div className={`toggle-icon ${active ? 'toggle-active' : 'toggle-inactive'}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
      <div className="toggle-label">{props.label}</div>
    </div>
  );
};

export default Toggle;

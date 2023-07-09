import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  IconDefinition,
  faBan,
  faCircle,
  faEllipsisH,
  faEllipsisV,
  faIndustry,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faRotate,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../State/rootReducer';

export const AnimationIconMap = new Map<string, IconDefinition>([
  ['no-animation', faBan],
  ['rotate3d-y', faEllipsisH],
  ['rotate3d-x', faEllipsisV],
  ['tremble', faIndustry],
  ['scale-down', faMagnifyingGlassMinus],
  ['scale-up', faMagnifyingGlassPlus],
  ['spin', faRotate],
  ['circularize', faCircle],
]);

interface Props {
  selectionCallback: Function;
  initAnimation: string;
}

const AnimationSelector = (props: Props): JSX.Element => {
  const animations = useSelector((state: RootState) => state.app.animations);
  const [animation, setAnimation] = useState(props.initAnimation);
  const [index, setIndex] = useState(animations.findIndex((val: string) => val === animation));

  const toggleAnimation = () => {
    let newIndex = (index + 1) % animations.length;
    props.selectionCallback(animations[newIndex]);
    setAnimation(animations[newIndex]);
    setIndex(newIndex);
  };

  return (
    <div className="animation-selector-wrapper subtoolbar-option-wrapper">
      <div className="relative-parent">
        <div className="animation-select-button subtoolbar-button" onClick={toggleAnimation}>
          <FontAwesomeIcon icon={AnimationIconMap.get(animation) as IconProp} />
        </div>
      </div>
    </div>
  );
};

export default AnimationSelector;

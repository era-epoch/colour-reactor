import { IconProp } from '@fortawesome/fontawesome-svg-core';
import {
  IconDefinition,
  faArrowDown,
  faArrowLeft,
  faArrowRight,
  faArrowUp,
  faArrowsLeftRight,
  faUpDown,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Direction } from '../../types';

export const DirectionIconMap = new Map<Direction, IconDefinition>([
  [Direction.down, faArrowUp],
  [Direction.up, faArrowDown],
  [Direction.pingpong_v, faUpDown],
  [Direction.left, faArrowLeft],
  [Direction.right, faArrowRight],
  [Direction.pingpong_h, faArrowsLeftRight],
]);

interface Props {
  selectionCallback: Function;
  directionOptions: Direction[];
  initDirection: Direction;
}

const DirectionSelector = (props: Props): JSX.Element => {
  const directions = props.directionOptions;
  const [direction, setDirection] = useState(props.initDirection);
  const [index, setIndex] = useState(directions.findIndex((val: Direction) => val === direction));

  const toggle = () => {
    let newIndex = (index + 1) % directions.length;
    props.selectionCallback(directions[newIndex]);
    setDirection(directions[newIndex]);
    setIndex(newIndex);
  };
  return (
    <div className="direction-selector-wrapper subtoolbar-option-wrapper">
      <div className="relative-parent">
        <div className="direction-select-button subtoolbar-button" onClick={toggle}>
          <FontAwesomeIcon icon={DirectionIconMap.get(props.initDirection) as IconProp} />
        </div>
      </div>
    </div>
  );
};

export default DirectionSelector;

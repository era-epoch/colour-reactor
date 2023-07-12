import { faFire, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Color from 'colorjs.io';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPause, setTimeDelta, setTooltipState, unsetTooltip } from '../../../State/Slices/appSlice';
import { RootState } from '../../../State/rootReducer';
import { TooltipDirection } from '../../../types';
import NumberInput from '../../SubtoolbarOptions/NumberInput';

interface Props {
  widgetWrapperStyle: CSS.Properties;
}

const TimeWidget = (props: Props): JSX.Element => {
  const paused = useSelector((state: RootState) => state.app.paused);
  const timeDelta = useSelector((state: RootState) => state.app.timeDelta);
  const dispatch = useDispatch();

  const widgetWrapperStyle = { ...props.widgetWrapperStyle };

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (paused) {
    widgetStyle.backgroundColor = 'lightgray';
  }

  // Time input control
  const [cold, setCold] = useState(new Color('#1170ed'));
  const maxTimeDelta = 10000;
  const [hot, setHot] = useState(new Color('#bd1816'));
  const minTimeDelta = 10;
  const raw_proportion = (timeDelta - minTimeDelta) / (maxTimeDelta - minTimeDelta);
  const proportion = Math.sqrt(raw_proportion);

  let interpolate = hot.range(cold);

  const inputIconStyle: CSS.Properties = {
    color: interpolate(proportion).toString(),
  };

  const handleClick = () => {
    const pauseTarget = !paused;
    dispatch(setPause(pauseTarget));
  };

  const handleTimeDeltaChange = (newTime: number) => {
    dispatch(setTimeDelta(newTime));
  };

  const handleMouseEnter = () => {
    dispatch(
      setTooltipState({
        active: true,
        text: 'Time',
        direction: TooltipDirection.right,
        targetID: 'delta-time-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle} id="delta-time-widget">
      <div className="relative-parent">
        <div
          className="toolbar-widget"
          onClick={handleClick}
          style={widgetStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <FontAwesomeIcon icon={faHourglassStart} className={paused ? 'half-spin-up-once' : 'half-spin-down-once'} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container keep-subtoolbar-open">
            <NumberInput
              labelIcon={faFire}
              labelIconStyle={inputIconStyle}
              value={timeDelta}
              min={minTimeDelta}
              max={maxTimeDelta}
              changeCallback={handleTimeDeltaChange}
              units="ms"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeWidget;

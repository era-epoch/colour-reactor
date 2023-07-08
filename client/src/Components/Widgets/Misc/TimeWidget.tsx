import { faFire, faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { ChangeEvent } from 'react';
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

  // widgetWrapperStyle.color = widgetColor;
  // widgetWrapperStyle.borderColor = widgetColor;

  const widgetStyle: CSS.Properties = {
    backgroundColor: widgetWrapperStyle.backgroundColor,
    borderRadius: widgetWrapperStyle.borderRadius,
  };

  if (paused) {
    widgetStyle.backgroundColor = 'lightgray';
  }

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
        text: 'Speed',
        direction: TooltipDirection.right,
        targetID: 'delta-time-widget',
      }),
    );
  };

  const handleMouseLeave = () => {
    dispatch(unsetTooltip());
  };

  const handleDeltaTimeChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.value);
    console.log('test');
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
          <div className="subtoolbar-container">
            {/* <SubtoolSlider
              initValue={timeDelta}
              minValue={10}
              maxValue={2000}
              selectionCallback={handleTimeDeltaChange}
              steps={10}
            /> */}
            <NumberInput labelIcon={faFire} value={timeDelta} changeCallback={handleDeltaTimeChange} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeWidget;

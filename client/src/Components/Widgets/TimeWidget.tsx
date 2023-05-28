import { faHourglassStart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useDispatch, useSelector } from 'react-redux';
import { setPause, setTimeDelta } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import SubtoolSlider from '../SubtoolbarOptions/SubtoolSlider';

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

  return (
    <div className="widget-wrapper" style={widgetWrapperStyle}>
      <div className="relative-parent">
        <div className="toolbar-widget" onClick={handleClick} style={widgetStyle}>
          <FontAwesomeIcon icon={faHourglassStart} className={paused ? 'half-spin-up-once' : 'half-spin-down-once'} />
        </div>
        <div className="subtoolbar-wrapper">
          <div className="subtoolbar-container">
            <SubtoolSlider
              initValue={timeDelta}
              minValue={10}
              maxValue={2000}
              selectionCallback={handleTimeDeltaChange}
              steps={20}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeWidget;

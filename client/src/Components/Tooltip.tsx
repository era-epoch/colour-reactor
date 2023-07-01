import CSS from 'csstype';
import { useSelector } from 'react-redux';
import { RootState } from '../State/rootReducer';
import { defaultPopupStyle } from '../Styles/ComponentStyles';
import { TooltipDirection } from '../types';
import PopoutShape from './PopoutShape';

interface Props {}

const Tooltip = (props: Props): JSX.Element => {
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const tooltipState = useSelector((state: RootState) => state.app.tooltipState);
  const tooltipGapPixels = 10;
  const tooltipEnterTimeMS = 400;

  const target = document.getElementById(tooltipState.targetID);
  const targetRect = target?.getBoundingClientRect();

  const popupStyles: CSS.Properties[] = [];
  const containerStyle: CSS.Properties = {};
  const wrapperStyle: CSS.Properties = {};
  switch (tooltipState.direction) {
    case TooltipDirection.right:
      // Container
      containerStyle.height = `${targetRect?.height}px`;
      containerStyle.top = `${targetRect?.top}px`;
      containerStyle.left = `${targetRect?.right}px`;
      containerStyle.flexDirection = 'column';
      containerStyle.width = `${500}px`;

      // Content Wrapper
      wrapperStyle.zIndex = `${10}`;
      wrapperStyle.marginLeft = `${tooltipGapPixels}px`;
      wrapperStyle.flexDirection = 'column';
      wrapperStyle.width = 'fit-content';
      wrapperStyle.animationName = 'slideInLeft';
      wrapperStyle.animationTimingFunction = 'ease';
      wrapperStyle.animationDuration = `${tooltipEnterTimeMS}ms`;
      wrapperStyle.animationFillMode = 'forwards';

      // Popup Shapes
      for (let i = 0; i < colorScheme.length; i++) {
        const popup: CSS.Properties = { ...defaultPopupStyle };
        popup.width = `calc(100% - ${tooltipGapPixels}px)`;
        popup.backgroundColor = colorScheme[i];
        popup.top = `${0}`;
        popup.zIndex = `${-i}`;
        popup.animationName = 'tooltipShapeSlideIn';
        popup.animationTimingFunction = 'ease';
        popup.animationDuration = `${tooltipEnterTimeMS + 400 * i}ms`;
        popup.animationFillMode = 'forwards';
        popup.left = `calc(${tooltipGapPixels}px + ${5 * (i + 1)}px)`;
        popupStyles.push(popup);
      }
      break;
  }

  return (
    <div className={`tooltip-container ${tooltipState.active ? '' : 'nodisplay'}`} style={containerStyle}>
      <div className="tooltip-internal">
        <div className={`tooltip-wrapper`} style={wrapperStyle}>
          <div className="tooltip-body">{tooltipState.text}</div>
        </div>
        <div className="tooltip-popout-shapes">
          {colorScheme.map((color, i) => {
            return <PopoutShape style={popupStyles[i]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Tooltip;

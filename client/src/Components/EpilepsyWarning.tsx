import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { RootState } from '../State/rootReducer';
import { defaultPopupStyle } from '../Styles/ComponentStyles';
import PopoutShape from './PopoutShape';

interface Props {}

const EpilepsyWarning = (props: Props): JSX.Element => {
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const initShapePositionOffset = 12;
  const [shapePositionOffset, setShapePositionOffset] = useState(initShapePositionOffset);
  const [hidden, setHidden] = useState(false);
  const [hiding, setHiding] = useState(false);
  const fadeOutDuration = 2000;
  const buttonMouseEnter = () => {
    setShapePositionOffset(30);
  };
  const buttonMouseLeave = () => {
    setShapePositionOffset(initShapePositionOffset);
  };
  const accept = () => {
    setHiding(true);
    setTimeout(() => {
      setHidden(true);
    }, fadeOutDuration);
  };
  const buttonMouseDown = () => {
    setShapePositionOffset(25);
  };
  const buttonMouseUp = () => {
    setShapePositionOffset(100);
  };

  const lowerPopupStyles: CSS.Properties[] = [];
  const upperPopupStyles: CSS.Properties[] = [];
  for (let i = 0; i < colorScheme.length; i++) {
    const newLowerStyle: CSS.Properties = { ...defaultPopupStyle };
    newLowerStyle.backgroundColor = colorScheme[i];
    newLowerStyle.left = `${(i + 1) * shapePositionOffset}px`;
    newLowerStyle.top = `${(i + 1) * shapePositionOffset}px`;
    newLowerStyle.zIndex = `-${i + 1}`;
    newLowerStyle.opacity = `${1 - 0.05 * (i * (i / 2) + 1)}`;
    newLowerStyle.transitionDuration = `${(i + 1) * 100}ms`;
    lowerPopupStyles.push(newLowerStyle);

    const newUpperStyle: CSS.Properties = { ...defaultPopupStyle };
    newUpperStyle.backgroundColor = colorScheme[i];
    newUpperStyle.left = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperStyle.top = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperStyle.zIndex = `-${i + 1}`;
    newUpperStyle.opacity = `${1 - 0.05 * (i * (i / 2) + 1)}`;
    newUpperStyle.transitionDuration = `${(i + 1) * 100}ms`;
    upperPopupStyles.push(newUpperStyle);
  }

  const siteTitle: string = 'COLOUR REACTOR';
  const siteTitleArray = [];
  for (const c of siteTitle) {
    siteTitleArray.push(c);
  }

  return (
    <div
      className={`EpilepsyWarning dialogue ${hiding ? 'fade-out' : ''} ${hidden ? 'nodisplay' : ''}`}
      style={{ '--fade-duration': `${fadeOutDuration}ms` } as React.CSSProperties}
    >
      <div className="dialogue-internal">
        <div className="dialogue-content">
          <div className="landing-title">
            {siteTitleArray.map((c, i) => {
              return (
                <div className="site-title-char" key={uuid()} style={{ color: colorScheme[i % colorScheme.length] }}>
                  {c}
                </div>
              );
            })}
          </div>
          <div className="warning-title">WARNING: PHOTOSENSITIVITY/EPILEPSY SEIZURES</div>
          <div className="warning-blurb">
            This tool can create rapidly flashing and/or <b>strobing bright colours</b>, especially when the application
            speed is set to high. If you have an epileptic condition or suffer from seizures, please use caution as it
            may not be safe for you to use this tool.
          </div>
          <div className="warning-controls">
            <div className="warning-dont-show-again"></div>
            <div
              className="warning-accept ui-button round"
              onClick={accept}
              onMouseEnter={buttonMouseEnter}
              onMouseLeave={buttonMouseLeave}
              onMouseDown={buttonMouseDown}
              onMouseUp={buttonMouseUp}
            >
              <FontAwesomeIcon icon={faCheck} />
              {/* Continue */}
            </div>
          </div>
        </div>
        <div className="dialogue-popout-shapes">
          {colorScheme.map((color, i) => {
            return <PopoutShape style={upperPopupStyles[i]} />;
          })}
          {colorScheme.map((color, i) => {
            return <PopoutShape style={lowerPopupStyles[i]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default EpilepsyWarning;

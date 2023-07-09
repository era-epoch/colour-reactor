import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import uuid from 'react-uuid';
import { setActiveDialogue, setColorScheme } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import { defaultPopupStyle } from '../../Styles/ComponentStyles';
import { ColorScheme, Dialogue } from '../../types';
import PopoutShape from '../PopoutShape';
import Toggle from '../Toggle';

interface Props {}

const EpilepsyWarning = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const allColorSchemes = useSelector((state: RootState) => state.app.availableColorSchemes);
  const activeDialogue = useSelector((state: RootState) => state.app.activeDialogue);
  let shown = activeDialogue === Dialogue.epilepsyWarning;
  const checkedLocalStorage = useRef(false);
  if (!checkedLocalStorage.current && localStorage.getItem('dont_show_warning') === 'true') {
    shown = false;
    checkedLocalStorage.current = true;
  }

  const initShapePositionOffset = 12;
  const fadeOutDuration = 2000;

  const [shapePositionOffset, setShapePositionOffset] = useState(initShapePositionOffset);
  const [popupJostle, setPopupJostle] = useState(false);
  const [hiding, setHiding] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setPopupJostle(false);
    }, 410);
  }, [popupJostle]);

  const buttonMouseEnter = () => {
    setShapePositionOffset(30);
  };
  const buttonMouseLeave = () => {
    if (!hiding) {
      setShapePositionOffset(initShapePositionOffset);
    }
  };
  const accept = () => {
    setHiding(true);
    setTimeout(() => {
      dispatch(setActiveDialogue(Dialogue.none));
    }, fadeOutDuration);
  };
  const buttonMouseDown = () => {
    setShapePositionOffset(5);
  };
  const buttonMouseUp = () => {
    setShapePositionOffset(100);
  };

  const lowerPopupStyles: any[] = [];
  const upperPopupStyles: any[] = [];
  for (let i = 0; i < colorScheme.colors.length; i++) {
    const newLowerStyle: any = { ...defaultPopupStyle };
    newLowerStyle.backgroundColor = colorScheme.colors[i];
    newLowerStyle.left = `${(i + 1) * shapePositionOffset}px`;
    newLowerStyle.top = `${(i + 1) * shapePositionOffset}px`;
    newLowerStyle.zIndex = `-${i + 1}`;
    newLowerStyle.opacity = `${1 - 0.05 * (i + 1)}`;
    newLowerStyle.transitionDuration = `${(i + 1) * 100}ms`;
    newLowerStyle['--fly-in-origin'] = `100vw`;
    newLowerStyle['--fly-in-delay'] = `${200 + i * (i / 4) * 150}ms`;
    lowerPopupStyles.push(newLowerStyle);

    const newUpperStyle: any = { ...defaultPopupStyle };
    newUpperStyle.backgroundColor = colorScheme.colors[i];
    newUpperStyle.left = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperStyle.top = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperStyle.zIndex = `-${i + 1}`;
    newUpperStyle.opacity = `${1 - 0.05 * (i + 1)}`;
    newUpperStyle.transitionDuration = `${(i + 1) * 100}ms`;
    newUpperStyle['--fly-in-origin'] = `-100vw`;
    newUpperStyle['--fly-in-delay'] = `${350 + i * (i / 4) * 150}ms`;
    upperPopupStyles.push(newUpperStyle);
  }

  const siteTitle: string = 'COLOUR REACTOR';
  const siteTitleArray = [];
  for (const c of siteTitle) {
    siteTitleArray.push(c);
  }

  const handleColorSchemeSelectChange = (selectedValue: ColorScheme | null) => {
    if (selectedValue) {
      dispatch(setColorScheme(selectedValue));
      setPopupJostle(true);
    }
  };

  const handleDontShowToggle = (val: boolean) => {
    console.log(val);
    localStorage.setItem('dont_show_warning', `${val}`);
  };

  return (
    <div
      className={`EpilepsyWarning dialogue ${hiding ? 'fade-out' : ''} ${shown ? '' : 'nodisplay'}`}
      style={{ '--fade-duration': `${fadeOutDuration}ms` } as React.CSSProperties}
    >
      <div className="dialogue-internal">
        <div className="dialogue-content">
          <div className="landing-title">
            {siteTitleArray.map((c, i) => {
              return (
                <div
                  className="site-title-char"
                  key={uuid()}
                  style={{ color: colorScheme.colors[i % colorScheme.colors.length] }}
                >
                  {c}
                </div>
              );
            })}
          </div>
          <div className="tagline">A tool for playing with colour, created by Era.</div>
          <div className="dialogue-subtitle">To get started, select a colour palette ...</div>
          <div className="dialogue-section">
            <Select
              options={allColorSchemes}
              getOptionLabel={(scheme: ColorScheme) => scheme.name}
              getOptionValue={(scheme: ColorScheme) => scheme.id}
              onChange={handleColorSchemeSelectChange}
            />
          </div>
          <div className="warning-title">WARNING: PHOTOSENSITIVITY/EPILEPSY SEIZURES</div>
          <div className="warning-blurb">
            This tool can create rapidly flashing and/or <b>strobing bright colours</b>, especially when the application
            speed is set to high. If you have an epileptic condition or suffer from seizures, please use caution as it
            may not be safe for you to use this tool.
          </div>
          <div className="warning-dont-show-again">
            <Toggle initState={false} onChange={handleDontShowToggle} label={`Don't show this again`} />
          </div>
          <div className="warning-controls">
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
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={upperPopupStyles[i]} jostle={popupJostle} />;
          })}
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={lowerPopupStyles[i]} jostle={popupJostle} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default EpilepsyWarning;

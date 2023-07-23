import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
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

  let mobile = false;
  if (window.innerWidth < 1000) {
    mobile = true;
  }

  const initShapePositionOffset = 12;
  const fadeOutDuration = 2000;
  const borderRadii = [20, 0, 100, 5, 200];

  const [shapePositionOffset, setShapePositionOffset] = useState(initShapePositionOffset);
  const [popupJostle, setPopupJostle] = useState(false);
  const [hiding, setHiding] = useState(false);
  const [radiusIndex, setRadiusIndex] = useState(1);
  const lastRadius = useRef(1);

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

  const lowerRightPopupStyles: any[] = [];
  const lowerLeftPopupStyles: any[] = [];
  const upperLeftPopupStyles: any[] = [];
  const upperRightPopupStyles: any[] = [];
  for (let i = 0; i < colorScheme.colors.length; i++) {
    let baseOpacity = 0.9;
    const newLowerStyle: any = { ...defaultPopupStyle };
    newLowerStyle.backgroundColor = colorScheme.colors[i];
    newLowerStyle.left = `${(i + 1) * shapePositionOffset}px`;
    newLowerStyle.top = `${(i + 1) * shapePositionOffset}px`;
    newLowerStyle.zIndex = `-${2 * (i + 1)}`;
    newLowerStyle.opacity = `${baseOpacity - 0.05 * (i + 1)}`;
    newLowerStyle.transitionDuration = `${(i + 1) * 100}ms`;
    newLowerStyle['--fly-in-origin'] = `100vw`;
    newLowerStyle['--fly-in-delay'] = `${200 + i * (i / 4) * 150}ms`;
    lowerRightPopupStyles.push(newLowerStyle);

    const newLowerLeftStyle: any = { ...defaultPopupStyle };
    newLowerLeftStyle.backgroundColor = colorScheme.colors[colorScheme.colors.length - 1 - i];
    newLowerLeftStyle.left = `${-1 * (i + 1) * shapePositionOffset}px`;
    newLowerLeftStyle.top = `${(i + 1) * shapePositionOffset}px`;
    newLowerLeftStyle.zIndex = `-${2 * (i + 1) + 1}`;
    newLowerLeftStyle.opacity = `${baseOpacity - 0.05 * (i + 1)}`;
    newLowerLeftStyle.transitionDuration = `${(i + 1) * 100}ms`;
    newLowerLeftStyle['--fly-in-origin'] = `100vw`;
    newLowerLeftStyle['--fly-in-delay'] = `${200 + i * (i / 4) * 150}ms`;
    lowerLeftPopupStyles.push(newLowerLeftStyle);

    const newUpperStyle: any = { ...defaultPopupStyle };
    newUpperStyle.backgroundColor = colorScheme.colors[i];
    newUpperStyle.left = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperStyle.top = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperStyle.zIndex = `-${2 * (i + 1)}`;
    newUpperStyle.opacity = `${baseOpacity - 0.05 * (i + 1)}`;
    newUpperStyle.transitionDuration = `${(i + 1) * 100}ms`;
    newUpperStyle['--fly-in-origin'] = `-100vw`;
    newUpperStyle['--fly-in-delay'] = `${350 + i * (i / 4) * 150}ms`;
    upperLeftPopupStyles.push(newUpperStyle);

    const newUpperRightStyle: any = { ...defaultPopupStyle };
    newUpperRightStyle.backgroundColor = colorScheme.colors[colorScheme.colors.length - 1 - i];
    newUpperRightStyle.left = `${(i + 1) * shapePositionOffset}px`;
    newUpperRightStyle.top = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperRightStyle.zIndex = `-${2 * (i + 1) + 1}`;
    newUpperRightStyle.opacity = `${baseOpacity - 0.05 * (i + 1)}`;
    newUpperRightStyle.transitionDuration = `${(i + 1) * 100}ms`;
    newUpperRightStyle['--fly-in-origin'] = `-100vw`;
    newUpperRightStyle['--fly-in-delay'] = `${350 + i * (i / 4) * 150}ms`;
    upperRightPopupStyles.push(newUpperRightStyle);
  }

  const internalStyle: CSS.Properties = {
    borderRadius: `${borderRadii[radiusIndex]}px`,
  };

  const siteTitleArray1 = [];
  for (const c of 'COLOUR') {
    siteTitleArray1.push(c);
  }

  const siteTitleArray2 = [];
  for (const c of 'REACTOR') {
    siteTitleArray2.push(c);
  }

  const handleColorSchemeSelectChange = (selectedValue: ColorScheme | null) => {
    if (selectedValue) {
      dispatch(setColorScheme(selectedValue));
      setPopupJostle(true);
      let newRadius = lastRadius.current;
      while (newRadius === lastRadius.current) {
        newRadius = Math.floor(Math.random() * borderRadii.length);
      }
      setRadiusIndex(newRadius);
      lastRadius.current = newRadius;
    }
  };

  const handleDontShowToggle = (val: boolean) => {
    localStorage.setItem('dont_show_warning', `${val}`);
  };

  return (
    <div
      className={`EpilepsyWarning dialogue ${hiding ? 'fade-out' : ''} ${shown ? '' : 'nodisplay'}`}
      id={'intro-dialogue'}
      style={{ '--fade-duration': `${fadeOutDuration}ms` } as React.CSSProperties}
      // onMouseOver={handleMouseOver}
    >
      <div className="dialogue-internal" style={internalStyle}>
        <div className="dialogue-content" id="intro-dialogue-content">
          <div className="landing-title">
            <div>
              {siteTitleArray1.map((c, i) => {
                return (
                  <span
                    className="site-title-char"
                    key={uuid()}
                    style={{ color: colorScheme.colors[i % colorScheme.colors.length] }}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
            <div>
              {siteTitleArray2.map((c, i) => {
                return (
                  <span
                    className="site-title-char"
                    key={uuid()}
                    style={{
                      color:
                        colorScheme.colors[
                          (((colorScheme.colors.length - 1 - i) % colorScheme.colors.length) +
                            colorScheme.colors.length) %
                            colorScheme.colors.length
                        ],
                    }}
                  >
                    {c}
                  </span>
                );
              })}
            </div>
          </div>
          <div className="tagline">A tool for playing with colour.</div>
          {mobile ? (
            <div className="dialogue-secttion">
              Hello! It looks like you're accessing ColourReactor on a mobile device. Just a heads-up: this tool is
              currently only designed for <b>desktop use</b>, so some things might not work properly here!
            </div>
          ) : null}
          <div className="dialogue-subtitle">To get started, select a colour palette ...</div>
          <div className="dialogue-section">
            <Select
              options={allColorSchemes}
              getOptionLabel={(scheme: ColorScheme) => scheme.name}
              getOptionValue={(scheme: ColorScheme) => scheme.id}
              onChange={handleColorSchemeSelectChange}
            />
          </div>
          <div className="warning-title">WARNING: PHOTOSENSITIVITY / EPILEPSY SEIZURES</div>
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
            </div>
          </div>
        </div>
        <div className="dialogue-popout-shapes">
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={upperLeftPopupStyles[i]} jostle={popupJostle} />;
          })}
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={upperRightPopupStyles[i]} jostle={popupJostle} />;
          })}
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={lowerLeftPopupStyles[i]} jostle={popupJostle} />;
          })}
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={lowerRightPopupStyles[i]} jostle={popupJostle} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default EpilepsyWarning;

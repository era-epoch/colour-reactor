import { faSave, faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { pushAlert, setActiveDialogue } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import { defaultPopupStyle } from '../../Styles/ComponentStyles';
import { AlertStyle, Dialogue, Pattern } from '../../types';
import PopoutShape from '../PopoutShape';

interface Props {}

const SavePatternDialogue = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const activeDialogue = useSelector((state: RootState) => state.app.activeDialogue);
  const boardState = useSelector((state: RootState) => state.board);
  let shown = activeDialogue === Dialogue.savePattern;

  // This should be done somewhere else:
  const checkedLocalStorage = useRef(false);
  if (!checkedLocalStorage.current) {
    if (localStorage.getItem('saved_patterns') === null) {
      localStorage.setItem('saved_patterns', JSON.stringify([]));
    }
    checkedLocalStorage.current = true;
  }

  const initShapePositionOffset = 12;
  const fadeOutDuration = 2000;

  const [shapePositionOffset, setShapePositionOffset] = useState(initShapePositionOffset);
  const [hiding, setHiding] = useState(false);
  const [patternName, setPatternName] = useState('');

  const leftPopupStyles: CSS.Properties[] = [];
  const rightPopupStyles: CSS.Properties[] = [];
  for (let i = 0; i < colorScheme.colors.length; i++) {
    const newLowerStyle: CSS.Properties = { ...defaultPopupStyle };
    newLowerStyle.backgroundColor = colorScheme.colors[i];
    newLowerStyle.left = `${(i + 1) * shapePositionOffset}px`;
    newLowerStyle.top = `0`;
    newLowerStyle.zIndex = `-${i + 1}`;
    newLowerStyle.opacity = `${1 - 0.05 * (i * (i / 2) + 1)}`;
    newLowerStyle.transitionDuration = `${(i + 1) * 100}ms`;
    leftPopupStyles.push(newLowerStyle);

    const newUpperStyle: CSS.Properties = { ...defaultPopupStyle };
    newUpperStyle.backgroundColor = colorScheme.colors[i];
    newUpperStyle.left = `${-1 * (i + 1) * shapePositionOffset}px`;
    newUpperStyle.top = `0`;
    newUpperStyle.zIndex = `-${i + 1}`;
    newUpperStyle.opacity = `${1 - 0.05 * (i * (i / 2) + 1)}`;
    newUpperStyle.transitionDuration = `${(i + 1) * 100}ms`;
    rightPopupStyles.push(newUpperStyle);
  }

  const closeButtonOnClick = () => {
    setHiding(true);
    setTimeout(() => {
      dispatch(setActiveDialogue(Dialogue.none));
      setHiding(false);
      setShapePositionOffset(initShapePositionOffset);
    }, fadeOutDuration);
  };
  const onMouseEnter = () => {
    setShapePositionOffset(30);
  };
  const onMouseLeave = () => {
    if (!hiding) setShapePositionOffset(initShapePositionOffset);
  };
  const closeButtonOnMouseDown = () => {
    setShapePositionOffset(5);
  };
  const closeButtonOnMouseUp = () => {
    setShapePositionOffset(100);
  };

  const SavePatternOnClick = () => {
    if (patternName === '') {
      dispatch(
        pushAlert({
          id: uuid(),
          content: 'Please enter a name for this pattern',
          style: AlertStyle.error,
        }),
      );
      return;
    }
    const patterns = JSON.parse(localStorage.getItem('saved_patterns') as string) as Pattern[];
    const new_pattern: Pattern = {
      id: uuid(),
      board: boardState,
      name: patternName,
      time_created: Date.now(),
    };
    patterns.push(new_pattern);
    localStorage.setItem('saved_patterns', JSON.stringify(patterns));
    dispatch(pushAlert({ id: uuid(), content: `Pattern "${patternName}" saved!`, style: AlertStyle.success }));
  };

  return (
    <div
      className={`save-pattern-dialogeue dialogue ${hiding ? 'fade-out' : ''} ${shown ? '' : 'nodisplay'}`}
      style={{ '--fade-duration': `${fadeOutDuration}ms` } as React.CSSProperties}
    >
      <div className="dialogue-internal">
        <div className="dialogue-content">
          <div className="dialogue-subtitle">Save Pattern to Local Storage</div>
          <div className="dialogue-section">
            <div className="save-pattern">
              <input
                type="text"
                placeholder="Pattern Name"
                value={patternName}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => setPatternName(e.target.value)}
              ></input>
              <div
                className="save-button"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onClick={SavePatternOnClick}
              >
                <FontAwesomeIcon icon={faSave} />
              </div>
            </div>
          </div>
          <div className="dialogue-subtitle">Download Pattern JSON</div>
          <div className="dialoge-section">
            <i>Under Construction</i>
          </div>
          <div className="dialogue-subtitle">Generate Pattern URL</div>
          <div className="dialoge-section">
            <i>Under Construction</i>
          </div>
          <div className="dialogue-controls">
            <div
              className="dialogue-close ui-button round"
              onClick={closeButtonOnClick}
              onMouseEnter={onMouseEnter}
              onMouseLeave={onMouseLeave}
              onMouseDown={closeButtonOnMouseDown}
              onMouseUp={closeButtonOnMouseUp}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>
          </div>
        </div>
        <div className="dialogue-popout-shapes">
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={leftPopupStyles[i]} />;
          })}
          {colorScheme.colors.map((color, i) => {
            return <PopoutShape style={rightPopupStyles[i]} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default SavePatternDialogue;

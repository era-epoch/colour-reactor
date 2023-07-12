import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDialogue } from '../../State/Slices/appSlice';
import { RootState } from '../../State/rootReducer';
import { defaultPopupStyle } from '../../Styles/ComponentStyles';
import { Dialogue } from '../../types';
import PopoutShape from '../PopoutShape';

interface Props {}

const SavePatternDialogue = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const colorScheme = useSelector((state: RootState) => state.app.colorScheme);
  const activeDialogue = useSelector((state: RootState) => state.app.activeDialogue);
  let shown = activeDialogue === Dialogue.savePattern;

  const initShapePositionOffset = 12;
  const fadeOutDuration = 2000;

  const [shapePositionOffset, setShapePositionOffset] = useState(initShapePositionOffset);
  const [hiding, setHiding] = useState(false);

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

  return (
    <div
      className={`save-pattern-dialogeue dialogue ${hiding ? 'fade-out' : ''} ${shown ? '' : 'nodisplay'}`}
      style={{ '--fade-duration': `${fadeOutDuration}ms` } as React.CSSProperties}
    >
      <div className="dialogue-internal">
        <div className="dialogue-content">
          <div className="dialogue-subtitle">Save Pattern</div>
          <div className="dialogue-subtitle"></div>
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

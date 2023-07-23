import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CSS from 'csstype';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import uuid from 'react-uuid';
import { deleteAlert } from '../State/Slices/appSlice';
import { RootState } from '../State/rootReducer';
import { defaultAlertStyle } from '../Styles/ComponentStyles';
import '../Styles/alerts.css';
import { Alert } from '../types';

interface Props {}

type AlertRecord = {
  id: string;
  index: number;
  active: boolean;
  anim: string;
};

const AlertRecords = new Map<string, AlertRecord>();

const AlertElement = (props: Props): JSX.Element => {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.app.alerts);
  const [renderFlag, setRender] = useState('');
  const alertActiveDuration = 10000; // ms
  const alertLifeDuration = 11000; // ms
  const alertTransitionDuration = 500; // ms

  const alertStyles: CSS.Properties[] = [];

  for (let i = 0; i < alerts.length; i++) {
    const alert = alerts[i];
    const alertStyle = { ...defaultAlertStyle } as any;
    alertStyle.zIndex = `${200 + i}`;

    if (AlertRecords.get(alert.id) === undefined) {
      console.log('New Alert!');
      AlertRecords.set(alert.id, {
        id: alert.id,
        active: true,
        anim: `alertIn ${alertTransitionDuration}ms ease forwards`,
        index: i,
      });

      setTimeout(() => {
        console.log('Setting still');
        AlertRecords.set(alert.id, {
          id: alert.id,
          active: true,
          anim: ``,
          index: i,
        });
        setRender(uuid());
      }, alertTransitionDuration);

      setTimeout(() => {
        console.log('Setting inactive');
        AlertRecords.set(alert.id, {
          id: alert.id,
          active: false,
          anim: `alertOut ${alertTransitionDuration}ms ease forwards`,
          index: i,
        });
        setRender(uuid());
      }, alertActiveDuration);

      setTimeout(() => {
        console.log('killing');
        dispatch(deleteAlert(alert.id));
      }, alertLifeDuration);
    }

    const record = AlertRecords.get(alert.id) as AlertRecord;
    alertStyle.animation = record.anim;

    alertStyles.push(alertStyle);
  }

  const alertClickClose = (i: string) => {
    dispatch(deleteAlert(i));
  };

  return (
    <div className={`alert-wrapper`}>
      <div className="alert-container">
        {alerts.map((a: Alert, i) => {
          return (
            <div key={uuid()} className="alert" style={alertStyles[i] as CSS.Properties}>
              <div className="alert-content" dangerouslySetInnerHTML={{ __html: a.content }}></div>
              <div className="alert-control">
                <div className="ui-button round" onClick={() => alertClickClose(a.id)}>
                  <FontAwesomeIcon icon={faXmark} />
                  {/* Continue */}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AlertElement;

import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import { update } from '../State/Slices/boardSlice';
import { RootState } from '../State/rootReducer';

const Updater = (): JSX.Element => {
  const timeDelta = useSelector((state: RootState) => state.app.timeDelta);
  const paused = useSelector((state: RootState) => state.app.paused);
  const dispatch = useDispatch();

  useInterval(() => {
    if (!paused) dispatch(update());
  }, timeDelta);

  return <div className="updater"></div>;
};

export default Updater;

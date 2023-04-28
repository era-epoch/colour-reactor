import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import { update } from '../State/Slices/boardSlice';
import { RootState } from '../State/rootReducer';

const Updater = (): JSX.Element => {
  const timeDelta = useSelector((state: RootState) => state.app.timeDelta);
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch(update());
  }, timeDelta);

  return <div className="updater"></div>;
};

export default Updater;

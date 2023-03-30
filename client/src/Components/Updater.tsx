import { useDispatch, useSelector } from 'react-redux';
import { useInterval } from 'usehooks-ts';
import { RootState } from '../State/rootReducer';
import { update } from '../State/Slices/boardSlice';

const Updater = (): JSX.Element => {
  const timeDelta = useSelector((state: RootState) => state.board.timeDelta);
  const dispatch = useDispatch();

  useInterval(() => {
    dispatch(update());
  }, timeDelta);

  return <div className="updater"></div>;
};

export default Updater;

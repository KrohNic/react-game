import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRecords, setVolume, showLoadPrompt } from "../../redux/actions";
import { useBeforeunload } from 'react-beforeunload';
import { SAVE_LS_NAME } from "../../constants";

const PREV_GAMES = 'PREV_GAMES';
const VOLUME = 'VOLUME';

const Storage = () => {
  const dispatch = useDispatch();
  const isGameEnded = useSelector(state => state.endWindow.isGameEnded);
  const isWin = useSelector(state => state.endWindow.isWin);
  const records = useSelector(state => state.endWindow.records);
  const volume = useSelector(state => state.endWindow.volume);
  const isGameStarted = useSelector(state => state.board.isGameStarted);
  const time = useSelector(state => state.board.time);
  const width = useSelector(state => state.board.width);
  const height = useSelector(state => state.board.height);
  const bombs = useSelector(state => state.board.bombs);
  const bombsLeft = useSelector(state => state.board.bombsLeft);
  const cells = useSelector(state => state.board.cells);
  const bombPerCell = useSelector(state => state.board.bombPerCell);

  useEffect(() => {
    if (!isGameEnded) return;

    const newRecord = {
      time, 
      isWin,
      size: `${width}x${height}`, 
      difficulty: bombPerCell,
      date: Date.now()
    }
    let newRecordsList = [newRecord, ...records];

    if (newRecordsList.length > 10) {
      newRecordsList = newRecordsList.slice(0, 10);
    }

    localStorage.setItem(PREV_GAMES, JSON.stringify(newRecordsList))
    dispatch(setRecords(newRecordsList));
  }, [isGameEnded, dispatch])

  useEffect(() => {
    const prevRecords = localStorage.getItem(PREV_GAMES);

    if (!prevRecords) return;

    const recordsList = JSON.parse(prevRecords);

    dispatch(setRecords(recordsList));
  }, [dispatch])

  useEffect(() => {
    const save = localStorage.getItem(SAVE_LS_NAME);

    if (save) {
      dispatch(showLoadPrompt(true));
    }

    const volume = localStorage.getItem(VOLUME);

    if (volume) {
      dispatch(setVolume(Number(volume)))
    }
  }, [dispatch])

  useBeforeunload(() => {
    if (isGameEnded || !isGameStarted) return;

    const state = {width, height, cells, bombPerCell, bombs, bombsLeft, time}

    localStorage.setItem(SAVE_LS_NAME, JSON.stringify(state))
    localStorage.setItem(VOLUME, volume)
  });

  return null;
}

export default Storage;
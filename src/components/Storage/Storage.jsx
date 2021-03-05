import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRecords, setVolume, showLoadPrompt } from "../../redux/actions";
import { useBeforeunload } from 'react-beforeunload';
import { SAVE, VOLUME } from "../../constants/storageKeys";

const PREV_GAMES = 'PREV_GAMES';

const Storage = () => {
  const dispatch = useDispatch();
  const { isGameEnded, isWin, records, volume } = useSelector(state => state.app);
  const {
    isGameStarted,
    time,
    bombs,
    bombsLeft,
    cells,
    bombPerCell,
    boardSizes
  } = useSelector(state => state.game);

  useEffect(() => {
    if (!isGameEnded) return;

    const {width, height} = boardSizes;
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
    const save = localStorage.getItem(SAVE);

    if (save) {
      dispatch(showLoadPrompt(true));
    }

    const savedVolume = localStorage.getItem(VOLUME);

    if (savedVolume) {
      dispatch(setVolume(Number(savedVolume)))
    }
  }, [dispatch])

  useBeforeunload(() => {
    localStorage.setItem(VOLUME, volume)

    if (isGameEnded || !isGameStarted) return;

    const state = {boardSizes, cells, bombPerCell, bombs, bombsLeft, time}

    localStorage.setItem(SAVE, JSON.stringify(state))
  });

  return null;
}

export default Storage;
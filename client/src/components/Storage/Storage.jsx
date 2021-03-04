import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRecords, setVolume, showLoadPrompt } from "../../redux/actions";
import { useBeforeunload } from 'react-beforeunload';
import { SAVE_LS_NAME, VOLUME_LS_NAME } from "../../constants";

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
    bombPerCell
  } = useSelector(state => state.game.isGameStarted);
  const {width, height} = useSelector(state => state.game.boardSizes);

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

    const savedVolume = localStorage.getItem(VOLUME_LS_NAME);

    if (savedVolume) {
      dispatch(setVolume(Number(savedVolume)))
    }
  }, [dispatch])

  useBeforeunload(() => {
    localStorage.setItem(VOLUME_LS_NAME, volume)

    if (isGameEnded || !isGameStarted) return;

    const state = {width, height, cells, bombPerCell, bombs, bombsLeft, time}

    localStorage.setItem(SAVE_LS_NAME, JSON.stringify(state))
  });

  return null;
}

export default Storage;
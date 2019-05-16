export const START_FETCH_DATA = 'START_FETCH_DATA';
export const STOP_FETCH_DATA = 'STOP_FETCH_DATA';

export const START_INTERACTION = 'START_INTERACTION';
export const STOP_INTERACTION = 'STOP_INTERACTION';

export function startFetchData() {
  return {
    type: START_FETCH_DATA,
  };
}

export function stopFetchData() {
  return {
    type: STOP_FETCH_DATA,
  };
}

export function startInteraction(message) {
  return {
    type: START_INTERACTION,
    payload: message,
  };
}

export function stopInteraction() {
  return {
    type: STOP_INTERACTION,
  };
}

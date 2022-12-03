const Ship = (length) => {
  const getLength = () => length;
  let timesHit = 0;

  const hit = () => {
    timesHit++;
  };

  const isSunk = () => {
    if (timesHit >= getLength()) {
      return true;
    }
    return false;
  };

  const getTimesHit = () => timesHit;

  return { hit, isSunk, getTimesHit };
};

export { Ship };

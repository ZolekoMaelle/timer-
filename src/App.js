import React, { useState, useEffect, useReducer } from 'react';

export function ButtonDemo() {
  return <button>Button</button>
}

function Countdown() {
  const [counter, setCounter] = useState(60);
  const [waitTime, setWaitTime] = useState(0);
  const [buttonClicks, setButtonClicks] = useReducer(
    (state, action) => {
      switch (action.type) {
        case 'plus5':
          return { ...state, plus5: state.plus5 + 1 };
        case 'plus1':
          return { ...state, plus1: state.plus1 + 1 };
        case 'reset':
          return { ...state, reset: state.reset + 1 };
        default:
          throw new Error();
      }
    },
    { plus5: 0, plus1: 0, reset: 0 }
  );

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleButtonClick = (increment) => {
    setCounter(counter + increment);
    setWaitTime(waitTime + increment);
    setButtonClicks({
      type: increment === 5 ? 'plus5' : increment === 1 ? 'plus1' : 'reset',
    });
  };

  return (
    <div>
      <div>Countdown: {counter}</div>
      {counter > 0 && (
        <>
          <button onClick={() => handleButtonClick(5)}>+5</button>
          <button onClick={() => handleButtonClick(1)}>+1</button>
          <button onClick={() => handleButtonClick(60 - counter)}>Reset</button>
        </>
      )}
      {counter === 0 && (
        <>
          <div>Plus 5 button was clicked {buttonClicks.plus5} times</div>
          <div>Plus 1 button was clicked {buttonClicks.plus1} times</div>
          <div>Reset button was clicked {buttonClicks.reset} times</div>
          <div>Total wait time: {waitTime} seconds</div>
        </>
      )}
    </div>
  );
}

export default Countdown;
// console.log('Hello from space 🚀')

const app = {
  //~ VARIABLES
  defaultTimer: {
    minutes: 30,
    seconds: 0,
  },

  //* buttons
  targetStartBtn: document.querySelector('container__button--start'),
  targetResetBtn: document.querySelector('container__button--reset'),
  targetMinutesElement: document.querySelector('current-timer__minutes'),
  targetSecondsElement: document.querySelector('current-timer__seconds'),

  //~ INIT
  init: () => {
    console.log('Hello from space 🚀');
  },

  //~ METHODS
  handleListeners: () => {},
  handleBtnStartTimer: () => {},
  handleBtnResetTimer: () => {},
  handleBtnBreakAction: () => {},
  handleCurrentTimeBtnMore: () => {},
  handleCurrentTimeBtnLess: () => {},
  handleDefinerTimeBtnMore: () => {},
  handleDefinerTimeBtnLess: () => {},
};

app.init();

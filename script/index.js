// console.log('Hello from space 🚀')

const app = {
  //~ VARIABLES
  //* default
  defaultCurrentTimer: {
    minutes: 30,
    seconds: 00,
  },
  defaultDefinedTimer: {
    minutes: 05,
    seconds: 00,
  },
  defaultCurrentSession: ['WORK'],

  //* buttons
  targetStartBtn: document.querySelector('container__button--start'),
  targetResetBtn: document.querySelector('container__button--reset'),
  targetCurrentMoreBtn: document.querySelector('current-timer__button--more'),
  targetCurrentLessBtn: document.querySelector('current-timer__button--less'),
  targetDefinedMoreBtn: document.querySelector('define-timer__button--more'),
  targetDefinedLessBtn: document.querySelector('define-timer__button--less'),
  //* elements
  targetMinutesElement: document.querySelector('current-timer__minutes'),
  targetSecondsElement: document.querySelector('current-timer__seconds'),
  targetDefinedMinutesElement: document.querySelector('define-timer__minutes'),
  targetDefinedSecondsElement: document.querySelector('define-timer__minutes'),
  targetSessionTitleElement: document.querySelector('container__session-title'),

  //~ INIT
  init: () => {
    console.log('Hello from space 🚀');
  },

  //~ METHODS
  //actions
  handleListeners: () => {},
  handleBtnStartTimer: () => {},
  handleBtnResetTimer: () => {},
  handleBtnBreakAction: () => {},
  handleCurrentTimeBtnMore: () => {},
  handleCurrentTimeBtnLess: () => {},
  handleDefinedTimeBtnMore: () => {},
  handleDefinedTimeBtnLess: () => {},
  //displays
  displayCurrentSession: () => {},
  displayCurrentTimer: () => {},
  displayDefinedTimer: () => {},
};

app.init();

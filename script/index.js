const app = {
  //~ VARIABLES
  //* default
  currentTimer: {
    minutes: 3,
    seconds: 0,
  },
  definedTimer: {
    minutes: 1,
    seconds: 0,
  },
  remainingTime: null,
  interval: null,
  time: 5,

  //* buttons
  targetActionBtn: document.querySelector(`[data-action]`),
  targetResetBtn: document.querySelector('.main-buttons__button--reset'),
  //* elements
  targetPomodoroContainer: document.querySelector('.container'),
  targetCurrentTimerElement: document.querySelector('.current-timer__container'),
  targetDefinedTimerElement: document.querySelector('.define-timer__container'),
  targetSessionTitleElement: document.querySelector('.container__session-title'),

  //~ INIT
  init: () => {
    console.log('Hello from space 🚀');
    app.displayCurrentTimer(app.currentTimer.minutes, app.currentTimer.seconds);
    app.displayDefinedTimer(app.definedTimer.minutes, app.definedTimer.seconds);
    app.handleListeners();
  },

  //~ METHODS

  //? HANDLING ACTIONS
  handleListeners: () => {
    //& handle main button
    app.targetPomodoroContainer.addEventListener('click', app.handleSideBtn);

    app.targetActionBtn.addEventListener('click', () => {
      const { action } = app.targetActionBtn.dataset;
      action === 'start' ? (app.startTimer(), app.setSession('work')) : app.stopTimer();
      app.audio(action).play();
    });

    app.targetResetBtn.addEventListener('click', app.resetSession);
  },

  startTimer: () => {
    app.remainingTime === null && (app.remainingTime = app.currentTimer);
    app.interval = setInterval(() => {
      const { minutes, seconds } = app.remainingTime;
      const { session } = app.targetSessionTitleElement.dataset;

      app.displayCurrentSession(session);
      app.displayCurrentTimer(minutes, seconds);

      seconds > 0 && app.remainingTime.seconds--;

      if (seconds <= 0) {
        app.updateClock(minutes, seconds, session);

        clearInterval(app.interval);
        app.startTimer();
      }
    }, 100);

    app.setAction('stop');
  },

  updateClock: (minutes, seconds, session) => {
    app.remainingTime = {
      minutes,
      seconds: 3,
    };

    minutes > 0 && app.remainingTime.minutes--;

    if (minutes <= 0 && session === 'work') {
      app.remainingTime = app.definedTimer;
      const { minutes, seconds } = app.currentTimer;
      app.displayDefinedTimer(minutes, seconds);
      app.setSession('break');
      app.audio('break').play();
    }

    //if session name break and minutes = 0
    if (minutes <= 0 && session === 'break') {
      app.remainingTime = null;
      const { minutes, seconds } = app.definedTimer;
      app.displayDefinedTimer(minutes, seconds);

      app.setSession('work');
      app.audio('work').play();
    }
  },

  stopTimer: () => {
    clearInterval(app.interval);
    app.setAction('start');
  },
  resetSession: () => {
    app.setSession('work');
    const { session } = app.targetSessionTitleElement.dataset;
    app.displayCurrentSession(session);

    app.remainingTime = app.currentTimer;
    const { minutes, seconds } = app.currentTimer;
    app.displayCurrentTimer(minutes, seconds);
    app.displayDefinedTimer(app.definedTimer.minutes, app.definedTimer.seconds);
    app.stopTimer();
  },
  setAction: (actionName) => {
    app.targetActionBtn.dataset.action = actionName.toLowerCase();
    app.targetActionBtn.textContent = actionName.toUpperCase();
    return actionName;
  },
  setSession: (sessionName) => {
    app.targetSessionTitleElement.dataset.session = sessionName;
    return sessionName;
  },
  handleSideBtn: (event) => {
    let time;
    let targetTimer;

    const sideBtnClicked = event.target.classList['value'].match('current-timer__button');
    if (sideBtnClicked) {
      time = +event.target.textContent;
      app.remainingTime = app.currentTimer;
      console.log('app.remainingTime: ', app.remainingTime);

      targetTimer = app.remainingTime.minutes;
      app.addOrRetrieveTime(time, targetTimer, 'remainingTime');
    }

    const sideDefineClicked = event.target.classList['value'].match('define-timer__button');
    if (sideDefineClicked) {
      time = +event.target.textContent;

      const { session } = app.targetSessionTitleElement.dataset;

      if (session === 'work') (targetTimer = app.definedTimer.minutes), app.addOrRetrieveTime(time, targetTimer, 'definedTimer');

      if (session === 'break') (targetTimer = app.currentTimer.minutes), app.addOrRetrieveTime(time, targetTimer, 'currentTimer');
    }
  },
  addOrRetrieveTime: (time, targetTimer, timerName) => {
    targetTimer + time > 0 && (app[`${timerName}`].minutes = targetTimer + time);

    const minutes = app[`${timerName}`].minutes;
    const seconds = app[`${timerName}`].seconds;

    timerName === 'remainingTime' ? app.displayCurrentTimer(minutes, seconds) : app.displayDefinedTimer(minutes, seconds);
    return console.log(targetTimer + time > 0);
  },

  //? Add audio to timer
  audio: (session) => {
    let audio = document.createElement('audio');
    audio.classList.add('audio');

    session === 'start' || 'work' ? (audio = new Audio('../media/start.wav')) : (audio = new Audio('../media/stop.wav'));

    session === 'break' && (audio = new Audio('../media/break.wav'));

    audio.preload = 'auto';

    return audio;
  },

  //? DISPLAYS
  displayCurrentSession: (sessionName) => {
    app.targetSessionTitleElement.textContent = sessionName.toUpperCase();
    app.setSession(sessionName);
  },
  displayCurrentTimer: (minutes, seconds) => {
    let currentTimer = app.targetCurrentTimerElement;
    minutes = minutes.toString();
    seconds = seconds.toString();

    currentTimer.textContent = `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
  },
  displayDefinedTimer: (minutes, seconds) => {
    minutes = minutes.toString();
    seconds = seconds.toString();
    app.targetDefinedTimerElement.textContent = `${minutes.padStart(2, '0')} : ${seconds.padStart(2, '0')}`;
  },
};

app.init();

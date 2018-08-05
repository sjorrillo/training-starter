const win = global.window || {};

export default {
  process: global.process,
  document: global.document,
  location: win.location,
  window: win,
  setTimeout: global.setTimeout,
  localStorage: global.localStorage,
  sessionStorage: global.sessionStorage,
};

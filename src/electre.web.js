/* eslint no-console: ["error", { allow: ["warn", "error"] }] */
/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

/**
 * ELECTRE for Web usage
 * @module electre/electre.web
 */

/**
 * List of supported ELECTRE versions
 * For any new version XX, a worker named XX.worker.js must be implemented
 *
 * @type {string[]}
 * @default
 */

const allowedVersions = ['EI'];

/**
 * List of installed workers
 *
 * @type {Worker[]}
 */

const installedWorkers = [];

// ELECTRE Calculator object for web
const electre = {

  /**
   * Calculator's state
   *
   * @type {boolean}
   * @default
   */

  _idle: true,

  /**
   * Current ELECTRE version requested
   *
   * @type {string}
   */

  _version: null,

  /**
   * Promise object returned by caculator
   *
   * @type {Promise.<object>}
   * @member
   */

  _promise: null,

  /**
   * Start calculation
   *
   * @method start
   * @param {string} version Version of ELECTRE to use
   * @param {object} inputData All data needed by requested worker
   * (the latter will check that data are valid)
   * @returns {Promise.<object>} ELECTRE resolution
   * @throws Will throw an error if calculator is already busy
   * @throws Will throw an error if given version of ELECTRE isn't supported
   * @fires Worker#message
   * @fires Promise#resolve
   * @fires Promise#reject
   */

  start: function start(version, inputData) {
    if (!this._idle) {
      throw new Error('Calculator is already busy 👯');
    } else {
      this._idle = false;
      if (allowedVersions.indexOf(version) !== -1) {
        // getters for promise's resolve & reject functions
        let getResolve;
        let getReject;
        // Create a new Promise of calculation result that will be returned
        this._promise = new Promise((resolve, reject) => {
          getResolve = resolve;
          getReject = reject;
          if (installedWorkers.indexOf(version) === -1) {
            const RequiredWorker = require(`./workers/${version}.worker.js`); // eslint-disable-line
            installedWorkers[version] = new RequiredWorker();
            // callback when web worker's calculation is finished
            installedWorkers[version].onmessage = (e) => {
              resolve(e.data);
              this._idle = true;
            };
            // callback when web worker encountered an error
            installedWorkers[version].onerror = (err) => {
              reject(new Error(err.message));
              this._idle = true;
            };
          }
          // define current version
          this._version = version;
          // Now we can start calculation by calling web worker
          installedWorkers[version].postMessage(inputData);
        });
        // add resolve & reject getters to promise
        this._promise.resolve = getResolve;
        this._promise.reject = getReject;
        return this._promise;
      }
      this._idle = true;
      throw new Error('This version of ELECTRE isn\'t supported 👀');
    }
  },

  /**
   * Kill runing calculation 🔫
   *
   * @method kill
   * @fires Worker#terminate
   * @fires Promise#reject
   */

  kill: function kill() {
    if (!this._idle) {
      // terminate worker
      installedWorkers[this._version].terminate();
      // reject promise
      this._promise.reject(new Error('Calculation has been killed 🔫'));
      // reset idle
      this._idle = true;
    }
    // if already idle then no error
  },

};

export {
  /**
   * ELECTRE Calculator object for web
   *
   * @type {Object}
   * @property {boolean} _idle
   * @property {string} _version
   * @property {Promise.<object>} _promise
   */
  electre as default };

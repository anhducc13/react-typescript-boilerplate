// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';
import fs from 'fs';
import { createBrowserHistory } from 'history';
import mockUserServices from 'services/mocks/user';

// Global env config
global.config = { iam: {}, tracker: {}, apiServices: {} };

// Ignore test console
global.console.error = jest.fn();
global.console.warn = jest.fn();

// Mock local storage
jest.spyOn(window.localStorage.__proto__, 'getItem');
jest.spyOn(window.localStorage.__proto__, 'setItem');
jest.spyOn(window.localStorage.__proto__, 'removeItem');
jest.spyOn(window.localStorage.__proto__, 'clear');

// Mock TekoID
jest.mock('teko-oauth2', () => {
  return {
    init: jest.fn(() => Promise.resolve({})),
    user: {
      isLoggedIn: jest.fn(() => mockUserServices.isLoggedIn()),
      login: jest.fn(() => mockUserServices.login()),
      logout: jest.fn(() => mockUserServices.logout()),
      getAccessToken: jest.fn(() => mockUserServices.getAccessToken()),
      getUserInfo: jest.fn(() => mockUserServices.getUserInfo()),
      getFullUserInfo: jest.fn(() => mockUserServices.getFullUserInfo()),
    },
  };
});

// Mock axios
jest.mock('axios', () => {
  return {
    get: jest.fn(() => Promise.resolve({ data: {} })),
    post: jest.fn(() => Promise.resolve({ data: {} })),
    interceptors: {
      response: {
        use: jest.fn(() => {}),
      },
    },
    defaults: {
      transformResponse: [],
      transformRequest: [],
    },
    create: jest.fn(() => {
      return {
        get: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        post: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        patch: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        put: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        delete: jest.fn(() => Promise.resolve({ data: { result: {} } })),
        interceptors: {
          response: {
            use: jest.fn(() => {}),
          },
          request: {
            use: jest.fn(() => {}),
          },
        },
        defaults: {
          transformResponse: [],
          transformRequest: [],
        },
      };
    }),
  };
});

// Mock tracker-js
const mockHistory = createBrowserHistory();
jest.mock('react-tracker-teko', () => {
  return jest.fn().mockImplementation(() => {
    return { connectToHistory: () => mockHistory };
  });
});
global.track = jest.fn();

// Custom mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock all services
const apiDir = 'src/services/apis';
const ignoreFiles = ['request.ts'];
fs.readdirSync(apiDir)
  .filter((file: string) => !ignoreFiles.includes(file))
  .forEach((file: string) => {
    const path = `../${apiDir}/${file}`;
    jest.doMock(path, () => jest.requireActual(path.replace('apis', 'mocks')));
  });

// dark reader
jest.mock('darkreader', () => {
  return {
    enable: jest.fn(),
    disable: jest.fn(),
    auto: jest.fn(),
    setFetchMethod: jest.fn(),
  };
});

// Virtual DOM does not support MutationObserver, just implement for testing
global.MutationObserver = class {
  _callback: (mutations: MutationRecord[]) => void;
  _disconnected: boolean;
  _node: null | Node;
  _records: MutationRecord[];

  constructor(callback: (mutations: MutationRecord[]) => void) {
    this._callback = callback;
    this._disconnected = false;
    this._node = null;
    this._records = [];
    // add 'this' to mutation observer pool
    window._mutation_observers.push(this);
  }

  observe(node: Node) {
    this._node = node;
  }

  disconnect() {
    this._disconnected = true;
  }

  takeRecords() {
    return this._records;
  }

  trigger(mutations: MutationRecord[]) {
    if (!this._disconnected && this._callback) {
      this._callback(mutations);
      this._records.push(...mutations);
    }
  }
} as object & {
  new (callback: MutationCallback): MutationObserver;
  prototype: MutationObserver;
};

// persist a pool of MutationObserver to trigger event
window._mutation_observers = [];

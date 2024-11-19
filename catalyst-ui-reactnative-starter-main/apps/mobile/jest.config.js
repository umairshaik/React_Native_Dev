const config = require('@shared/config/jest');

module.exports = {
  ...config,
  setupFiles: ['<rootDir>/jest.setup.js'],
  displayName: {name: 'Mobile', color: 'blue'},
};

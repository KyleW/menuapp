exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'phantomjs'
  },

  specs: ['./e2e/test.js'],

  jasmineNodeOpts: {
    showColors: true, // Use colors in the command line report.
  }
};
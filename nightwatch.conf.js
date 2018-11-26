/* eslint-disable */

// https://www.npmjs.com/package/@vue/cli-plugin-e2e-nightwatch
// https://github.com/SeleniumHQ/selenium/wiki/DesiredCapabilities
// http://nightwatchjs.org/gettingstarted#settings-file


module.exports = {
  src_folders: ['tests/e2e/specs'],
  output_folder: 'tests/e2e/reports',
  // "custom_commands_path" : "",
  custom_assertions_path: ['tests/e2e/custom-assertions'],
  // "page_objects_path" : "",
  // "globals_path" : "",
  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    // "log_path" : "",
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.firefox.driver': require('geckodriver').path,
      'webdriver.safari.driver': '/usr/bin/safaridriver',
      // "webdriver.ie.driver" : "./bin/IEDriverServer.exe",
      // "webdriver.edge.driver": require('edgedriver').path
    }
  },

  test_workers: {
    // This allows more then one browser to be opened and tested in at once
    enabled: true,
    workers: 'auto'
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        // "path": ""
      },
      desiredCapabilities: {
        browserName: 'chrome',
        marionette: true
      }
    },

    firefox: {
      desiredCapabilities: {
        browserName: 'firefox',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    /** https://developer.apple.com/documentation/webkit/testing_with_webdriver_in_safari
     $ safaridriver --enable
     set the safari browser to Allow Remote Automation
     */
    safari: {
      desiredCapabilities: {
        browserName: 'safari',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    },

    /*
    "edge": {
      "desiredCapabilities": {
        "platform": "WIN10",
        "browserName": "MicrosoftEdge",
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
    */
  }
}

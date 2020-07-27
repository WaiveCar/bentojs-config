'use strict';

let fs     = require('fs');
let path   = require('path');
let extend = require('extend');

/**
 * Exports a new configuration based on provided configDir.
 * @param  {String} configDir    The root path of the configuration location.
 * @param  {String} [outputPath] The output path for where to store the configuration output.
 * @return {Object}
 */
module.exports = function (configDir, outputPath) {
  let list   = fs.readdirSync(configDir);
  let config = {};

  list.forEach(function (category) {
    let configPath = path.join(configDir, category);
    let stat       = fs.statSync(configPath);
    let target     = null;
    if (stat.isDirectory()) {

      // ### Default Configuration
      // Populate required default.js config from each configuration folder.

      try {
        target = path.join(configPath, 'default.js');
        config = extend(true, config, require(target));
      } catch (err) {
        optionalRequire(err, target);
      }

      // ### Optional Configuration
      // Attempts to located and extend optional configuration based on current
      // defined NODE_ENV.

      try {
        target = path.join(configPath, process.env.NODE_ENV + '.js');
        config = extend(true, config, require(target));
      } catch (err) {
        optionalRequire(err, target);
      }

    }
  });

  // ### Write
  // Optionaly create a configuration file at the outputPath location.

  if (outputPath) {
    fs.writeFileSync(outputPath, ('module.exports = ' + JSON.stringify(config)));
  }

  return config;
}

/**
 * Check if the required file is present or not, throw an error if not.
 * @param {Object} err
 * @param {String} code
 * @param {String} file
 */
function optionalRequire(err, file) {
  if (err.code === 'MODULE_NOT_FOUND' && err.toString().match(file)) {
    return;
  }
  throw err;
}

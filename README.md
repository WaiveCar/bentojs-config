# Config

 - [Introduction](#introduction)
 - [Setup](#setup)

## [Introduction](#introduction)

This module provides a simple way to create environment based configurations by traversing the sub directories in a defined `./config_root` directory. Each directory will contain a `default.js` which is the base configuration that all other environment configurations inherits from.

If you run `NODE_ENV=local` the config will first include all `default.js` files present, then extend each `default.js` with any defined `local.js` configuration.

## [Setup](#setup)

```sh
$ npm install bentojs-config --save
```
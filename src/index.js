// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import { Log, LogLevelFromString, StdioAdaptor } from '@edge/log'
import { API } from './api/index.js'
import { Metrics } from './metrics/index.js'
import config from './config.js'

const metrics = new Metrics()
const adaptors = [new StdioAdaptor()]
const log = new Log(adaptors, LogLevelFromString(config.logging.level))
const api = new API(config, metrics, log.extend('api'))

const main = async () => {
  const version = process.env.npm_package_version
  log.info(`Initializing electronics-api v${version}`)
  await api.start()
}

main()
  .then(() => log.info('electronics-api started'))
  .catch((error) => {
    log.error('Error:', error.toString())
    process.exit(1)
  })

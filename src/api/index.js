// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import Express from 'express'
import http from 'http'

export class API {
  constructor(config, metrics, log) {
    this.config = config
    this.metrics = metrics
    this.log = log
    this.app = Express()
    this.server = http.createServer(this.app)
    this.configure()
  }

  configure() {
    this.app.disable('x-powered-by')
    this.app.use(Express.json())
    this.app.use(this.parseBearerToken.bind(this))
    this.app.get('/', this.getIndex.bind(this))
    this.app.get('/metrics', this.getMetrics.bind(this))
    this.app.post('/battery', this.updateBatteryVoltage.bind(this))
    this.app.use(this.notFound)
    this.app.use(this.internalServerError)
  }

  async start() {
    this.server.listen(this.config.server.port, () => {
      this.log.info(`listening on port ${this.config.server.port}`)
    })
  }

  //
  // Middleware
  //
  parseBearerToken(req, res, next) {
    const bearerHeader = req.headers.authorization

    if (bearerHeader) {
      const bearer = bearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
    }

    next()
  }

  //
  // Routes
  //
  async getIndex(req, res) {
    return res.json({
      name: 'electronics-api',
      version: process.env.npm_package_version
    })
  }

  async getMetrics(req, res) {
    if (!req.token || req.token !== this.config.tokens.metricsBearerToken) {
      return this.forbidden(req, res)
    }

    const metrics = await this.metrics.collect()
    res.set('Content-Type', 'text/plain')
    res.send(metrics)
  }

  async updateBatteryVoltage(req, res) {
    if (!req.token || req.token !== this.config.tokens.apiBearerToken) {
      return this.forbidden(req, res)
    }

    const { voltage } = req.body
    this.log.info(`[batteryVoltage] updating battery voltage to ${voltage}v`)
    this.metrics.batteryVoltage.set(voltage)

    return res.end(200)
  }

  //
  // Error handlers
  //
  forbidden(req, res, msg) {
    res.status(403).json({
      error: 'forbidden',
      path: req.path,
      ...msg
    })
  }

  notFound(req, res, msg) {
    res.status(404).json({
      error: 'not found',
      path: req.path,
      ...msg
    })
  }

  internalServerError(error, req, res, next) {
    res.status(500).json({
      error: 'internal server error',
      path: req.path
    })
  }
}

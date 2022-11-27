// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import * as client from 'prom-client'

export class Metrics {
  constructor() {
    client.collectDefaultMetrics({ prefix: 'electronics_' })

    this.batteryVoltage = new client.Gauge({
      name: 'battery_voltage',
      help: 'Battery voltage'
    })
  }

  async collect() {
    return await client.register.metrics()
  }
}

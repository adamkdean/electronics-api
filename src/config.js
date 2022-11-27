// Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
// Use of this source code is governed by the GPL-3.0
// license that can be found in the LICENSE file.

import dotenv from 'dotenv'

dotenv.config()

export default {
  tokens: {
    metricsBearerToken: process.env.METRICS_BEARER_TOKEN || '',
    apiBearerToken: process.env.API_BEARER_TOKEN || ''
  },
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },
  server: {
    port: process.env.HTTP_PORT || 8000
  }
}

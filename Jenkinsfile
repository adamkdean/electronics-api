# Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
# Use of this source code is governed by the GPL-3.0
# license that can be found in the LICENSE file.

SERVICE_NAME="electronics-api"

#
# Build and run the main image
#
docker build -t $SERVICE_NAME .
docker stop $SERVICE_NAME || true
docker rm $SERVICE_NAME || true
docker run \
  --detach \
  --restart always \
  --name $SERVICE_NAME \
  --network core-network \
  --expose 8000 \
  --env HTTP_PORT=8000 \
  --env API_BEARER_TOKEN=$API_BEARER_TOKEN \
  --env METRICS_BEARER_TOKEN=$METRICS_BEARER_TOKEN \
  --env VIRTUAL_HOST=eapi.adamkdean.co.uk \
  --env LETSENCRYPT_HOST=eapi.adamkdean.co.uk \
  --env LETSENCRYPT_EMAIL="adamkdean@googlemail.com" \
  $SERVICE_NAME

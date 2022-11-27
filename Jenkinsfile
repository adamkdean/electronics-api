# Copyright (C) 2022 Adam K Dean <adamkdean@googlemail.com>
# Unauthorized copying of this file, via any medium is strictly prohibited
# Proprietary and confidential

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
  --env API_BEARER_TOKEN=$API_BEARER_TOKEN \
  --env METRICS_BEARER_TOKEN=$METRICS_BEARER_TOKEN \
  --env HTTP_PORT=8000 \
  $SERVICE_NAME

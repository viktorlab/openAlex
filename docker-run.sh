#!/bin/bash

IMAGE_NAME="openalex" 
TAG="latest"
CONTAINER_NAME="openalex-app"
PORT="8080"

echo "Running Docker container..."
docker run -d -p $PORT:80 --name $CONTAINER_NAME $IMAGE_NAME:$TAG

if [ $? -eq 0 ]; then
  echo "Docker container $CONTAINER_NAME is running and accessible at http://localhost:$PORT."
else
  echo "Failed to run Docker container $CONTAINER_NAME."
  exit 1
fi

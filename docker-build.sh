#!/bin/bash

IMAGE_NAME="openalex" 
TAG="latest"

echo "Building Docker image..."
docker build -t $IMAGE_NAME:$TAG .

if [ $? -eq 0 ]; then
  echo "Docker image $IMAGE_NAME:$TAG built successfully."
else
  echo "Failed to build Docker image $IMAGE_NAME:$TAG."
  exit 1
fi

#!/bin/bash

# Change this to your video device
VIDEO_DEV="/dev/video0"

ffmpeg -f video4linux2 -i $VIDEO_DEV -f lavfi -i aevalsrc=0 -c:v libvpx -qmin 0 -threads 8 http://localhost:8090/zen.ffm

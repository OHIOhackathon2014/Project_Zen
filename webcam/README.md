FFmpeg And FFserver Configs
===========================
This directory contains the config files and commands for the webcam streaming
portion. It's set up to stream the webcam to webm format, which we will embed in
the browser page to give the user a view of the zen garden.

FFserver
--------
Start ffserver with the provided config:

    ffserver -d -f ./ffserver-zen.conf

FFmpeg
------
Once you've started ffserver, run the provided script. If your webcam is
something other than /dev/video1, be sure to set it in the variable at the top.

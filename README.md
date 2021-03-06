Project_Zen
===========

    Innovative Bots
    Data that flows like the sands
    Truly, this is Zen

Project_Zen is a interactive experiment in bridging physical gaps in creative
ways. Like all such great experiments, it was born when it's creators were
joking discussing terrible and useless ideas for hackathon projects.

Project_Zen consists of several main parts, the sum of which is the remote
management of a physical Zen garden.

Hardware
--------
Our hardware consits of a common wooden frame, propped up by water bottles since
we had a lot of them, they were just the right height, and when filled provided
a good amount of weight. The rake is driven by two sets of motors and tracks
ripped out of some printers we got at a thrift store, providing x and y motion.
The rake can also be rotated via a servo, but unfortunately we didn't have time
to implement this in software.

Technologies Used
-----------------
- JavaScript
    - Meteor (Node.js), LeapJS
- Arduino
- FFmpeg
    - FFserver

Video Feedback
--------------
The first part of remotely managing a Zen garden is being able to actually look
at it. To accomplish this, we used ffmpeg and ffserver to create a WebM stream
that could be easily embedded into a webpage. The files for this section are in
`./webcam`.

Leap Motion Interface
---------------------
A Leap Motion is used to interact with the garden. By moving a pen or similar
tool up, down, left and right, the rake will move in the corresponding
direction. This part is located in `./leapmotion_serial`, and also contains the
serial interface code.

Arduino Controller
------------------
This project uses an Arduino Uno to drive the motors. You can see the code in
`./robot`.

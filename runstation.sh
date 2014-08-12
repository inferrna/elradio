#!/bin/sh
SRC=$1 #http://81.19.85.197/echo.mp3
DSTIP=$2 #185.12.94.238
MTYPE=$3 #mp3
PASS=$4 #ad438a4635b7f6b7cd8b1185278ffbb2
PATH=$5 #coge.ogg
PR="/usr/bin"
echo "$PR/wget $SRC -O- | $PR/sox -t $MTYPE /dev/stdin -e signed-integer -c 1 -t raw -r 9000 /dev/stdout | $PR/opusenc --raw --raw-bits 16 --raw-rate 9000 --raw-chan 1 --vbr --expect-loss 5 --framesize 40 --comp 10 - - | $PR/oggfwd $DSTIP 8000 1 $PASS /$PATH.ogg"
$PR/wget $SRC -O- | $PR/sox -t $MTYPE /dev/stdin -e signed-integer -c 1 -t raw -r 9000 /dev/stdout | $PR/opusenc --raw --raw-bits 16 --raw-rate 9000 --raw-chan 1 --vbr --expect-loss 5 --framesize 40 --comp 10 - - | $PR/oggfwd $DSTIP 8000 $PASS /$PATH.ogg

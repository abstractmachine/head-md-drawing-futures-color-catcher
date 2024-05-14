#!/bin/sh

# change to the directory where the script is located
cd "$(dirname "$0")"

# Run an http server and launch chrome in kiosk mode
python3 -m http.server 5500 & 
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --chrome-frame --autoplay-policy=no-user-gesture-required --kiosk "http://localhost:5500"

echo done

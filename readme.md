## HueJacker

A simple, barebones educational NodeJS app that attempts to get an API key from an accessible Philips Hue device.

#### How to use
1. Make sure your NodeJS environment is set up.
2. Set the target IP address (of the Hue device) as an environment variable in package.js under the proper script for your OS.
3. Ensure the request interval is what you want it to be. It is 1 second by default.

The app will continue running until it gets an API key. When it gets an API key, it will print the key to a local file called success.txt and will cease running.
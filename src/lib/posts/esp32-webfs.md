---
title: 'Serving SvelteKit builds from ESP32 WebFS'
date: '2026-06-27'
description: 'Embedding compiled SvelteKit apps directly into ESP32 flash memory for self-contained web interfaces.'
tags: ['SvelteKit', 'ESP32', 'WebFS', 'Embedded']
---

One pattern I keep coming back to: serving a SvelteKit build directly from an ESP32's flash filesystem. No external servers, no cloud dependencies—just the board and its own web interface.

## The approach

Build the SvelteKit app with static adapter, then copy the generated files into a `data` folder that gets flashed alongside the firmware. The ESP32 runs a lightweight HTTP server that serves these files from SPIFFS or LittleFS.

This works well for device dashboards, configuration panels, and monitoring tools where the UI needs to be self-contained.

## A minimal ESP32 WebFS handler

Here's how I set up the HTTP server on the ESP32 to serve static files from SPIFFS:

- Initialize the filesystem with `SPIFFS.begin(true)`
- Use `server.serveStatic()` to map the root URL to the SPIFFS root
- Set `index.html` as the default file for client-side routing
- Add a 404 fallback for unmatched routes

The server caches static assets for 24 hours to reduce load on the flash memory.

## Build pipeline

For a clean workflow, I use a script that builds the SvelteKit app and copies the output into the ESP32 project:

- Run `npm run build` in the frontend directory
- Copy the `build/` folder to `esp32-project/data/`
- Flash the filesystem image with PlatformIO

This keeps the deployment process simple and reproducible.

## Why WebFS works for embedded UIs

Having the web interface stored directly on the device eliminates network dependencies. The interface loads instantly after the WiFi connects, and there's no need for external hosting. Updates are handled by flashing a new filesystem image alongside the firmware.

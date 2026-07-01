---
title: 'SSR and live data in ESP32 dashboards with SvelteKit'
date: '2026-06-29'
description: 'Using SvelteKit server-side rendering for initial page loads, then live updates from ESP32 websockets.'
tags: ['SvelteKit', 'ESP32', 'WebSocket', 'SSR']
---

Static files from WebFS work for many use cases, but sometimes you need server-side rendering for SEO or initial load performance. Here's how I blend SSR with live ESP32 data.

## The hybrid model

The ESP32 serves the compiled SvelteKit app statically, but the frontend fetches real-time data via WebSockets after the page loads.

On the ESP32 side:

- Run an HTTP server to serve static files from WebFS
- Run a WebSocket server on a separate port (e.g., 81)
- Send sensor data to connected clients immediately

On the SvelteKit side:

- Use SSR to render the initial HTML with cached data
- Establish a WebSocket connection after the page mounts
- Update the UI in real-time as new data arrives

## Why this approach works

The initial render is fast because it uses pre-rendered HTML. The WebSocket connection provides live updates without polling or page refreshes. This gives the user a snappy first impression and accurate real-time data.

## Handling the connection lifecycle

I set up the WebSocket inside the component's onMount lifecycle:

- Connect to `ws://[device-ip]:81`
- Parse incoming JSON data
- Update the component state
- Close the connection when the component unmounts

## When to use this pattern

- Device dashboards with live sensor readings
- Configuration panels that need instant feedback
- Monitoring tools where data updates every few seconds
- Projects where SSR is required for SEO or performance

For most embedded projects, static build + WebSocket live data hits the sweet spot between performance, simplicity, and maintainability.

<h2>Why this approach works</h2>
<p>The initial render is fast because it uses pre-rendered HTML. The WebSocket connection provides live updates without polling or page refreshes.</p>

<h2>Handling the connection lifecycle</h2>
<p>I set up the WebSocket inside the component's onMount lifecycle:</p>
<ul>
  <li>Connect to <code>ws://[device-ip]:81</code></li>
  <li>Parse incoming JSON data</li>
  <li>Update the component state</li>
  <li>Close the connection when the component unmounts</li>
</ul>

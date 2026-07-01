---
title: 'Building a small bridge between hardware and the web'
date: '2026-06-24'
description: 'A short note on keeping embedded work and SvelteKit work close together.'
tags: ['SvelteKit', 'TypeScript', 'ESP32', 'IoT']
---

Most of my side work starts with a simple problem: a sensor, a small board, and a web interface that needs to stay readable.

The useful part is usually not the flashy UI. It is the path from hardware input to a predictable data shape, then into a layout that people can scan quickly.

## Why I keep both sides close

When the frontend and the device code stay close to each other, the data flow is easier to reason about. I can make decisions about payload shape, refresh timing, and state handling without guessing how the other layer will behave.

That helps in projects like ESP32 dashboards, utility apps, and small internal tools where the interface only works if the underlying data is clean.

## A small example

```ts
type SensorReading = {
	temperature: number;
	humidity: number;
	updatedAt: string;
};

export const reading: SensorReading = {
	temperature: 28.4,
	humidity: 61,
	updatedAt: new Date().toISOString()
};
```

That kind of shape is enough for most of the interfaces I build. Keep it small, keep it explicit, and let the UI do less work.

---
title: 'Type-safe data contracts for ESP32-SvelteKit projects'
date: '2026-06-28'
description: 'Sharing TypeScript types between frontend and backend to reduce bugs in embedded web interfaces.'
tags: ['TypeScript', 'SvelteKit', 'ESP32', 'JSON']
---

When the ESP32 sends JSON to a SvelteKit frontend, the data shape is a contract. TypeScript helps me enforce that contract on the web side, catching mismatches early.

## Shared types

I keep a `types` folder that both the SvelteKit app and my ESP32 code can reference. This way, payload structures are defined once.

A typical sensor payload includes:

- Device ID (string)
- Array of readings with name, value, unit, and timestamp
- Battery percentage (number)

## Validation in SvelteKit

Before using data from the ESP32, I validate it on the frontend:

- Check that the data is a valid object
- Verify all required fields are present
- Confirm each field has the correct type
- Handle invalid data gracefully (log error, return null)

This prevents runtime errors caused by malformed payloads.

## Keeping both sides aligned

For the ESP32 side, I use a script to generate equivalent C++ structs from the TypeScript definitions. Manual duplication is a source of bugs I've learned to avoid. When the data contract changes, both sides get updated simultaneously.

## Benefits of type safety

- Early error detection during development
- Better autocomplete in the IDE
- Clear documentation of the data contract
- Fewer runtime surprises in production

---
title: "Halo Dunia"
date: "2026-03-24"
---

But it has an important downside, the sensor temperature is affected by the Pi's CPU as it is very close to the board. So the temperature needs to be compensated, which is not as simple as applying a fixed offset as stated in the Pimoroni's tutorial. Instead I tried to apply a linear regression by obtaining the temperature from another weather station that, luckily, is close to my home.

Apart of installing the Weather HAT and reading the data from the sensors, the most important challenge was finding the best place for it in the balcony and how to isolate it from the external conditions, while at the same time allowing enough ventilation to avoid heat accumulation inside.


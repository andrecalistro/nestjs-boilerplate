#!/bin/bash
cp env.dev .env
npm install
npm run build
npm run start:dev
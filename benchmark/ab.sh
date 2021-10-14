#!/bin/bash
set -eux;

ab -n 10000 -c 100 "http://localhost:3000/fizzbuzz?integer1=3&integer2=5&limit=10&replacement1=fizz&replacement2=buzz"

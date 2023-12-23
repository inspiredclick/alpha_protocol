# Alpha Protocol Library

![sign picture](./sign.gif)

A simple JS library to interface with Alpha 2.0 protocol LED Signs

## Requirements
- NodeJS
- [RS232 to rj11 6p6c](https://www.amazon.com/gp/product/B082BN27LT/ref=ppx_yo_dt_b_asin_title_o09_s01?ie=UTF8&psc=1) USB to serial cable
- [Alpha Protocol](https://www.alpha-american.com/signs.html) enabled sign

## Getting Started
- Run `npm install`

## Usage

### Demo
- Run `npm run demo -- <COM_PORT>` (ex: `npm run demo -- COM3`)

### Interactive CLI
- Run `npm run icli` to get an interactive terminal to the sign. From there you can read/write messages directly to and from the sign.

### Library
- Clone repo and import `SignClient` to integrate directly with your implementation. See demo.ts for an example integration.

https://www.alpha-american.com/alpha-manuals/M-Protocol.pdf
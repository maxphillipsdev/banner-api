# Banner API

## Intro

This is a side project I made with Nest.js to generate social banners for my projects. It uses HandlebarsJS and Puppeteer to generate on-demand banners that can be configured using query parameters. It is also slow as, mainly due to the fact that its spinning up a headless pupeteer browser each time it tries to run. Yeah pretty doomed, use without a caching layer is not advised.

# Rationale (AKA, the section where i try to cope with the doomed performance)

There's not really a good rationale for this. The banners are super simple and could be made in figma in a few minutes. 
Lucky for me though I am a programmer, which gives me the power to turn a 5 minute task into one that takes 3 days. 😎

oh also if you're a potential employer and reading that last part tho please try forget what you just read. Ummm, something something its just a side project, I try not to overengineer my actual work as much :D 

# Usage

`pnpm install`

`pnpm start:dev`

# Run tests

`pnpm test`

`pnpm test:e2e`

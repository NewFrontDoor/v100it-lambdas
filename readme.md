# v100it-lambdas

## Why

The v100it website is a static website, without a typical server.
The website has forms such as, contact, feedback, support request forms.
To submit the forms the website needs somewhere to submit them to.
AWS lambdas allow the website to have functionality normally needing a backend server.

## Tools

- [`aws-sdk`](https://github.com/aws/aws-sdk-js)
- [`nodemailer`](https://nodemailer.com)
- [`serverless`](https://serverless.com)
- [`rollupjs`](https://rollupjs.org/)

## Commands

- `build`
	runs `rollup --config rollup.config.js`
	combines each function into a single `handler.js` for lambda


- `deploy`
	runs `serverless deploy`
	deploys the combined `handler.js` using serverless

## Functions

- `contact-us`
- `feature-request`
- `give-feedback`
- `mailing-list`
- `support-request`

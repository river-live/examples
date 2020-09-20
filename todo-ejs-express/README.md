# Todo List Demo

This is a simple demo app to show how you can leverage River to easily convert an existing application to realtime.

Credits and thanks to [@missating](https://github.com/missating/nodejs-todo) for the inspiration for the Todo list app itself!

## Usage

To use this with River, you neep to deploy the River infrastructure first. See the [deploy repo](https://github.com/river-live/deploy) for more information.

The deploy script will output all the information you need:

- Your server (`server.js`) needs to know the address of the API Gateway, as well as the key. The key is used as a simple means of authentication.
- Your frontend code (`app.js`) needs to know the address of the load balancer, as well as the secret. You need to generate a valid JSON Web Token using the provided secret. You can easily do so [here](https://jwt.io/).

## Useful commands

To start the application, run:

- `npm install` to install the dependencies
- `npm start` to start the server

Navigate to localhost:3000 to see your wonderful app in action!

## Note

AWS Lambda functions are known for having a ["cold start"](https://itnext.io/serverless-framework-warming-up-aws-lambda-to-avoid-cold-start-2be579475531). This is usually not a problem with a running application with some amount of traffic, but you might exprience some delay for the first minute or two when you start this demo application. After that, the updates on the UI should be immediate.

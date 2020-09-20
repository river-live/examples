# A React/Redux example app to show River usage

## How to install

To install dependencies, from the root folder AND from the client folder:

```
npm install
```

## How to start the app

To start the app, from the root, type:

```
npm start
```

This will start the React development server, and the backend server.

## How to use it with your own River deployment

To test the app with your deployed infrastructure, you simply need to modify the following files with your own outputs. These outputs are displayed in your terminal when River's deployment process is done. You should keep them in a safe place and you can also retrieve them using the AWS console if needed.

`client/src/components/CommentApp.js` has very minimal River code which dispatches an action on the Redux store.

`server.js` (in the root folder) has just one line of River code to publish new messages/comments.

## Note

AWS Lambda functions are known for having a ["cold start"](https://itnext.io/serverless-framework-warming-up-aws-lambda-to-avoid-cold-start-2be579475531). This is usually not a problem with a running application with some amount of traffic, but you might exprience some delay for the first minute or two when you start this demo application. After that, the updates on the UI should be immediate.

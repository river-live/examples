# A React/Redux example app to show River usage

## install

To install dependencies, from the root folder

```
npm install
```

## start the app

To start the app, from the root, type

```
npm start
```

This will start the React development server, and the backend server.

## River modifications

`client/src/components/CommentApp.js` has very minimal River code which dispatches an action on the Redux store.

`server.js` (in the root folder) has just one line of River code to publish new messages/comments

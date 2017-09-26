# Coding Exercise

**This code is not completed but has a partial implementation of React Redux (in flux ha ha ha, not really funny)**

This is an example of a simple React app with a traditional REST api using Node.js with express and Mongo.

The React app was created by "create-react-app". See [Create React App](https://facebook.github.io/react/docs/installation.html) for reference.

## API Setup
After cloning into desired directory...
- Install latest version of Node.js (v8.+) (recommend NVM)
- Install latest of Mongo (v3+)
- Place .env file within root of API directory
- Within API directory run "npm install && npm start"

Example .env file.

```
PORT=7001
MONGODB='mongodb://localhost/codingexercise'
```

## React Setup
After cloning into desired directory...
- Install latest version of Node.js (v8.+) (recommend NVM)
- Within API directory run "npm install && npm start"

**Attention** assumes API is running on port 7001. Go to web-app root folder and modify /src/api/API.js and modify ```this.baseUrl``` to desired API location.

### todo
- On web app, make API directory configurable on build
- On API app, add mocha tests

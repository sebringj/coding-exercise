# Coding Exercise

This is an example of a simple React app with a traditional REST api using Node.js with express and Mongo.

The React app was created by "create-react-app". See [https://facebook.github.io/react/docs/installation.html](React Create App) for reference.

## API Setup
After cloning into desired directory...
- Install latest version of Node.js (v8.+) (recommend NVM)
- Install latest of Mongo (v3+)
- Place .env file within root of API directory
- Within API directory run "npm start"

Example .env file.

```
PORT=7001
MONGODB='mongodb://localhost/codingexercise'
```

## React Setup
After cloning into desired directory...
- Install latest version of Node.js (v8.+) (recommend NVM)
- Install latest of React
- Within API directory run "npm start"

**Attention** assumes API is running on port 7001. Go to web-app root folder and modify /src/api/API.js and modify ```this.baseUrl``` to desired API location.

### todo
- On web app, make API directory configurable on build
- On API app, add mocha tests

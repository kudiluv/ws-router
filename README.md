# ws-router-bc: a Node.js router library

[![Version npm](https://img.shields.io/npm/v/ws-router-be.svg?logo=npm)](https://www.npmjs.com/package/ws-router-be)

## installing
```
npm i ws-router-be
```

## Usage examples

### Creating a controller
You can use the controller constructor:
```javascript
import {Controller} from 'ws-router-be';

export default new Controller('index', (req) => {
    console.log(req.data);
});
```
You can also use the following syntax:
```javascript
export default {
    route: 'index',
    callback(req) {
        console.log(req.data);
    },
    middlewares: [...middlewares]
}
```
### Creating a middleware
Your function should accept the request and the next function:
```javascript
export default function (req,next) {
    if (req.date) {
        next();
    }
}
```
### Creating a router
The router is waiting for an array of controllers.
```javascript
import {Router} from 'ws-router-be';
import WebSocket from 'ws';

const wss = new WebSocket.Server({server});
const router = new Router([indexController], wss);

wss.on('connection', (ws) => {
    ws.on('message', router.listener(ws));
});
```

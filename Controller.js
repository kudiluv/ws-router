class Controller {
    constructor(route = 'index', callback = (req) => {}, middlewares = []) {
        this.route = route;
        this.callback = callback;
        this.middlewares = middlewares;
    }
}

module.exports = Controller;

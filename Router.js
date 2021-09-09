class Router {
    #controllers = {};
    #wss;

    constructor(controllers = [], wss) {
        for (const controller of controllers) {
            const callbacks = controller.middlewares ? controller.middlewares : [];
            callbacks.push(controller.callback);
            this.#controllers[controller.route] = callbacks;
        }
        this.#wss = wss;
    }

    next(req, callbacks = []) {
        const calls = callbacks.slice();
        return () => {
            calls.splice(0, 1);
            calls[0](req, this.next(req, calls));
        }
    }

    listener(ws) {
        return (input) => {
            const message = JSON.parse(input);
            const request = {
                ws: ws,
                wss: this.#wss,
                data: message.payload
            };
            this.#controllers[message.route][0](request, this.next(
                    request, this.#controllers[message.route]
                ),
            );
        }
    }

}

module.exports = Router;
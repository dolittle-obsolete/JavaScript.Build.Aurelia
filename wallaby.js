const wallaby = require('@dolittle/build/dist/wallaby/node')
module.exports = function (settingsCallback) {
    return wallaby(settingsCallback,
        () => {
            require('aurelia-polyfills');
            const { globalize } = require('aurelia-pal-nodejs')
            globalize();
        }
    );
}

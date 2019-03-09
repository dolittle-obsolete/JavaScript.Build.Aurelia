const wallaby = require('@dolittle/build/dist/wallaby/node')
module.exports = wallaby('.',
    (config) => {

    },
    () => {
        require('aurelia-polyfills');
        const { globalize } = require('aurelia-pal-nodejs')
        globalize();
    }
);

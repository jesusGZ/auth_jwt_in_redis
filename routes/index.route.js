const glob = require('glob');
const path = require('path');

module.exports = (app) => {
    glob.sync('./routes/*.route.js').forEach(file => {
        if(!file.includes('index.route.js'))
            require(path.resolve(file))(app);
    });
}
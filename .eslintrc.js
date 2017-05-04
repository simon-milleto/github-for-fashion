module.exports = {
    "extends": "airbnb",
    "installedESLint": true,
    "plugins": ["vue"],
    "rules": {
      "linebreak-style": 0,
      "eol-last": 0,
      "no-param-reassign": 0,
      "no-console": 0,
      "class-methods-use-this": 0,
      "prefer-arrow-callback": 0,
      "func-names": 0,
      "no-alert": "error",
    },
    "env": {
      "browser": true,
    },
    "globals": {
    	"GitHub": true
    }
};

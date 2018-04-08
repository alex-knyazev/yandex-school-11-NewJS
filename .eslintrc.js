module.exports = {
    "parser": "babel-eslint",
    "extends": "airbnb-base",
    "rules": {
        "strict": 0,
        "no-use-before-define": "off",
        "no-plusplus": "off",
        "no-trailing-spaces": "off",
        "no-console": "off",
        /* uncommit it on developing
        "no-console": "off",
        "no-debugger": "off",
        "no-unused-vars": "off",
        */ 
    },
    env: {
        "mocha": true,
        "browser": true,
    }    
};
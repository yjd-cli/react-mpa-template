module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "extends": [
        "airbnb"
    ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "arrow-parens": 0,
        "semi": [
            "error",
            "always"
        ],
        "indent": [
            "error",
            4
        ],
        "space-before-function-paren": 0,
        "object-curly-spacing": "off",
        "no-undef": 0,
        "quotes": 0,
        "react/jsx-indent": [
            "error",
            4
        ],
        "react/jsx-indent-props": [
            "error",
            4
        ],
        "react/jsx-first-prop-new-line": [
            2,
            "multiline"
        ],
        "react/jsx-no-target-blank": 0,
        "no-unused-vars": 0,
        "no-dupe-class-members": "off"
    },
};

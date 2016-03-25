firebase-schema - Make firebase-schema.js
redux-schema - Make redux-schema.js
actions - Make actions.js file add all actions to it for now.
reducers - Make reducers.js file and add all reducers to it for now.
hello-world - Build Hello World
    - npm init -y
    - npm install --save react react-dom && npm install --save-dev html-webpack-plugin webpack webpack-dev-server babel-{core,loader} babel-preset-{react,es2015,stage-0}
    - Basic webpack.config.js
    - .babelrc
    - mkdir app
    - touch index.js && touch index.html
    - Fill out index.html
    - Add Hello World to index.js and render it.
    - add start and prod to package.json
react-router - Add React Router
  - npm install --save react-router
  - Make components folder
  - Make Main folder
      - Main.js and move HelloWorld code to it
  - Make index.js of components folder
  - Make config/routes.js and fill out routes
developer-experience
  - npm -v
  - node -v
  - Purposefully mistype a variable name and then check the error in the cosole
    - Gross index_bundle.js error.
    - Add devtool: 'eval-source-map' to webpack config and restart webpack
    - show error message again with sourcemap enabled.
  - Eslint
    - http://standardjs.com/
    - npm install --save-dev eslint eslint-{config-standard,plugin-standard,plugin-promise}
    - Add lint to node script
    - touch .eslintrc
    - run 'npm run lint' and see errors + gross ERR! npm code.
    - Fix ^ by adding exit 0 to npm lint script
    - Notice we're not linting for React stuff
    - npm install --save-dev eslint-plugin-react
    - Add react plugin to eslintrc
    - Fill out rest of eslintrc besides rules
    - Add rules
    - Fix errors but should still be one error in index.js with exporting file

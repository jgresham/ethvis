# Ethvis

This project serves as a UI to Ethereum clients. It serves as a devtool for client developers and testnet testers. Also, it serves node operators who want to see the status of a client and the chain it operators on.

## Future work

Ranked by priority (ranking is pre-feedback from client devs/testers):

1. Add Merge specific UI elements (is the chain pre or post merge, when is/did it happen?)
2. Documentation for running the UI and client requirements
3. Allow the UI to connect to non-local host endpoints (requires auth support)
4. Deploy the UI to IPFS so that users do not need to run the UI locally
5. Create a block viewer using something like [React diagrams](https://github.com/projectstorm/react-diagrams)

## Connecting an Ethereum client

### Run Ethvis locally

1. Install [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git), [Node.js](https://nodejs.org/en/download/), & [yarn](https://yarnpkg.com/getting-started/install)
2. Clone this repo `git clone git@github.com:jgresham/ethvis.git`
3. In the repo, run `yarn` to install dependencies
4. Run `yarn start` to start the UI locally at http://localhost:3000

### Use Ethvis on IPFS

**December 14th, v1**: ipfs://bafybeibc2x4pwlcxwobk6jscbvr3pwkn4wtoklm2nw33ry4dxtsfz6qpd4/

1. Allow Ethvis from IPFS to connect to your client by setting the "http-allow-origin" runtime flag for your client to a value: "http://" + the IPFS hash + "\<your ipfs gateway\>"

ex. for Lighthouse

```
--http-allow-origin http://bafybeibc2x4pwlcxwobk6jscbvr3pwkn4wtoklm2nw33ry4dxtsfz6qpd4.ipfs.localhost:8080/
```

2. Disable browser shields for this IPFS URL, such as on Brave (Brave blocks Ethvis on IPFS from making an http to localhost)

# Contributing

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

Acronyms.
Variable prefixes:

- s "state variable from useState"
- rs "redux state variable from a redux store"

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

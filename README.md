# Keeb Mart - The mechanical keyboard store


Using Netlify for hosting and for serverless

### To run the app locally

1. install dependencies
```
yarn
```
2. start the lambda functions server and client react application
```
yarn start
```

### To deploy the app to Netlify

```
yarn deploy
```

This will perform two actions
1. build the lambdas and output the results to the `/lambdas` directory
2. deploys the build artifacts to a staging environment
  - if everything looks good on staging run the following command
	
```
netlify deploy --prod
```

#### Helpful links
`https://github.com/netlify/cli`
`https://github.com/netlify/netlify-lambda`
`https://www.netlify.com/docs/functions/#javascript-lambda-functions`
`https://functions.netlify.com/examples/`
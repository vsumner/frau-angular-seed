# seed
Getting started seed for angular

##Running Locally

To run the seed application locally from your machine, run the following from
within the frau-angular-seed project:

```shell
npm run watch
```

or, on Windows:

```shell
npm run watch:win
```

This will:
- build the application with an `appconfig.json` specific for local builds
- set up a watch to rebuild the application whenever any changes occur
- start a local app resolver
- start a local web server to host your application

The app resolver can be visited at:
> http://localhost:3000/resolve/{app-id}

The application's `appconfig.json` can be viewed at:
> http://localhost:3000/app/appconfig.json

The application can be viewed from within Brightspace by visiting:
> http://{instance}/d2l/apps/{app-id}/
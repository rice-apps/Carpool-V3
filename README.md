# Carpool V3: Simplifying Carpool for Mobile
RiceApps is excited bring the third iteration of Rice Carpool to the Rice community! We felt that there is a real need in the Rice community for an easy-to-use, carpool scheduling application, so we decided to fix some of the flaws of V2, and provide a brand-new refresh of the app! 

A big problem with the previous two iterations of the app were that they were not very mobile-friendly, and contained too many unnecessary features. When desigining V3, we kept a few goals in mind: to not overwhelm the user with too many options, and to provide a clean and easy-to-use user interface.

Carpool V3 is under heavy development, with a stable MVP release coming the end of 2021. Be on the lookout for that!

## Developer Guide
Follow these steps to get started on developing:

### Prerequisites
Please install the latest NodeJS version. Downloads for Windows, Mac, and Linux can be found on the NodeJS [website](https://nodejs.org/en/download/).

We also recommend developing with [VSCode](https://code.visualstudio.com/). 

### Installation
To clone Carpool V3, create a new directory to store the code, and CD into the directory from your terminal. Enter the following command to clone the directory!

```
git clone https://github.com/rice-apps/Carpool-V3.git
```

Carpool V3 is a monorepo, meaning that both the frontend (under the client directory) and backend (under the api directory) are stored in the same repository. In order to run the backend and frontend correctly, you should start the backend first.

```
cd api
npm install
npm start
```

Then, in another terminal window, do the same for the frontend.

```
cd client
npm install
npm start
```

Now, you will be able to view the app in your browser under `localhost:3001`

In the future, you can skil the `npm install` when starting the app.

### Contributing

In order to contribute to Carpool V3, you must make all of your edits on your own development branch. To do so, create a new branch from your command line:

```
git checkout -b my-new-branch
```

From here, all your changes should be pushed to this branch, and not `master`.

When you are done working on your feature, submit a pull request through GitHub, which must be approved by a Team Lead before it is merged with `master`.

### Best Coding Practices

We want to keep our code as clean as possible, so it's important to follow these best development practices before submitting your PR!

* Don't leave commented-out code in your files.
* Make sure there are no warnings when React compiles after running `npm start`
* Make sure there are no warnings in the JavaScript development console
* Add comments to your files describing what each function does
* When creating a PR, make sure you describe what the PR does, and how a Team Lead should review and test it!

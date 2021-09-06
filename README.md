# Project Guide

## Setup

1. Ensure that you have the following programs installed:

-   [git](https://git-scm.com/downloads)
-   [node](https://nodejs.org/en/)
-   [Visual Studio Code](https://code.visualstudio.com/)

You can check that these programs are installed by running `<program name> --version` in your command line.

2. Run:

```
npm install -g yarn
yarn global add expo-cli
```

This will install the Expo command line utility. Expo is a tool that will help us to test the project.

3. Install the Expo app on your Android or iOS device.

4. Navigate to the project folder and run:

```
yarn
```

This will install all of this project's dependencies (modules that the program is using).

You should now be ready to run the project!

## Running

1. After navigating to the project folder, run:

```
yarn start
```

2. A dashboard should appear in your web browser. On the left sidebar, under the option labeled "Connection" change the selected option to "tunnel".

3. On Android, open up to the Expo Go app. On iOS, open up the Camera app. Scan the QR code that appears on the left sidebar on the dashboard.

4. After some time, the app will have successfully loaded in the Expo app!

# Project Guide

## Setup

Ensure that you have the following programs installed:

-   [git](https://git-scm.com/downloads)
-   [node](https://nodejs.org/en/)
-   [Visual Studio Code](https://code.visualstudio.com/)

You can check that these programs are installed by running `<program name> --version` in your command line.

Then run:

```bash
npm install -g yarn
```

This will download and install yarn. yarn is a package manager - a tool to download modules created by other developers.

### App Setup

1. Install the Expo app on your Android or iOS device.

2. Navigate to `/monocle/front-end` and run:

```bash
yarn
```

This will install all of this project's dependencies (modules that the program is using).

### Server Setup

This project depends on a remote server that we have created. You can run a local version of that server for debugging purposes.

Navigate to `/monocle/api-server` and run:

```bash
yarn
```

## Running

### Running the App

1. After navigating to the project folder, run:

```bash
cd front-end
yarn start
```

2. A dashboard should appear in your web browser. On the left sidebar, under the option labeled "Connection" change the selected option to "tunnel".

3. On Android, open up to the Expo Go app. On iOS, open up the Camera app. Scan the QR code that appears on the left sidebar on the dashboard.

4. After some time, the app will have successfully loaded in the Expo app!

### Running the Server

After navigating to the project folder, run:

```bash
cd api-server
yarn start
```

You can check that the server is running by visiting "localhost:3000/api/status". If a you receive a JSON object as a response, you know that it is working. You should also see the message `monocle api-server listening on {some port in the 3000s}` in your terminal.

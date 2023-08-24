# electron-update-server-uploader

This project aims to provide a bulk upload tool for `Electron Nucleus` application version files. It addresses the issue of bulk release of application versions in private or network-restricted scenarios.

> Note: You can use continuous integration tools like `Github Action` to first package the application in various environments, then download the files, and finally upload them all to the `Nucleus` application update server.

[简体中文](./README-zh_CN.md) | [English](./README.md)

# Usage

## Command Line Usage:

```
// There are two arguments for the command, the first is the version number, and the second is the location of the root directory of the update files.
npx electron-update-server-uploader 1.1.4 /Users/peiyandong/Downloads/apps
```

## Usage from Source 
```
git clone https://github.com/lucksoft-yungui/update-server-uploader.git
cd update-server-uploader
npm i
// There are two arguments for the command, the first is the version number, and the second is the location of the root directory of the update files.
npm run upload -- 1.1.4 /Users/test/Downloads/apps
```

The root directory structure is as shown below:

![picture 0](assets/315d1bede585df2376bc810e7768083df59e7c71e86332fd3b2fcfb4ffd56598.png)  

# Related Projects

- [electron-update-server](https://github.com/lucksoft-yungui/electron-update-server) Supports app version and distribution services for mac, win, linux platforms and x64, arm64 architectures.
- [luck-electron-auto-updater](https://github.com/lucksoft-yungui/luck-electron-auto-updater) Auto-update component supporting mac, win, linux platforms.




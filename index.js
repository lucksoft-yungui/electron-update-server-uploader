#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import fetch from 'node-fetch';
import config from './config.js';

async function uploadDistributables(version, rootDir) {
  // 遍历第一层目录
  const platforms = fs.readdirSync(rootDir).filter(item => fs.statSync(path.join(rootDir, item)).isDirectory());

  for (const platform of platforms) {
    // 遍历第二层目录
    const archs = fs.readdirSync(path.join(rootDir, platform)).filter(item => fs.statSync(path.join(rootDir, platform, item)).isDirectory());

    for (const arch of archs) {
      const msg = `Uploading distributable ${platform}/${arch}`;
      console.log(msg);

      const data = new FormData();
      data.append('platform', platform);
      data.append('arch', arch);
      data.append('version', version);

      const files = fs.readdirSync(path.join(rootDir, platform, arch)).filter(item => fs.statSync(path.join(rootDir, platform, arch, item)).isFile());

      let artifactIdx = 0;
      for (const file of files) {
          const artifactPath = path.join(rootDir, platform, arch, file);
          data.append(`file${artifactIdx}`, fs.createReadStream(artifactPath));
          artifactIdx += 1;
      }

      if(artifactIdx==0) continue;

      const response = await fetch(`${config.host}/rest/app/${config.appId}/channel/${config.channelId}/upload`, {
        headers: {
          Authorization: config.token,
        },
        method: 'POST',
        body: data,
      });

      if (response.status !== 200) {
        throw new Error(`Unexpected response code from Nucleus: ${response.status}\n\nBody:\n${await response.text()}`);
      }
    }
  }
}

// 获取命令行参数
const args = process.argv.slice(2);
if (args.length !== 2) {
  console.error('Usage: node script.js <version> <rootDir>');
  process.exit(1);
}

const [version, rootDir] = args;

// 调用函数
uploadDistributables(version, rootDir);
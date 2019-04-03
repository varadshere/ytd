const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const fs = require("fs");
const store = require("./data/store.json");
//fs.writeFile( "./data/store.json", JSON.stringify( {} ), "utf8", () => {
//	console.log('written');
//} );
const ytdl = require('ytdl-core');


const url = 'https://www.youtube.com/watch?v=Xj0eR09MqPM';
const output = path.resolve(__dirname, 'video.mp4');

const video = ytdl(url);
let starttime;
video.pipe(fs.createWriteStream(output));
video.once('response', () => {
  starttime = Date.now();
});
video.on('progress', (chunkLength, downloaded, total) => {
  const percent = downloaded / total;
  const downloadedMinutes = (Date.now() - starttime) / 1000 / 60;
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(`${(percent * 100).toFixed(2)}% downloaded`);
  process.stdout.write(`(${(downloaded / 1024 / 1024).toFixed(2)}MB of ${(total / 1024 / 1024).toFixed(2)}MB)\n`);
  process.stdout.write(`running for: ${downloadedMinutes.toFixed(2)}minutes`);
  process.stdout.write(`, estimated time left: ${(downloadedMinutes / percent - downloadedMinutes).toFixed(2)}minutes `);
  readline.moveCursor(process.stdout, 0, -1);
});
video.on('end', () => {
  process.stdout.write('\n\n');
});

app.get('/', (req, res) => {
	res.send('Hello World!');
	if(JSON.stringify(store) !== JSON.stringify({})) {
		
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

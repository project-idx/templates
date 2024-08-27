import fs from 'fs';
import https from 'https';

// Define the URLs of the files to download
const emulatorUrl = 'https://firebasestorage.googleapis.com/v0/b/firemat-preview-drop/o/emulator%2Fdataconnect-emulator-linux-v1.1.14?alt=media&token=a384e35b-2c0f-4602-9015-c1b1d16f2188';

// Define the file paths where the downloaded files will be saved
const emulatorFile = '/home/user/.cache/firebase/emulators/dataconnect-emulator-1.1.14';
const mkdirSync = (path) => {
  try {
    fs.mkdirSync(path, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }
};

mkdirSync('/home/user/.cache/firebase/emulators');

// Define a function to download a file from a URL to a specified file path
const download = (url, file) => {
  // Use the https module to make a GET request to the URL
  https.get(url, (res) => {
    // Create a write stream to the specified file
    const writeStream = fs.createWriteStream(file);

    // Pipe the response data from the GET request to the write stream
    res.pipe(writeStream);

    // Listen for the 'finish' event on the write stream, which indicates that the file has been downloaded
    writeStream.on('finish', () => {
      // Log a message to the console indicating that the file has been downloaded
      console.log(`Downloaded ${file}`);
      fs.chmodSync(file, 0o755);
    });
  });
};

download(emulatorUrl, emulatorFile);

#!/usr/bin/env node

"use strict";

const path = require('path');
const fs = require('fs');
const getStdin = require('get-stdin');

let args = require('minimist')(process.argv.slice(2), {
  boolean: ['help', 'in'],
  string: ['file',]
});

const BASE_PATH = path.resolve(process.env.BASE_PATH || __dirname);

if (args.help || process.argv.length <= 2) {
  error(null, true);
}
else if (args._.includes('_') || args.in) {
  getStdin()
    .then(processFile)
    .catch(error);
}
else if (args.file) {
  let filePath = path.join(BASE_PATH, args.file);
  fs.readFile(filePath, (err, contents) => {
    if (err) error(err.toString());
    else processFile(contents.toString());
  });
}
else {
  error('Incorrect usage', true);
}

function printHelp() {
  console.log("ex1 usage:");
  console.log("");
  console.log("--help                      print this help");
  console.log("-, --in                     read file from stdin");
  console.log("--file={FILENAME}           read file from {FILENAME}");
  console.log("");
  console.log("");
}

function error(err, showHelp = false) {
  process.exitCode = 1;
  console.error(err);
  if (showHelp) {
    console.log("");
    printHelp();
  }
}

function processFile(text) {
  text = text.toUpperCase();
  process.stdout.write(text);
}
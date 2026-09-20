'use strict';

function timestamp(seconds, separator) {
  const safe = Math.max(0, Number(seconds) || 0);
  const wholeSeconds = Math.floor(safe);
  const hours = Math.floor(wholeSeconds / 3600);
  const minutes = Math.floor((wholeSeconds % 3600) / 60);
  const secs = wholeSeconds % 60;
  const millis = Math.round((safe - wholeSeconds) * 1000);
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}${separator}${String(millis).padStart(3, '0')}`;
}

function validate(chunks) {
  if (!Array.isArray(chunks)) throw new TypeError('Input must be a JSON array of transcript chunks.');
  for (const chunk of chunks) {
    if (!Array.isArray(chunk.timestamp) || chunk.timestamp.length !== 2 || typeof chunk.text !== 'string') {
      throw new TypeError('Each chunk needs a text string and a two-item timestamp array.');
    }
  }
}

function toSrt(chunks) {
  validate(chunks);
  return chunks.map((chunk, index) => `${index + 1}\n${timestamp(chunk.timestamp[0], ',')} --> ${timestamp(chunk.timestamp[1], ',')}\n${chunk.text.trim()}`).join('\n\n');
}

function toVtt(chunks) {
  validate(chunks);
  const cues = chunks.map((chunk) => `${timestamp(chunk.timestamp[0], '.')} --> ${timestamp(chunk.timestamp[1], '.')}\n${chunk.text.trim()}`).join('\n\n');
  return `WEBVTT\n\n${cues}`;
}

module.exports = { timestamp, toSrt, toVtt };

if (require.main === module) {
  if (process.argv[2] === '--self-test') {
    const sample = [{ timestamp: [0, 1.25], text: 'A caption line.' }];
    if (toSrt(sample) !== '1\n00:00:00,000 --> 00:00:01,250\nA caption line.') throw new Error('SRT self-test failed.');
    if (toVtt(sample) !== 'WEBVTT\n\n00:00:00.000 --> 00:00:01.250\nA caption line.') throw new Error('VTT self-test failed.');
    console.log('Self-test passed.');
  } else {
    const [inputPath, format] = process.argv.slice(2);
    if (!inputPath || !['srt', 'vtt'].includes(format)) {
      console.error('Usage: node subtitle-export.cjs chunks.json <srt|vtt>');
      process.exitCode = 1;
    } else {
      const chunks = JSON.parse(require('fs').readFileSync(inputPath, 'utf8'));
      process.stdout.write(`${format === 'srt' ? toSrt(chunks) : toVtt(chunks)}\n`);
    }
  }
}

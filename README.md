# Local Transcript Assets


Small, reusable assets from a browser-based transcription workflow. They are intended for people building or evaluating local audio/video transcription experiences.


## Included


- `browser-transcription-benchmark.csv` records one measured browser run, including media duration and the page's reported local decode-plus-transcription time.
- `input-format-notes.md` describes the file-input behavior used by the tool.
- `subtitle-export.cjs` is a dependency-free utility that turns timestamped transcript chunks into SRT or WebVTT text.


## Use the subtitle exporter


```bash
node subtitle-export.cjs chunks.json srt > transcript.srt
node subtitle-export.cjs chunks.json vtt > transcript.vtt
node subtitle-export.cjs --self-test
```


The input JSON must be an array of objects with a `text` string and a two-item `timestamp` array measured in seconds:


```json
[
  { "timestamp": [0, 1.25], "text": "A caption line." }
]
```


## Scope of the measurement


The benchmark is a single measured run, not a performance claim or a cross-device limit. Browser, hardware, media format, and cached model state can change the result.


For the live, privacy-first browser tool that these assets document, see [Instagram to Text](https://clipstotext.com.co/).


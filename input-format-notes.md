# Local media input notes

The documented interface accepts a single local audio or video file. It presents these examples to visitors:

- MP3
- M4A
- WAV
- MP4
- WebM

The file input uses the browser's `audio/*,video/*` acceptance filter. Actual decoding remains browser-dependent: a visitor can select a format only if that browser can decode it. The workflow does not submit the selected media file to the website or a transcription API.

The interface offers automatic language detection and individual language choices. It does not state a duration or file-size limit because no reliable cross-device limit has been measured.

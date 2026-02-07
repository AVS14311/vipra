# Sound Effects for Valentine's Week Pages

This folder should contain the following audio files for the interactive sound effects:

## Required Audio Files:

1. **pop.mp3** - Light popping sound
   - Used when: Unwrapping chocolates
   - Suggested: Short, gentle pop sound (100-200ms)

2. **heart.mp3** - Heart/love sound
   - Used when: Clicking love-related buttons, giving roses
   - Suggested: Soft heartbeat or romantic chime (300-500ms)

3. **kiss.mp3** - Kiss sound
   - Used when: Blowing kisses on Kiss Day
   - Suggested: Kissing sound effect (200-400ms)

4. **click.mp3** - Click/tap sound
   - Used when: General button interactions
   - Suggested: Soft click or tap sound (50-150ms)

5. **success.mp3** - Success/celebration sound
   - Used when: Achieving milestones, matching memory cards, sealing promises
   - Suggested: Chime, bells, or celebration sound (500-1000ms)

## How to Add Audio Files:

1. Find or create the audio files (MP3 format recommended)
2. Place them in this folder: `public/sounds/`
3. Ensure the filenames match exactly: `pop.mp3`, `heart.mp3`, `kiss.mp3`, `click.mp3`, `success.mp3`

## Free Sound Resources:

- **Freesound.org** - https://freesound.org/
- **Zapsplat.com** - https://www.zapsplat.com/
- **Mixkit.co** - https://mixkit.co/free-sound-effects/

## Note:

If audio files are not present, the sound effects will silently fail and won't interrupt the user experience. The haptic feedback (vibrations on mobile) will still work!

## Volume:

All sounds are played at 30% volume by default. You can adjust this in:
`src/utils/interactions.js` - line: `audio.volume = 0.3`

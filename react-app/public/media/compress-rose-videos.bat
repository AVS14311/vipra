@echo off
REM Compress Rose Day videos to reduce size (max 720p, good quality).
REM Requires FFmpeg: https://ffmpeg.org/download.html or: winget install FFmpeg
set MEDIA=%~dp0
cd /d "%MEDIA%"

where ffmpeg >nul 2>&1
if errorlevel 1 (
  echo FFmpeg not found. Install from https://ffmpeg.org or run: winget install FFmpeg
  pause
  exit /b 1
)

for %%F in ("Rose Video.mp4" "Rose 2.mp4" "Rose 3.mp4") do (
  echo Compressing %%F ...
  ffmpeg -y -i "%%F" -vf "scale=-2:480" -c:v libx264 -crf 32 -preset slow -c:a aac -b:a 64k -movflags +faststart "%%~nF_compressed.mp4"
  if not errorlevel 1 (
    del "%%F"
    ren "%%~nF_compressed.mp4" "%%F"
    echo Done: %%F
  ) else (
    echo Failed: %%F
  )
)
echo All done.
pause

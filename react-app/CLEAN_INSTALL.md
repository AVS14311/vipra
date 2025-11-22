# Clean Install Instructions

If you're still getting Tailwind errors, run these commands:

```bash
cd react-app
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

This will do a complete fresh install.


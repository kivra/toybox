npx tsc --project tsconfig-build.json
rm -r dist/webapp
cp -r src/webapp dist/
chmod +x dist/cli/cli.js

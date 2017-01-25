const fsp = require("fs-p");
const fs = require("fs");

(async function() {
    try {
        await fsp.copy('./package.json', './dist/package.json');
        const packageJson = await fsp.readJson('./dist/package.json');
        delete packageJson.devDependencies;
        delete packageJson.scripts;
        await fsp.writeJson('./dist/package.json', packageJson, {spaces: 2});

        await fsp.copy('./platforms', './dist/platforms');
        await fsp.copy('./MicrosoftBand.d.ts', './dist/MicrosoftBand.d.ts');
        await fsp.copy('./README.md', './dist/README.md');

        let indexText = fs.readFileSync('./dist/index.js').toString();
        indexText = indexText.replace(/.ios/g, '');
        fs.writeFileSync('./dist/index.js', indexText);

    } catch (err) { console.error(err) }
}());

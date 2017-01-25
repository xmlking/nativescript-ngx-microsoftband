const fsp = require("fs-p");

(async function() {
    try {
        await fsp.copy('./package.json', './dist/package.json');
        const packageJson = await fsp.readJson('./dist/package.json');
        delete packageJson.devDependencies;
        delete packageJson.scripts;
        await fsp.writeJson('./dist/package.json', packageJson, {spaces: 2});

        await fsp.copy('./platforms', './dist/platforms');
        await fsp.copy('./MicrosoftBand.d.ts', './dist/MicrosoftBand.d.ts');
        await fsp.copy('./dist/src/app/services/microsoftband.service.ios.d.ts', './dist/src/app/services/microsoftband.service.d.ts');
        await fsp.copy('./dist/src/app/services/microsoftband.service.ios.d.ts', './dist/esm/src/app/services/microsoftband.service.d.ts');
        await fsp.copy('./README.md', './dist/README.md');

    } catch (err) { console.error(err) }
}());

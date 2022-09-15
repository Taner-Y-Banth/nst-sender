import { writeFile } from 'fs/promises';
import minimist from 'minimist';
import { NstrumentaClient } from 'nstrumenta';
import ws from 'ws';

const argv = minimist(process.argv.slice(2));
const wsUrl = argv.wsUrl;
const nstClient = new NstrumentaClient();

nstClient.addListener("open", () => {

    process.stdin.on('data', data => {

        const string = data.toString();
        const stringArray = string.split('\r\n');
        nstClient.send('prompt', stringArray[0]);
    
    });
    nstClient.addSubscription('postprocessing', async (msg) => {
        console.log('Your message: ' + msg);
    });
});




console.log("nstrumenta connect");

nstClient.connect({ wsUrl, nodeWebSocket: ws });
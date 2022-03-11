
import fs from 'fs';
import Events from 'events'; // This is class
import { Logger } from './logger';
import http from 'http';
const server = http.createServer((req, res)=> {
    if (req.url === '/'){
        res.write('hello world');
        res.end();
    }
    if (req.url === '/home/23'){
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
})
server.listen(3000);
console.log('listening on port 3000....');


const logger = new Logger();

// Register a listener or handle events
logger.on('massageLog', lister)

function lister(e : object ) : void {
    console.log("event massageLoge are raised !!" , e);

}
logger.log('this is method now ');
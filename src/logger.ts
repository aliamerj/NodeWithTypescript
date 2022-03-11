import EventEmitter from 'events';


let url : string = "http://amerson.com";

export class Logger extends EventEmitter {

      log (message : string): void{
        console.log(message);
    
        // Raise an event 
        this.emit('massageLog', {id : 1 , ulr : url });
    
}
}

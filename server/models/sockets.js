const BandList = require("./band-list");

class Sockets {

    constructor(io) {
        this.io = io;

        this.bandList = new BandList();

        this.socketsEvents();
    }

    socketsEvents() {
        
        this.io.on('connection', ( socket ) => { 
            
            console.log("Cliente conectado")

            //Emitir al cliente conectado todas las bandas actuales
            socket.emit('current-bands', this.bandList.getBands())

            socket.on('vote-band', id => {
                this.bandList.increaseVotes(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            socket.on('delete-band', id => {
                this.bandList.removeBand(id)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            socket.on('change-band', band => {
                this.bandList.changeName(band.id, band.name)
                this.io.emit('current-bands', this.bandList.getBands())
            })

            socket.on('new-band', name => {
                this.bandList.addBand(name)
                this.io.emit('current-bands', this.bandList.getBands())
            })
        
        });
    
    }

}

module.exports = Sockets

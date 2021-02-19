import { useContext, useState } from "react";
import { SocketContext } from "../context/SocketContext";

const BandAdd = () => {
    
    const [ addBand, setAddBand ] = useState<string>('')

    const { socket } = useContext<any>(SocketContext)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(addBand.trim().length > 0){
            socket.emit('new-band', addBand)
            setAddBand('')
        }
    }
    
    return (
        <div>

            <form
                onSubmit={handleSubmit}
            >
                <input 
                    className="form-control"
                    placeholder="Nuevo nombre de la banda"
                    value={addBand}
                    onChange={(e) => setAddBand(e.target.value)}
                />

                <button
                    className="btn btn-primary btn-block mt-2"
                    type="submit"
                >
                    Agregar
                </button>
            </form>
        </div>
    )

}

export default BandAdd;

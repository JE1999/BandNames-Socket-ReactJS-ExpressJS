import { useState, useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

import { IBands } from "../types/band";


const BandList = () => {

    const { socket, bands, setBands } = useContext<any>(SocketContext)

    const handleName = (e: React.FormEvent<HTMLInputElement>, id: string) => {
        const newName = e.currentTarget.value;

        setBands((bands: IBands[]) => bands.map(band => {
            if(band.id === id){
                band.name = newName;
            }
            return band;
        }))
    }

    const handleOnBlur = (id: string, name: string) => {
        socket.emit('change-band', {id, name})
    }

    const vote = (id: string) => {
        socket.emit('vote-band', id)
    }

    const handleDelete = (id: string) => {
        socket.emit('delete-band', id)
    }

    const createRows = () => {
        return (
            bands.map((band: IBands) => (
                <tr key={band.id}>
                    <td>
                        <button 
                            className="btn btn-primary"
                            onClick={() => vote(band.id)}
                        >+1</button>
                    </td>
                    <td>
                        <input
                            className="form-control"
                            value={band.name}
                            onChange={(e) => handleName(e, band.id)}
                            onBlur={() => handleOnBlur(band.id, band.name)}
                        />
                    </td>
                    <td>
                        <h3>{band.votes}</h3>
                    </td>
                    <td>
                        <button
                            className="btn btn-danger"
                            onClick={() => handleDelete(band.id)}
                        >
                            Borrar
                        </button>
                    </td>
                </tr>
            ))
        )
    }

    return (
        <div>
            <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>Nombre</th>
                        <th>Votos</th>
                        <th>Borrar</th>
                    </tr>
                </thead>
                <tbody>
                    { createRows() }
                </tbody>
            </table>
        </div>
    )

}

export default BandList;

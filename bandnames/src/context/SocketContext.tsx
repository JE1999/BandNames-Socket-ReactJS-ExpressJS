import { useState, useEffect, createContext } from "react";
import useSocket from "../hooks/useSocket";
import { IBands } from "../types/band";

export interface IContext {
    socket: object;
    online: boolean;
    bands: IBands[];
    setBands: Function;
}

interface IChildren {
    children: React.ReactNode
}

export const SocketContext = createContext<IContext>(null!);

export const SocketProvider = ({children}: IChildren) => {

    const { socket, online } = useSocket('http://localhost:8080');

    const [ bands, setBands ] = useState<IBands[]>([])

    useEffect(() => {

        socket.on('current-bands', (bands: IBands[]) => {
            setBands(bands)
        })

    }, [socket])

    return (
        <SocketContext.Provider
            value={{
                socket,
                online,
                bands,
                setBands
            }}
        >
            {children}
        </SocketContext.Provider>
    )
}

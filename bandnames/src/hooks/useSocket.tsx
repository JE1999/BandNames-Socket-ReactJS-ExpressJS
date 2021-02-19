import { useMemo, useState, useEffect } from 'react';
import io from 'socket.io-client'
    
const useSocket = (serverPath: string) => {
        
    const socket = useMemo(() => io.connect(serverPath, 
        {transports: ['websocket']}
    ), [serverPath])

    const [ online, setOnline ] = useState<boolean>(false)

    useEffect(() => {
        setOnline( socket.connected )
    }, [socket])
    
    useEffect(() => {
        socket.on('connect', () => {
            setOnline(true)
        })
    }, [socket])
    
    useEffect(() => {
        socket.on('disconnect', () => {
            setOnline(false)
        })
    }, [socket])

    return {
        socket,
        online
    }

}

export default useSocket;

import App from "./App";
import { SocketProvider } from "./context/SocketContext";

const BandNames = () => {

    return (
        <SocketProvider>
            <App />
        </SocketProvider>
    )

}

export default BandNames;

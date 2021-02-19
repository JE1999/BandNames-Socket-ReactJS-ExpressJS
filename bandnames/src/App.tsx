import { useContext } from 'react';

import BandAdd from './components/BandAdd'
import BandList from './components/BandList'
import BandChart from './components/BandChart'

import { SocketContext } from './context/SocketContext';

function App() {
  
  const { online } = useContext(SocketContext)

  return (
    <>
      <p className="m-2">
        Status:
        {online 
          ? <span className="text-success"> Online</span>
          : <span className="text-danger"> Offline</span>
        }
      </p>

      <div className="container">
        <h1 className="text-center my-5">BandNames JE</h1>

        <div className="row">
          <div className="col-12 my-2">
            <BandAdd />
          </div>
          <div className="col-12 my-2">
            <BandList />
          </div>
          <div className="col-12 my-2">
            <BandChart />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

import { Home } from './components/Home';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container-fluid custom-home-container">
      <div className='row'>
        <div className='col-12'>
          <Home/>
        </div>
      </div>
    </div>
  );
}

export default App;

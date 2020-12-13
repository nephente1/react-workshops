import './App.css';
import { AddComponent } from './components/AddComponent/AddComponent';
import { Counter } from './components/Counter/Counter';

function App() {
  return (
    <div className="App">
      <AddComponent />
      <Counter start={0} />
    </div>
  );
}

export default App;

//npm test -- -u => przerenderowanie testu

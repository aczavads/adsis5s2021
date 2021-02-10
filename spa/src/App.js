import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/HelloWorld';

function App() {
  var mensagens = "";
  for (let index = 0; index < 10; index++) {
    mensagens += "Ulha! ";
  }
  return (
    <div>
      <div>{mensagens}</div>
      <HelloWorld></HelloWorld>
    </div>
  );
}

export default App;

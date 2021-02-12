import logo from './logo.svg';
import './App.css';
import HelloWorld from './components/hello-world';
import ContadorBasico from './components/contador-basico';
import ContadorNovo from './components/contador-novo';

function App() {
  var mensagens = "";
  for (let index = 0; index < 10; index++) {
    mensagens += "Ulha! ";
  }
  return (
    <div>
      <div>{mensagens}</div>
      <ContadorNovo valorInicial="0" valorMaximo="30"></ContadorNovo>
      <ContadorNovo valorInicial="50" valorMaximo="70"></ContadorNovo>
      <HelloWorld></HelloWorld>
      <ContadorBasico></ContadorBasico>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from 'react';

const ContadorNovo =  (props) => {
    //var valorAtual = parseInt(props.valorInicial);
    const [valorAtual, setValorAtual] = useState(parseInt(props.valorInicial));

    const aoClicarMais = () => {
        //valorAtual = valorAtual + 1;
        //console.log(valorAtual);
        if (valorAtual < parseInt(props.valorMaximo)) {
            setValorAtual(valorAtual+1);
        } else {
            alert(`Valor máximo atingido! [${props.valorMaximo}]`);
        }
    }
    const aoClicarMenos = () => {
        if (valorAtual > parseInt(props.valorInicial)) {
            setValorAtual(valorAtual-1);
        } else {
            alert(`Valor inicial atingido! [${props.valorInicial}]`);
        }
    }

    //Quando o [valorAtual] mudar, execute a função vinculada.
    useEffect( () => {
        console.log(valorAtual);
    }, [valorAtual]);
    
    return (
        <div>Contador novo de {props.valorInicial} a {props.valorMaximo}. Atual={valorAtual}
            <button onClick={ aoClicarMais }>+</button>
            <button onClick={ aoClicarMenos }>-</button>
        </div>
    )
}



export default ContadorNovo;


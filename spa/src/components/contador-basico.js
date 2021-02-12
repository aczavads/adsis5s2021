import React, { useState, useEffect } from 'react';

const ContadorBasico = (props) => {
    const [valor, setValor] = useState(-1);

    useEffect( () => {
        console.log(`Novo valor! ${valor}`);
    },[valor]);

    return (
        <div>Contador: {valor} 
            <button onClick={() => setValor(valor + 1)}>+</button>
        </div>
    )
}

export default ContadorBasico;
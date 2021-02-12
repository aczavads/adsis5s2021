import React, { useEffect, useState } from 'react';
import axios from '../util/axios-default';

function HelloWorld() {
    const [mensagem, setMensagem] = useState("xiii!");

    useEffect(async () => {
        const resposta = await axios.get("/api/hello");    
        setMensagem(resposta.data);
    },[]);
    
    return (
        <h3>{mensagem}</h3>
    );
}

export default HelloWorld;
import React, { useState, useEffect } from 'react';

function PaisEdit() {
    const [pais, setPais] = useState({sigla:"", nome: ""});
    const [paisSalvo, setPaisSalvo] = useState(false);

    useEffect(() => {
        console.log(pais);
    });

    const handleSalvar = (event) => {
        setPaisSalvo(true);
    }
    const handleSubmit = (event) => {
        event.preventDefault();
    }
    const handleChange = (event) => {
        //console.log(event.target.name + "==>" + event.target.value);
        const novoPais = {...pais, [event.target.name]: event.target.value}
        setPais(novoPais);        
    }
    const renderPaisSalvo = () => {
        if (paisSalvo) {
            return (
                <div>{pais.nome} {pais.sigla}</div> 
            )
        }
        return (<div></div>);
    }
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Edição de País</h2>
                <hr></hr>
                <div>Sigla:<input type="text" name="sigla" onChange={handleChange}></input></div>
                <div>Nome:<input type="text" name="nome" onChange={handleChange}></input></div>
                <button onClick={handleSalvar}>Salvar</button>
            </form>
            {renderPaisSalvo()}
        </div>
    );
}

export default PaisEdit;
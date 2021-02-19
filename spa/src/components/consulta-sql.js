import React, { useEffect, useState } from 'react';


function ConsultaSql() {
    const [consulta, setConsulta] = useState({sql: ""});
    
    useEffect(() => {
        // console.log(consulta);
    });
    
    const onChangeConsulta = (event) => {
        setConsulta({...consulta, sql: event.target.value});
    }

    const handleSubmit = (event) => {
        console.log(consulta);
        event.preventDefault();
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                Digite sua consulta SQL:
                <input type="text" name="consulta" onChange={onChangeConsulta} ></input>
                <button type="submit">Executar</button>
            </form>
        </div>
    );
}

export default ConsultaSql;
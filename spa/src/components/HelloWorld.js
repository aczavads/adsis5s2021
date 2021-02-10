import React, { Component } from 'react';
import axios from 'axios';

function HelloWorld() {
    var resposta = "oi";
    axios.get("http://localhost:8080/api/hello").then(function(response) {
        resposta = response.data;
        console.log(resposta);
    });
    return (
        <h3>{resposta}</h3>
    );
}

export default HelloWorld;
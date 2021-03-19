import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Menu from '../landing/menu';


const ProdutoList = () => {
    const [produtos, setProdutos] = useState([]);
    const [termoDePesquisa, setTermoDePesquisa] = useState("");
    const [pagina, setPagina] = useState({pageNumber: 0, totalPages: 0});

    useEffect(()=> {
        getProdutosFromServer();
    },[])

    const getProdutosFromServer = async (pageNumber) => {
        const response = await axios.get(`/api/produtos?termoDePesquisa=${termoDePesquisa}&page=${pageNumber}`);
        setProdutos(response.data.content);
        setPagina({pageNumber: response.data.pageable.pageNumber, totalPages : response.data.totalPages});
    }

    const deleteProdutoFromServer = async (id) => {      
        if (!window.confirm("Você realmente quer excluir?")) {
            return;
        }  
        const response = await axios.delete(`/api/produtos/${id}`);
        getProdutosFromServer(0);
    }


    const linhasDaTabelaDinâmico = produtos.map(elemento => {
        return (
            <tr key={elemento.id}>
                <td>{elemento.id}</td>
                <td>{elemento.descricao}</td>
                <td>{elemento.lancadoEm}</td>
                <td>{elemento.precoUnitario}</td>
                <td>
                    <button onClick={() => deleteProdutoFromServer(elemento.id)}>Excluir</button>
                    <Link to={`/produtos/editar/${elemento.id}`}>
                        <button>Editar</button>
                    </Link>
                </td>
            </tr>
        );
    });

    const handleChangeTermoDePesquisa = (event) => {
        setTermoDePesquisa(event.target.value);
    }
    const handlePesquisar = () => { 
        getProdutosFromServer();
    }
    const handleLimpar = () => {
        setTermoDePesquisa("");
        getProdutosFromServer(0);
    }
    const handlePreviousPage = () => {
        if (pagina.pageNumber-1 > 1) {
            getProdutosFromServer(pagina.pageNumber-1);
        }
    }
    const handleNextPage = () => {
        if (pagina.pageNumber+1 < pagina.totalPages) {
            getProdutosFromServer(pagina.pageNumber+1);
        }
    }

    return (
        <div>
            <Menu></Menu>
            <h2>Listagem de Produtos</h2>
            <hr></hr>
            <Link to="/produtos/incluir">
                <button type="submit">Novo Produto</button>
            </Link>
            <div>
                <input onChange={handleChangeTermoDePesquisa} value={termoDePesquisa} type="text"></input>
                <button onClick={handlePesquisar}>Pesquisar</button>
                <button onClick={handleLimpar}>Limpar</button>
            </div>
            <div>
                <button onClick={handlePreviousPage}> {"<"} </button>
                {(pagina.pageNumber+1) + "/" + pagina.totalPages}
                <button onClick={handleNextPage}> {">"} </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>descricao</th>
                        <th>Lançado Em</th>
                        <th>Preço Unitário</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {linhasDaTabelaDinâmico}
                </tbody>
            </table>
        </div>
    )
}

export default ProdutoList;

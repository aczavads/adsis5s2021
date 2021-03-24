import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
import Menu from '../landing/menu';
import { Button, Modal, Table, Container, Row } from 'react-bootstrap';


const ProdutoList = () => {
    const [produtos, setProdutos] = useState({ content: [], pageable: { pageNumber: 0 }, totalPages: 0 });
    const [termoDePesquisa, setTermoDePesquisa] = useState("");
    const [idParaExcluir, setIdParaExcluir] = useState(null);

    useEffect(() => {
        getProdutosFromServer();
    }, [])

    const handleCloseModalExclusão = () => setIdParaExcluir(null);
    const handleShowModalExclusão = (id) => setIdParaExcluir(id);

    const modalExclusão = () => {
        return (
            <Modal show={idParaExcluir !== null} onHide={handleCloseModalExclusão}>
                <Modal.Header closeButton>
                    <Modal.Title>Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>Confirma a exclusão deste produto?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModalExclusão}>
                        Cancelar
              </Button>
                    <Button variant="danger" onClick={() => { deleteProdutoFromServer(idParaExcluir) }}>
                        Excluir
              </Button>
                </Modal.Footer>
            </Modal>
        );
    }


    const getProdutosFromServer = async (pageNumber) => {
        const response = await axios.get(`/api/produtos?termoDePesquisa=${termoDePesquisa}&page=${pageNumber}`);
        setProdutos(response.data);
    }

    const deleteProdutoFromServer = async (id) => {
        // if (!window.confirm("Você realmente quer excluir?")) {
        //     return;
        // }  
        const response = await axios.delete(`/api/produtos/${id}`);
        setIdParaExcluir(null);
        getProdutosFromServer(0);
    }


    const linhasDaTabelaDinâmico = produtos.content.map(elemento => {
        return (
            <tr key={elemento.id}>
                <td>{elemento.id}</td>
                <td>{elemento.descricao}</td>
                <td>{elemento.lancadoEm}</td>
                <td>{elemento.precoUnitario}</td>
                <td>
                    <Button variant="danger" onClick={() => handleShowModalExclusão(elemento.id)}>Excluir</Button>
                    <Link to={`/produtos/editar/${elemento.id}`}>
                        <Button variant="primary">Editar</Button>
                    </Link>
                </td>
            </tr>
        );
    });

    const handleChangeTermoDePesquisa = (event) => {
        setTermoDePesquisa(event.target.value);
    }
    const handlePesquisar = () => {
        getProdutosFromServer(0);
    }
    const handleLimpar = () => {
        setTermoDePesquisa("");
        getProdutosFromServer(0);
    }
    const handlePreviousPage = () => {
        if (produtos.pageable.pageNumber - 1 >= 0) {
            getProdutosFromServer(produtos.pageable.pageNumber - 1);
        }
    }
    const handleNextPage = () => {
        if (produtos.pageable.pageNumber + 1 < produtos.totalPages) {
            getProdutosFromServer(produtos.pageable.pageNumber + 1);
        }
    }


    return (
        <div>
            <Menu></Menu>
            {modalExclusão()}
            <h2>Listagem de Produtos</h2>
            <hr></hr>
            <Container>
                <Row>
                    <Link to="/produtos/incluir">
                        <Button variant="success" type="submit">Novo Produto</Button>
                    </Link>
                    <div>
                        <Button onClick={handlePreviousPage}> {"<"} </Button>
                        {(produtos.pageable.pageNumber + 1) + "/" + produtos.totalPages}
                        <Button onClick={handleNextPage}> {">"} </Button>
                    </div>
                    <div>
                        <input onChange={handleChangeTermoDePesquisa} value={termoDePesquisa} type="text"></input>
                        <button variant="primary" onClick={handlePesquisar}>Pesquisar</button>
                        <button variant="primary" onClick={handleLimpar}>Limpar</button>
                    </div>
                </Row>
            </Container>
            <Table striped bordered hover>
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
            </Table>
        </div>
    )
}

export default ProdutoList;


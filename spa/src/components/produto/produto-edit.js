import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useHistory, useParams } from 'react-router-dom';
import { AsyncTypeahead as Typeahead } from 'react-bootstrap-typeahead';


const ProdutoEdit = () => {
    const history = useHistory();
    const { idParaEditar } = useParams();
    const emModoDeEdição = idParaEditar !== undefined;
    const [produto, setProduto] = useState({ descricao: "", lancadoEm: "", precoUnitario: 0.00 });
    const [corSelecionada, setCorSelecionada] = useState([]);
    const [coresPesquisadas, setCoresPesquisadas] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const searchCores = (query) => {
        setIsLoading(true)
        console.log("Searching for cores: " + query);

        //Alterar este ponto para fazer o get em /api/cores, filtrando pelo nome da cor (na coleção mesmo)
        const coresFixas = [{id: 1, nome: "Azul"}, {id: 2, nome:"Verde"}];

        setCoresPesquisadas(coresFixas);

        setIsLoading(false);
    }

    const doGetById = async () => {
        const result = await axios.get(`/api/produtos/${idParaEditar}`);
        setProduto(result.data);
        console.log(result.data);
    }

    useEffect(() => {
        if (emModoDeEdição) {
            doGetById();
        }
    }, []);

    useEffect(() => {
        if (corSelecionada.length == 1) {
            console.log(">>> cor selecionada:" + corSelecionada[0].id + "," + corSelecionada[0].nome);
        }
    }, [corSelecionada]);


    const doPost = async () => {
        const result = await axios.post("/api/produtos", produto);
        history.push("/produtos");
    }

    const doPut = async () => {
        const result = await axios.put(`/api/produtos/${idParaEditar}`, produto);
        history.push("/produtos");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (emModoDeEdição) {
            doPut();
        } else {
            doPost();
        }
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        //console.log(name + "==>" + value);
        const novaCor = { ...produto, [name]: value };
        setProduto(novaCor);
        console.log(novaCor);
    }

    console.log(idParaEditar);
    return (
        <div>
            <h2>{emModoDeEdição ? "Edição de Produto" : "Inclusão de Produto"}</h2>
            <hr></hr>
            <form onSubmit={handleSubmit}>

                <div>Descrição:
                    <input type="text" name="descricao" value={produto.descricao} onChange={handleInputChange}></input>
                </div>

                <div>Lançado em:
                    <input type="date" name="lancadoEm" value={produto.lancadoEm} onChange={handleInputChange}></input>
                </div>

                <div>Preço unitário:
                    <input type="text" name="precoUnitario" value={produto.precoUnitario} onChange={handleInputChange}></input>
                </div>
                <Typeahead
                    isLoading={isLoading}
                    filterBy={() => true}
                    id="basic-typeahead-single"
                    labelKey="nome"
                    onChange={setCorSelecionada}
                    onSearch={searchCores}
                    options={coresPesquisadas}
                    placeholder="Escolha uma cor..."
                    selected={corSelecionada}
                />

                <button type="submit">Enviar</button>
                <Link to="/produtos">Voltar</Link>
            </form>
        </div>
    );
}


export default ProdutoEdit;
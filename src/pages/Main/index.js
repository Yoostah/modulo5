import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { FaGithubAlt, FaPlus, FaSpinner, FaTrash } from 'react-icons/fa';
import Container from '../../components/Container';
import { Form, SubmitButton, List, ErrorMsg } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    error: false,
    errorMsg: '',
  };

  // Inicialização do componente, busca as informções da sessionStorage
  componentDidMount() {
    const repositories = localStorage.getItem('repositories');
    // console.log(repositories);
    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) });
    }
  }

  // Se algum repositorio for adicionado, salva no sessionStorage
  componentDidUpdate(_, prevState) {
    const { repositories } = this.state;

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories));
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value });
  };

  handleSubmit = async e => {
    e.preventDefault();

    this.setState({ loading: true });

    const { newRepo, repositories } = this.state;

    try {
      const response = await api.get(`/repos/${newRepo}`);

      const data = {
        name: response.data.full_name,
      };

      const checkRepoExists = repositories.find(repo => {
        return repo.name.indexOf(newRepo) !== -1;
      });

      if (checkRepoExists) {
        throw new Error('This repository is already added');
      } else {
        this.setState(prevState => ({
          repositories: [...repositories, data],
          newRepo: '',
          loading: false,
          error: !prevState,
        }));
      }
    } catch (error) {
      this.setState({ loading: false, error: true, errorMsg: error.message });
    }
  };

  handleDelete(repoName) {
    const { repositories } = this.state.repositories;
    this.setState(prevState => ({
      repositories: [
        ...repositories,
        repositories.filter(repo => repo.name !== repoName),
      ],
    }));
  }

  render() {
    const { newRepo, loading, repositories, error, errorMsg } = this.state;
    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositórios
        </h1>
        <Form onSubmit={this.handleSubmit} error={error}>
          <input
            type="text"
            placeholder="Adicionar Repositório"
            value={newRepo}
            onChange={this.handleInputChange}
          />

          <SubmitButton loading={loading ? true : undefined}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        {error && <ErrorMsg>{errorMsg}</ErrorMsg>}
        <List>
          {repositories.map(repository => (
            <li key={repository.name}>
              <span>{repository.name}</span>
              <div>
                <Link to={`/repository/${encodeURIComponent(repository.name)}`}>
                  Detalhes
                </Link>
                <FaTrash onClick={() => this.handleDelete(repository.name)} />
              </div>
            </li>
          ))}
        </List>
      </Container>
    );
  }
}

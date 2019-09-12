import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import api from '../../services/api';
import { Loading, Owner, IssueList, StateStatus, Pagination } from './styles';
import Container from '../../components/Container';

class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  constructor() {
    super();

    this.state = {
      repository: {},
      issues: [],
      loading: true,
      selectedOption: 'open',
      page: 0,
    };
    this.findRepoData = this.findRepoData.bind(this);
  }

  async componentDidMount() {
    this.findRepoData();
  }

  async componentDidUpdate() {
    this.findRepoData();
  }

  async findRepoData() {
    const { match } = this.props;
    const { selectedOption, page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: selectedOption,
          per_page: 5,
          page: page !== 0 ? page : undefined,
        },
      }),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  issuesFilter(state) {
    this.setState({ selectedOption: state });
  }

  toPage(newPage) {
    this.setState({ page: newPage });
  }

  render() {
    const { repository, issues, loading, selectedOption, page } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos Repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <StateStatus>
          <h1>Issues State</h1>
          <div>
            <label>
              <input
                type="radio"
                name="state"
                value="open"
                checked={selectedOption === 'open'}
                onChange={() => this.issuesFilter('open')}
              />
              <strong>Open</strong>
            </label>
            <label>
              <input
                type="radio"
                name="state"
                value="closed"
                checked={selectedOption === 'closed'}
                onChange={() => this.issuesFilter('closed')}
              />
              <strong>Closed</strong>
            </label>
            <label>
              <input
                type="radio"
                name="state"
                value="all"
                checked={selectedOption === 'all'}
                onChange={() => this.issuesFilter('all')}
              />
              <strong>All</strong>
            </label>
          </div>
        </StateStatus>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span>{label.name}</span>
                  ))}
                </strong>
                <span className={issue.state}>{issue.state}</span>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <Pagination>
          {page !== 0 ? (
            <button
              className="btnPrev"
              onClick={() => this.toPage(parseInt(page) - 1)}
            >
              Previous Issues
            </button>
          ) : (
            <div />
          )}
          <p className="issuesCount">{`Showing ${parseInt(page) * 5 +
            1} to ${(parseInt(page) + 1) * 5} issues`}</p>
          <button
            className="btnNext"
            onClick={() => this.toPage(parseInt(page) + 1)}
          >
            Next Issues
          </button>
        </Pagination>
      </Container>
    );
  }
}

export default Repository;

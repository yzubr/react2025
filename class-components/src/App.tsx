import React from 'react';
import Results from './components/Results.tsx';
import ErrorBoundary from './components/ErrorBoundary';

interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

interface AppState {
  searchTerm: string;
  results: Character[];
  loading: boolean;
  error: string | null;
}

class App extends React.Component<unknown, AppState> {
  state: AppState = {
    searchTerm: '',
    results: [],
    loading: false,
    error: null,
  };

  componentDidMount() {
    const savedSearchTerm = localStorage.getItem('searchTerm') || '';
    this.setState({ searchTerm: savedSearchTerm }, this.fetchResults);
  }

  fetchResults = async () => {
    const { searchTerm } = this.state;
    const trimmedSearchTerm = searchTerm.trim();
    this.setState({ loading: true, error: null });

    try {
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${trimmedSearchTerm}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch results');
      }

      const data = await response.json();
      this.setState({ results: data.results, loading: false });
    } catch (error) {
      if (error instanceof Error) {
        this.setState({ error: error.message, loading: false });
      } else {
        this.setState({ error: 'Unknown error occurred', loading: false });
      }
    }
  };

  handleSearch = () => {
    const { searchTerm } = this.state;
    localStorage.setItem('searchTerm', searchTerm);
    this.fetchResults();
  };

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchTerm: event.target.value });
  };

  throwError = () => {
    throw new Error('Test error');
  };

  render() {
    const { searchTerm, results, loading } = this.state;

    return (
      <ErrorBoundary>
        <div>
          <section style={{ padding: '20px', background: '#f0f0f0' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={this.handleChange}
              placeholder="Search characters..."
              style={{ margin: '20px' }}
            />
            <button onClick={this.handleSearch}>Search</button>
          </section>

          <section style={{ padding: '20px' }}>
            {loading && <div>Loading...</div>}
            {!loading && results.length === 0 && <div>No results found.</div>}
            <Results results={results} />
          </section>
          <button onClick={this.throwError}>Throw Error</button>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;

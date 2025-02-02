import React from 'react';

interface Character {
  name: string;
  height: string;
  mass: string;
  gender: string;
  homeworld: string;
}

interface ResultsProps {
  results: Character[];
}

class Results extends React.Component<ResultsProps> {
  render() {
    const { results } = this.props;

    return (
      <div>
        {results.map((character, index) => (
          <div
            key={index}
            style={{
              margin: '10px 0',
              border: '1px solid #ccc',
              padding: '10px',
            }}
          >
            <h3>{character.name}</h3>
            <p>Height: {character.height}</p>
            <p>Mass: {character.mass}</p>
            <p>Gender: {character.gender}</p>
            <p>Homeworld: {character.homeworld}</p>
          </div>
        ))}
      </div>
    );
  }
}

export default Results;

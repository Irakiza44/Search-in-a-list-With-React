import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      stringg: "hello",
      result2: [],
      searchQuery: '',
      isLoading: true
    };
  }

  componentDidMount() {
    fetch("https://api.openweathermap.org/data/2.5/forecast?q=kigali&appid=1383c1ef39cccbbc106d269850cfc481")
      .then(result => result.json())
      .then(result2 => {
        this.setState({ result2, isLoading: false });
      })
      .catch(error => {
        console.error(error);
        this.setState({ isLoading: false });
      });
  }

  handleInputChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
    // console.log(searchQuery);
  };

  render() {
    const { result2, searchQuery, isLoading } = this.state;
    const filteredList = result2.list && result2.list.filter(res =>
      res.weather[0].description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
      <div className="App">
        <nav>
        <input onChange={this.handleInputChange} type='text'/>
        </nav>
        <section>
        {isLoading ? (
          <div className="loading">Loading...</div>
        ) : (
          filteredList.map(res =>
            <h1 className='prag' key={res.dt} >{res.weather[0].description}</h1>
          )
        )}
        </section>
      </div>
    );
  }
}

export default App;

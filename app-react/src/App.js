import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      result2: [],
      searchQuery: '',
      isLoading: true
    }
  }
  
  async componentDidMount() {
    try {
      const result = await fetch("https://api.openweathermap.org/data/2.5/forecast?q=kigali&appid=1383c1ef39cccbbc106d269850cfc481")
      const result2 = await result.json()
      this.setState({ result2, isLoading: false })
    } catch (error) {
      console.error(error);
      this.setState({ isLoading: false })
    }
  }
  
  handleInputChange = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
  }
  
  render() {
    const { result2, searchQuery, isLoading } = this.state;
    const filteredList = result2.list && result2.list.filter(res =>
      res.weather[0].description.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return (
      <div className="App">
        <input onChange={this.handleInputChange} type='text'></input>
        {isLoading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          filteredList && filteredList.map(res =>
            <p className='prag' key={res.dt}>{res.weather[0].description}</p>
          )
        )}
        {/* <button className="btn" onClick={this.message}>Click Me</button>  */}
      </div>
    );
  }
}

export default App;

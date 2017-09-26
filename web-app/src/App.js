import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Test as TestAPI } from './api'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      results: [],
      value: ''
    }
    this.testAPI = new TestAPI()
  }

  componentDidMount() {
    this.fetchResults()
  }

  fetchResults = async () => {
    this.setState({ status: 'loading' })
    try {
      let results = await this.testAPI.get({ path: '/test' })
      this.setState({ results, status: 'results' })
    } catch (err) {
      this.setState({ status: 'error' })
      console.error(err)
      alert('could not fetch results')
    }
  }

  addNew = async () => {
    if (this.state.value.trim() === '') {
      alert('invalid test name')
      return
    }
    this.setState({ status: 'loading' })
    try {
      let result = await this.testAPI.post({ path: '/test', data: { name: this.state.value } })
      let results = this.state.results
      results.push(result)
      this.setState({ results, status: 'results', value: '' })
    } catch (err) {
      this.setState({ status: 'error' })
      alert('could not add new test')
    }
  }

  remove = async(id) => {
    this.setState({ status: 'loading' })
    try {
      await this.testAPI.del({ path: `/test/${id}` })
      let results = this.state.results
      for (let i = 0; i < results.length; i++) {
        let result = results[i]
        if (result._id === id) {
          results.splice(i, 1)
          break
        }
      }
      this.setState({ results, status: 'results' })
    } catch (err) {
      this.setState({ status: 'error' })
      alert('could not delete test item')
    }
  }

  renderResults = () => {
    return (
      <div>
        {this.state.results.map(result => {
          return <p key={result._id}>{result.name} <button onClick={() => this.remove(result._id)}>x</button></p>
        })}
      </div>
    )
  }

  render() {

    let listUI = <p>loading...</p>
    if (this.state.status === 'error')
      listUI = <p>error</p>
    else if (this.state.status === 'results')
      listUI = this.renderResults()

    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to Coding Exercise</h2>
        </div>
        <div className="App-intro">
          <div style={{ height: 50, padding: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <input
                maxLength={50}
                style={{ height: 25, width: 200, display: 'inline-block', marginRight: 10 }}
                value={this.state.value}
                onChange={(ev) => { this.setState({ value: ev.target.value }) }} />
              <button style={{ width: 30, height: 30, fontSize: '20px' }} onClick={this.addNew}>+</button>
            </div>
          </div>
          {listUI}
        </div>
      </div>
    );
  }
}

export default App;

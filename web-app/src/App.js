import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import { Contact as ContactsAPI } from './api'

/*
  !!! ACHTUNG

  Steven told me to write this...
  He said Jason knows this is shitty organization but not in his words as he was very polite. This was a coding exercise and time was a constraint yet this part writing was in demo.

*/

const boxStyle = { marginLeft: 20, display: 'flex', flexDirection: 'column',
  justifyContent: 'center', alignItems: 'center' }

class PhoneEntry extends Component {
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      type: ''
    }
  }

  render() {
    return (
      <div style={boxStyle}>
        <h3>Phone {this.props.i}</h3>
        {['phone', 'type'].map(field => {
          return (
            <SomeInput
              placeholder={field}
              key={field} field={field}
              value={this.state[field]}
              onChange={(field, val) => {
                this.setState({ [field]: val }, () => {
                  this.props.onChange(Object.assign({}, this.state))
                })
              }} />
          )
        })}
      </div>
    )
  }
}

class SomeInput extends Component {
  render() {
    return (
      <input
        placeholder={this.props.field}
        maxLength={50}
        style={{
          display: 'block',
          height: 25, width: 200, marginRight: 10 }}
        value={this.props.value}
        onChange={(ev) => this.props.onChange(this.props.field, ev.target.value)} />
    )
  }
}

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      status: 'loading',
      results: [],
      fullname: '',
      email: '',
      contactType: '',
      address: {
        street1: '',
        street2: '',
        city: '',
        state: '',
        postalCode: ''
      },
      phones: [],
    }
    this.contactsAPI = new ContactsAPI()
  }

  componentDidMount() {
    this.fetchResults()
  }

  fetchResults = async () => {
    this.setState({ status: 'loading' })
    try {
      let results = await this.contactsAPI.get({ path: '/contact' })
      this.setState({ results, status: 'results' })
    } catch (err) {
      this.setState({ status: 'error' })
      console.error(err)
      alert('could not fetch results')
    }
  }

  addNew = async () => {
    this.setState({ status: 'loading' })
    try {
      const {
        fullname,
        email,
        contactType,
        street1,
        street2,
        city,
        state,
        postalCode,
        phones
      } = this.state

      console.log({
        fullname,
        email,
        contactType,
        address: {
          street1,
          street2,
          city,
          state,
          postalCode
        },
        phones
      })
      //return

      let result = await this.contactsAPI.post({ path: '/contact', data: {
        fullname,
        email,
        contactType,
        address: {
          street1,
          street2,
          city,
          state,
          postalCode
        },
        phones
      } })
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
      await this.contactsAPI.del({ path: `/contact/${id}` })
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

  addPhone = () => {
    let phones = this.state.phones || []
    phones.push({
      phone: '',
      type: ''
    })
    this.setState({ phones })
  }

  renderResults = () => {
    return (
      <div>
        {this.state.results.map(result => {

          return (
            <div style={boxStyle} key={result._id}>
              <p>{result.fullname}</p>
              <div>
                {(result.phones || []).map(phone => {
                  return (
                    <div key={phone._id}>
                      <div>{phone.phone}</div>
                      <div>{phone.type}</div>
                    </div>
                  )
                })}
              </div>
              <button onClick={() => this.remove(result._id)}>delete</button>
            </div>
          )

          return <p key={result._id}>{result.fullname} </p>

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
          <h1>Contacts</h1>
        </div>
        <div className="App-intro">
          <div style={{ padding: 20 }}>
            <div style={boxStyle}>
              {['fullname', 'email', 'contactType'].map(field => {
                return <SomeInput key={field} field={field}
                  value={this.state[field]}
                  onChange={(field, val) => this.setState({ [field]: val })} />
              })}
            </div>
            <div style={boxStyle}>
              <h2>Address</h2>
              {['street1', 'street2', 'city', 'state', 'postalCode'].map(field => {
                return <SomeInput
                  placeholder={field}
                  key={field} field={field}
                  value={this.state[field]}
                  onChange={(field, val) => this.setState({ [field]: val })} />
              })}
            </div>
            <button onClick={this.addPhone}>Add Phone</button>
            <div>{(this.state.phones || []).map((phoneEntry, i) => {
                return (
                  <PhoneEntry key={i} i={i} onChange={obj => {
                      let phones = this.state.phones
                      phones[i] = obj
                      this.setState({ phones })
                    }} />
                )
              })}</div>
            <button onClick={this.addNew}>Add New Contact</button>
          </div>
          {listUI}
        </div>
      </div>
    );
  }
}

export default App;

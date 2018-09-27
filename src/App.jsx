import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import { Adjective } from './adj.js';
import { Noun } from './noun.js';
import { Verb } from './verb.js';


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mashapeKey: 'eO5RGE04C0mshRYpPY5SzujZUSBip1Zko0BjsngU9bv2lL4JYI',
      quote: null,
      noun: null,
      noun1: null,
      verb: null,
      adj: null,
      image: null,
      searchTerm: null,
      searchTerm1: null

    };
    this.generateDef = this.generateDef.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    event.preventDefault();
    let name = event.target.name;
    let value = event.target.value;
    this.setState({
      [name]: value

    });
  }

  generateDef(e) {
    e.preventDefault();
    const searchTerm = this.state.searchTerm;
    const searchTerm1 = this.state.searchTerm;

    console.log('inside generateQuote func');
    axios({
      method: 'get',
      url: 'http://words.bighugelabs.com/api/2/2d9950df36e71b0dc5456aee1887ff45/' + searchTerm1 + '/json',
      headers: {
        // 'X-Mashape-Key': `${this.state.mashapeKey}`,
        'accept': 'application/json'
      }
    }).then((res) => {
      let adj = [];
      let adj1=[];
      let noun = [];
      let noun1 = [];
      let verb = [];
      let verb1 = [];
      let data = res.data;

      if (data.adjective) {
        adj = (data.adjective.syn).slice(0, 5);
        adj = (data.adjective.sim).slice(0, 4);
        adj1 = adj.join(', ')
      }
      if (data.noun) {
        noun = (data.noun.syn).slice(0, 5);
        noun1 = noun.join(', ')
      }

      if (data.verb) {
        verb = (data.verb.syn).slice(0, 5);
        verb1 = verb.join(', ')
      }

      var synonyms = adj.concat(noun, verb).join(', ');


      this.setState({ verb1:verb1, noun1: noun1, noun : noun, adj1:adj1, adj : adj, verb : verb, searchTerm1: searchTerm });
      axios({
        method: 'get',
        url: 'https://pixabay.com/api/?key=8803337-19b61cf98e050e2ccfcbf99ba&q=' + this.state.searchTerm1,
        headers: {
          'accept': 'application/json',
        }
      }).then((res) => {
        if (res.data.hits.length > 1) {
          const image = res.data.hits[1].webformatURL;
          this.setState({ image: image });

        } 
      })
    });
  }

  render() {

    if (this.state.noun == null) {
      return (

        <div className='container'>

          <div className='tagline'>
            <h3 id='title' className='tagline'>Thesaurus App</h3>
            <h5 id='h5'>Look up a word!</h5>
          </div>
          <hr />

          <div className="row">
            <div className='col-4'>
              <div>
                <form>
                  <input id='none'className='input-group-text col-lg-12' id='search' onChange={this.onChange} name='searchTerm'></input>
                  <div id='button'>
                    <button className="btn col-lg-12 create-todo" onClick={this.generateDef} >Search</button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      );

    } else {

      return (


        <div className='container'>

          <div className='tagline'>
          <h3 id='title' className='tagline'>Thesaurus App</h3>
            <h5 id='h5'>Look up a word!</h5>
          </div>
          <hr />

          <div className="row">
            <div className='col-4'>
              <div>
                <form>
                  <input className='input-group-text col-lg-12' id='search' onChange={this.onChange} name='searchTerm'></input>
                  <div id='button'>
                    <button className="btn col-lg-12 create-todo" onClick={this.generateDef}
                    >Search</button>
                  </div>
                </form>
              </div>
            </div>
            <div className='col-lg-8' id='info'>
              <div className='row no-gutters' id='row'>
                <div className='col-lg-4 no-gutters' id='info2'>
                  <img src={this.state.image} />
                </div>
                <div class='flex-container' className='col-lg-8' id='quote'>
                <div id='author'>
                <i>"{this.state.searchTerm1}"</i>
                </div>
                  <Noun noun={this.state.noun1} />
                  <Adjective adj={this.state.adj1} />
                  <Verb verb={this.state.verb1} />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>

      );
    }
  }
}




export default App;

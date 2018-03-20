'use strict';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

// onSubmit the form should make a request to reddit
//    it should make a get request to http://reddit.com/r/${searchFormBoard}.json?limit=${searchFormLimit}
//    on success it should pass the results to the application state
//    on failure it should add a class to the form called error and turn the form's inputs borders red

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textInput: '',
      numberOfResults: '',
    };
    this.handleTextChange = this.handleTextChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // should contain a text input for the user to supply a reddit board to look up
  handleTextChange(e) {
    this.setState({
      textInput: e.target.value,
    });
  }

  handleLimitChange(e) {
    this.setState({
      numberOfResults: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update_state(this.state.textInput, this.state.numberOfResults);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type='text'
          name='textInput'
          placeholder='Search here'
          value={this.state.textInput}
          onChange={this.handleTextChange} />
        <input
          type='number'
          min='0'
          max='100'
          name='numberOfResults'
          placeholder='10'
          value={this.state.numberOfResults}
          onChange={this.handleLimitChange} />

        <button type="submit">Search</button>
      </form>
    );
  }
}

// should inherit all search results through props
// this component does not need to have its own state
// if there are topics in the application state it should display an <ul>
// each <li> in the <ul> should contain:
//   an <a> tag with an href that points to the topic.url
//      inside the <a> - a heading tag with the topic.title
//      inside the <a> - a <p> tag with the number of topic.ups

// class SearchResultList extends React.Component {
//   constructor(props) {
//     super(props);
//   }
// }


// should contain methods for modifying the application state
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // should contain all of the application state
      // the state should contain a topics array for holding the results of the search
      topics: {},
    };
    this.updateState = this.updateState.bind(this);
    this.searchReddit = this.searchReddit.bind(this);
  }

  // componentDidUpdate() {
  //   // component updated
  //   console.log('__STATE__', this.state);
  // }

  // componentDidMount() {
  //   // component rendered to the DOM
  //   console.log('componentDidMount', this.props);

  //   if (localStorage.topics) {
  //     try {
  //       let topics = JSON.parse(localStorage.topics);
  //       this.setState({ topics })
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   } else {
  //     superagent.get(`http://reddit.com/r/${this.props.textInput}.json?limit=${this.props.numberOfResults}`)
  //     .then(result => {
  //       console.log(result);
  //     })
  //     .catch(err => console.error(err));
  //   }
  // }

  updateState(text, limit) {
    this.searchReddit(text, limit)
      .then(res => {
        this.setState({
          topics: res.body,
        })
        console.log(res.body)
      })
      .catch(err => console.error(err))
  }

  searchReddit(text, limit) {
    console.log(text)
    console.log(limit)
    return superagent.get(`http://www.reddit.com/r/${text}.json?limit=${limit}`)
  }

  render() {
    return (
      <section>
        <h1>Reddit Search Form</h1>
        <SearchForm update_state={this.updateState}/>
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
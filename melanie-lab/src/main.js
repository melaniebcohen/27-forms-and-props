'use strict';

// trying the React, {Component} structure that I saw on https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

//    on success it should pass the results to the application state
//    on failure it should add a class to the form called error and turn the form's inputs borders red

class SearchForm extends Component {
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

class SearchResultList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id="results">
        {this.props.topics ? 
          <section>
            {console.log('section', this.props.topics.data.children)}
            <ul>
              {this.props.topics.data.children.map((post, i) => {
                if (post.data.stickied === false) {
                  return (
                    <li key={i}>
                      <a href={post.data.url}>{post.data.title}
                      <p>{post.data.ups} upvotes</p></a>
                    </li>
                  )
                }
              })}
            </ul>
          </section>
          :
          undefined
        }
        {this.props.error ?
          <section>
            <h2>Womp womp. Please try searching again.</h2>
          </section>
          :
          undefined
        }
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: null,
      error: null,
    };
    this.updateState = this.updateState.bind(this);
    this.searchReddit = this.searchReddit.bind(this);
  }

  updateState(text, limit) {
    this.searchReddit(text, limit)
      .then(res => {
        this.setState({
          topics: res.body,
          error: null,
        })
        console.log(res.body)
      })
      .catch(err => {
        this.setState({
          topics: null,
          error: err,
        })
      })
  }

  searchReddit(text, limit) {
    console.log(text)
    console.log('limit',limit)
    return superagent.get(`http://www.reddit.com/r/${text}.json?limit=${limit}`)
  }

  render() {
    return (
      <section>
        <h1>Reddit Search Form</h1>
        <SearchForm update_state={this.updateState}/>
        <SearchResultList topics={this.state.topics} error={this.state.error}/>
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
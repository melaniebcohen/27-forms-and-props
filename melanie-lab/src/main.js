'use strict';

import './style/main.scss';
// trying the React, {Component} structure that I saw on https://blog.stvmlbrn.com/2017/04/07/submitting-form-data-with-react.html
import React, { Component } from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

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
      <form onSubmit={this.handleSubmit} className={this.props.error ? 'formError' : 'formValid'}>
        <label>Subreddit</label>
        <input
          type='text'
          name='textInput'
          placeholder='Enter subreddit here'
          value={this.state.textInput}
          onChange={this.handleTextChange} />

        <label>Number of Results</label>
        <input
          type='number'
          min='0'
          max='100'
          name='numberOfResults'
          placeholder='Enter desired number of results (0-100)'
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
            <ul>
              {this.props.topics.data.children.map((post, i) => {
                if (post.data.stickied === false) {
                  return (
                    <li key={i}>
                      <a href={post.data.url}>{post.data.title}</a>
                      <p>{post.data.ups} upvotes</p>
                    </li>
                  );
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
    );
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
        });
      })
      .catch(err => {
        this.setState({
          topics: null,
          error: err,
        });
      });
  }

  searchReddit(text, limit) {
    return superagent.get(`http://www.reddit.com/r/${text}.json?limit=${limit}`);
  }

  render() {
    return (
      <section>
        <h1>Reddit Search Form</h1>
        <SearchForm update_state={this.updateState} error={this.state.error}/>
        <SearchResultList topics={this.state.topics} />
      </section>
    );
  }
}

ReactDom.render(<App />, document.getElementById('root'));
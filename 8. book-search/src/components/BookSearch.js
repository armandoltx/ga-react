import React, { PureComponent as Component } from 'react';
import axios from 'axios';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleInput(e) {
    this.setState({ query: e.target.value });
  }

  _handleSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state.query);
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <input type="search" placeholder="jaws" onInput={this._handleInput} />
        <input type="submit" value='Search' />
      </form>
    );
  }
}

class Book extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <img src={this.props.cover} alt=""/>
      </div>
    );
  }
}

class BookSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { bookCover: "", bookTitle: "" }
    this.fetchBooks = this.fetchBooks.bind(this);
  }

  fetchBooks(query) {
    axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=AIzaSyAAiCRdJuc3KbZmfKzLhPkm4DAoG5-7lcA`, {
    }) //check interpolation in JS using `${}`
      .then(function (response) {
        console.log(response);
        const title = response.data.items[0].volumeInfo.title;
        const cover = response.data.items[0].volumeInfo.imageLinks.smallThumbnail;
        console.log("title", title);
        console.log("cover => ", cover);
        this.setState({ bookTitle: title });
        this.setState({ bookCover:cover });
      }.bind(this))
      .catch(function (error) {
        console.log(error);
      }.bind(this));
  }

  render() {
    console.log("this.state.bookTitle", this.state);
    return (
      <div>
        <h1>Find Your Book</h1>
        <SearchForm onSubmit={this.fetchBooks} />
        <Book cover={this.state.bookCover} title={this.state.bookTitle} />
      </div>

    );
  }
}

export default BookSearch;
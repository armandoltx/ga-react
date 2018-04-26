import React, { PureComponent as Component } from 'react';
import jsonp from 'jsonp-es6';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
    // ANY EVENT HANDLER THAT NEEDS TO USE this HAS TO BE BOUND TO this HERE (.bind(this);)
    this._handleInput = this._handleInput.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleInput(e) {
    console.log(e.target.value);
    this.setState({ query: e.target.value }); // not to repeat the query any time you type. try doing it without this line and check in the react tab in the console
    // here we get the value and we pass in _handleSubmit
  }

  _handleSubmit(e) {
    e.preventDefault();   //stay in this page
    console.log(this.props);
    this.props.onSubmit(this.state.query); // do whatever the parent tells you to do
    //we get the value we pass  
    // to make the form stay in the page not go to a different page
    // we can call it another thing not onSubmit
    // we pass the value and do an ajax call using submit coming from the parent
  }

  render() {
    return (
      // to stop the form to go wherever and stary here when submit
      <form onSubmit={this._handleSubmit}>
        <input type="search" placeholder="Butterflies" onInput={this._handleInput} />
        <input type="submit" value="Search" />
      </form>
    );
  }
}

class Gallery extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
        {this.props.images.map((img) => <Image url={img} key={img} />)}
      </div>
    );
  }
}

function Image(props) {
  return (
    <img src={props.url} width="150" height="150" alt={props.url} />
  )
}

class FlickrSearch extends Component {
  constructor(props) {
    super(props);
    this.state = { images: [] }; // using the images in the gallery component
    this.fetchImages = this.fetchImages.bind(this);
  }

  fetchImages(q) { // it does not have "_" because it is not an even handler we created it
    console.log('fetchImages', q);
    // here is where we do de ajax request but it is not ajax, it is JSONP (JSON with padding)
    const flickrURL = 'https://api.flickr.com/services/rest/?jsoncallback=?';
    const flickrParams = {
      method: 'flickr.photos.search',
      api_key: '2f5ac274ecfac5a455f38745704ad084',
      text: q,
      format: 'json',
      per_page: 500
    };

    const generateURL = function (photo) {
      return [
        'http://farm',
        photo.farm,
        '.static.flickr.com/',
        photo.server,
        '/',
        photo.id,
        '_',
        photo.secret,
        '_q.jpg' // Change "q" for different sizes
      ].join('');
    }


    // we are gonna user jsonp-es6 to use jsonp imported on top of the file
    // Usually we would use Axios instead jsonp
    jsonp(flickrURL, flickrParams, { callback: 'jsoncallback' }).then(function (results) {
      console.log(results);
      const images = results.photos.photo.map(generateURL); // give me back a new array
      console.log("images", images);
      this.setState({ images }); //  means => this.setState({ images: images });
    }.bind(this));
  } // end of fetchImages

  render() {
    return (
      <div>
        <h1>Coming Soon</h1>
        <SearchForm onSubmit={this.fetchImages} /> {/* We can call it another thing instead onSubmit */}
        <Gallery images={this.state.images} />
      </div>
    )
  }
}

export default FlickrSearch;




// TO PASS INFORMATION FROM ONE COMPONENT TO ANOTHER THAT THEY ARE SIBLINGS, WE NEED TO PASS // TO THEIR PARENT. In our case we pass the state( name of what we search) from the SEARCH FORM
// to the GALLERY, to show the images related to the world we typed in the search form.
// We want the Form to go for the data ans show in the gallery, so we need an AJAX search,
// we will use the parent to do the ajax request,
// the form says what to look for and the parent in this case FlickerSearch is doing the AJAX // request to show in the gallery
// The parent cannot go and get the state from the Search state so it uses a function (<SearchForm onSubmit= ... />) to access the state and get the info

import React, { PureComponent as Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';


const SERVER_URL = 'http://localhost:3333/secrets.json';

class SecretForm extends Component {
  constructor(props) {
    super(props);
    this.state = { content: '' };
    this._handleChange = this._handleChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  _handleChange(e) {
    this.setState( { content: e.target.value } );
  }

  _handleSubmit(e) {
    e.preventDefault(); // to prevetn defalut and go nowhere when click (disable the form)
    this.props.onSubmit(this.state.content); // using it in the Secret class
    //now we clean the input. we create the onSubmit function in the Secret class
    this.setState({ content: '' });
  }

  render() {
    return (
      <form onSubmit={this._handleSubmit}>
        <textarea onChange={ this._handleChange } value={this.state.content} cols="30" rows="10"></textarea>
        <input type="submit" value="Tell" />
      </form>
    );
  }
  //value={this.state.content} to remove after submitting anad clear the textarea
}

SecretForm.propTypes = { // whenever I use secretForm it is required
  onSubmit: PropTypes.func.isRequired
};

function Gallery(props) {
  return (
    <div>
      <h2>Secrets Gallery</h2>
      <div>
        { props.secrets.map( s => <p key={s.id}>{s.content}</p> ) }
      </div>
    </div>
    
  );
}

class Secrets extends Component {
  constructor(props) {
    super(props);
    this.state = { secrets: [] };
    this.saveSecret = this.saveSecret.bind(this);

    // Polling
    // to get all the secrets no matter where they are created Rails or React
    // we do it inside because we need to get the secrets as soon as the page gets loaded
    const fetchSecrets = () => {// The arrow function allows us to preserve the value of `this`.
      axios.get(SERVER_URL).then(results => this.setState({ secrets: results.data }));
      setTimeout(fetchSecrets, 4000); // Recursive.
    }
   
    fetchSecrets();
  }


    

  saveSecret(s) { // s => secret // does not have _ because it is not an event function, it is created by us
    console.log(s);
    // this.state.secrets.push(s) //Mutation NOT GOOD!!!! instead ==>
    //this.setState( { secrets: this.state.secrets.push(s) }) // not good push returns a number, which is not the array check in the console
    //one way to do it:
    // const secrets = this.state.secrets.slice(0);
    // secrets.push(s);
    //this.setState( { secrets: secrets } );
    // better way to do it using spread operator
    //this.setState({ secrets: [...this.state.secrets, s] });
    //AJAX goes Here
    // in the function we send data to the server and then shows when it comes back
    axios.post(SERVER_URL, { content: s }).then((results) => {
      this.setState({ secrets: [results.data, ...this.state.secrets] });
      console.log(results);
    });
  }

  render() {
    return (
      <div>
        <h1>Tell Us all your secrets</h1>
        <SecretForm onSubmit={this.saveSecret}  />
        <Gallery secrets={this.state.secrets} />
      </div>
    );
  }
}

export default Secrets;

// 1 create the classes
// 2 create secrt form
// 3. connect secret form with Secrets
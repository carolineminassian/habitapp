import React, { Component } from 'react';
import './../styles/Profile.scss';
import { loadAuthenticatedUser } from './../services/authentication';
//user API
//import { user } from '../services/user';
import dummyUser from './../images/dummyUser.png';
export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
      //name: '',
      // email: ''
      //password: ''
    };
  }

  componentDidMount() {
    this.loadUser();
  }

  loadUser = () => {
    loadAuthenticatedUser()
      .then((authenticatedUser) => {
        if (authenticatedUser) {
          this.setState({ user: authenticatedUser });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  handleInputChange = (event) => {
    const { value, name } = event.target;
    this.setState({
      [name]: value
    });
  };

  /*   handleFormSubmission = (event) => {
    event.preventDefault();
    const { name, image, email } = this.state;
    user({ name,image, email })
      .then((user) => {
        console.log(user);
        this.props.onAuthenticationChange(user);
        console.log('SUCCESSFUL');
      })
      .catch((error) => {
        console.log(error);
        alert('Sorry, didn`t work :(');
      })} */

  render() {
    return (
      <div className="profile">
        {/*
        <img
          src={this.state.user.image ? this.state.user.image : dummyUser}
          alt={this.state.user.name} /> */}
        {this.state.user && <img src={dummyUser} alt={this.state.user.name} />}

        {/* <h2> {this.props.user.name ? this.props.user.name : ''}´s Profile </h2> */}
        {/* <img src={this.props.user.image}/> */}

        {this.state.user && <h2> {this.state.user.name}'s Profile</h2>}

        {this.state.user && (
          <p className="p">
            Welcome to your Profile, {this.state.user.name}!
            <br />
            Down below you can change your profile settings and set your own
            profile picture.
            <br />
            Have fun!
          </p>
        )}
        <br />
        <hr />

        <h3>Change your Settings ⚙️</h3>
        <form
        //</div> onSubmit={this.state.handleFormSubmission}
        >
          <label>Name</label>
          <input
            className="input"
            type="text"
            value={this.state.value}
            //? this.state.user.name : ''}
          ></input>
          <br />
          <label>Email</label>
          <input
            className="input"
            type="email"
            // value={this.props.user.email ? this.props.user.email : ''}
          ></input>
          <br />
          <label>Profile Picture</label>
          <input type="" className="input"></input>
        </form>
        <button className="button">Change ⚙️</button>
      </div>
    );
  }
}

export default Profile;

import React, { Component } from 'react';
import './../styles/Profile.scss';
import { loadAuthenticatedUser } from './../services/authentication';
//user API
//import { user } from '../services/user';
import dummyUser from './../images/dummyUser.png';
import PopUp from './PopUp';

export class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      showPopup: false
      //name: '',
      // email: ''
      //password: ''
    };
  }

  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentDidMount() {
    this.loadUser();
  }
  componentDidUpdate() {}

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
        {this.state.user && (
          <img
            src={this.state.user.image ? this.state.user.image : dummyUser}
            alt={this.state.user.name}
          />
        )}
        {/*{this.state.user && <img src={dummyUser} alt={this.state.user.name} />}*/}

        {/* <h2> {this.props.user.name ? this.props.user.name : ''}´s Profile </h2> */}
        {/* <img src={this.props.user.image}/> */}

        {this.state.user && <h2> {this.state.user.name}'s Profile</h2>}

        {this.state.user && (
          <p className="p">
            Welcome to your Profile, {this.state.user.name}!
            <br />
            You can change your profile settings and set your own profile
            picture.
          </p>
        )}
        <button className="button" onClick={this.togglePopup.bind(this)}>
          Change here
        </button>
        {this.state.showPopup ? (
          <PopUp
            text="❌"
            closePopup={this.togglePopup.bind(this)}
            user={this.state.user}
            handleSettingsUpdate={this.loadUser}
          />
        ) : null}
      </div>
    );
  }
}

export default Profile;

import React from 'react';
import './../styles/Profile.scss';
import { updateUser } from './../services/authentication';

class PopUp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user
    };
  }

  handleInputChange = (event) => {
    const { value, name } = event.target;
    let userObject = { ...this.state.user };
    userObject[name] = value;
    this.setState({ user: userObject });
  };

  handleFormSubmission = (event) => {
    event.preventDefault();
    let updatedUser = this.state.user;
    updateUser({ updatedUser })
      .then((user) => {
        console.log(user);
        console.log('UPDATING USER SUCCESSFUL');
        this.props.closePopup();
        this.props.handleSettingsUpdate();
        //window.location.href = '/dashboard';
      })
      .catch((error) => {
        console.log(error);
        alert('Sorry, signing in didn`t work :(');
      });
  };

  render() {
    return (
      <div className="popup">
        <div className="popup_inner">
          <div className="popup_inner">
            <h3>Change your Settings ⚙️</h3>
            <form
            //</div> onSubmit={this.state.handleFormSubmission}
            >
              <label>Name</label>
              <input
                className="input"
                type="text"
                name="name"
                value={this.state.user.name || ''}
                onChange={this.handleInputChange}
              ></input>
              <br />
              <label>Email</label>
              <input
                className="input"
                type="email"
                name="email"
                value={this.props.user.email || ''}
                onChange={this.handleInputChange}
              ></input>
              <br />
              <label>Profile Picture</label>
              <input type="file" className="input"></input>
            </form>
            <button className="button1" onClick={this.handleFormSubmission}>
              Change ⚙️
            </button>
          </div>
          <button className="close" onClick={this.props.closePopup}>
            ❌
          </button>
        </div>
      </div>
    );
  }
}
export default PopUp;

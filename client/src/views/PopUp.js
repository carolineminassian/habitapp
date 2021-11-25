import React, { Component } from 'react';
import './../styles/Profile.scss';

class PopUp extends React.Component {
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
                //value={this.state.value}
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
            <button className="button1">Change ⚙️</button>
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

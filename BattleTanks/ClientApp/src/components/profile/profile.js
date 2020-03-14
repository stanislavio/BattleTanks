import React, { Component } from 'react';
import './profile.css';
import { connect } from 'react-redux';

class Profile extends Component {


    render(){

        const { nickname, photoUrl, email} = this.props.user;

        return <>
            <div class="text">
                User name: {nickname}
                <p>Email: {email}</p>
                <img src={photoUrl} />
            </div>
        </>

    }
}



const mapStateToProps = (state) => ({
    user: state.user
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {

    }
  };
  
  Profile = connect(mapStateToProps, mapDispatchToProps)(Profile);
  
  export default Profile;
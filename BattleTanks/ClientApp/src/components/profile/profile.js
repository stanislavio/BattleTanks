import React, { Component } from 'react';
import './profile.css';
import { connect } from 'react-redux';

class Profile extends Component {


    render(){

        const { nickname, photoUrl, } = this.props.user;

        return <>

            {nickname}
            <img src={photoUrl} />
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
import React, { Component } from 'react';
import { connect } from 'react-redux';

class ForgotPassword extends Component{

    render(){

        return <div>
      
       </div>
    }
}


const mapStateToProps = (state) => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

ForgotPassword = connect(mapStateToProps, mapDispatchToProps)(ForgotPassword);

export default ForgotPassword;
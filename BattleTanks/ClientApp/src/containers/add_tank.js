import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddTank from '../components/admin/add-tank';
import { add_tank } from '../actions/tanks';


class AddTankWrapper extends Component {

    onSubmit = val => {
        this.props.add_tank(val);
        
    }


    render() {
      if(this.props.user.id != null){
        // this.props.history.push('/home');
      }
        return <>
                    <AddTank onSubmit={this.onSubmit}/>       
        </>
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
};

const mapDispatchToProps = dispatch => {
  return {
    add_tank: (data) => dispatch(add_tank(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTankWrapper);
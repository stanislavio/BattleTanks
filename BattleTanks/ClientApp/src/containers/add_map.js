import React, { Component } from 'react';
import { connect } from 'react-redux';
import AddMap from '../components/admin/map';
import { add_map } from '../actions/admin';


class AddMapWrapper extends Component {

    onSubmit = val => {
        this.props.add_map(val);
        
    }


    render() {
      if(this.props.user.id != null){
        // this.props.history.push('/home');
      }
        return <>
                    <AddMap onSubmit={this.onSubmit}/>       
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
    add_map: (data) => dispatch(add_map(data))
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddMapWrapper);
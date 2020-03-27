import React, { Component } from 'react';
import './users.css';
import { connect } from 'react-redux';
import { getUsers } from '../../actions/users';
import Spinner from '../spinner';
import Table from '../helpers/tables';

class Users extends Component {
  
    componentWillMount(){
      this.props.get_users();
    }

    render(){
      const { isPending, isSuccess, isError, data } = this.props.users;
      const content = isSuccess ? <Table columns={data.columns} rows={data.result}/> : null;
      const spinner = isPending ? <Spinner/> : null;

      return <>
          {spinner || content}
      </>
    }
}


const mapStateToProps = (state) => ({
    users: state.users
  });
  
  const mapDispatchToProps = (dispatch) => {
    return {
        get_users: () => dispatch(getUsers())
    }
    
  };
  
  Users = connect(mapStateToProps, mapDispatchToProps)(Users);
  
  export default Users;
import React, { Component } from "react";
import { connect } from 'react-redux';
import {findGame} from '../actions/game';
import Spinner from '../components/spinner';
import FindGame from '../components/find_game';

class FindGameWrapper extends Component{

    componentDidMount(){
        this.props.find_game();
    }

    render(){
      const { isPending, isSuccess, isError, data } = this.props.findGame;
      const content = isSuccess ? <FindGame data={data} /> : null;  
      const spinner = isPending ? <Spinner /> : null;
      
      return <div className='mt-2 col-xs-8 col-xs-offset-2 col-sm-8 col-sm-offset-2 col-md-8 col-md-offset-2 col-lg-8 col-lg-offset-2'>    
        {spinner}
        {content}
      </div>
    }

}


const mapStateToProps = state => {
    return {
        findGame: state.findGame
    }
}

const mapDispatchToProps = dispatch => {
  return {
      find_game: () => dispatch(findGame())
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FindGameWrapper);
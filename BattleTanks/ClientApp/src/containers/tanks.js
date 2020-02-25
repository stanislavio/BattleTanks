import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_tanks } from '../actions/tanks';
import Spinner from '../components/spinner';
import {DefaultLink} from '../components/helpers/helpers';


class TanksWrapper extends Component {

    componentDidMount(){
        this.props.get_tanks();
    }

    render() {
      const { isPending, isSuccess } = this.props.tanks;
      const spinner = isPending ? <Spinner /> : null;
      const content = isSuccess ? <><div className='btn btn-info'>
                                        <DefaultLink to={'/add-tank'}>Add Tank</DefaultLink>
                                    </div>
                                    Tanks</> : null;
     
      return <>
              {spinner || content}
             </>
    }
}

const mapStateToProps = state => {
    return {
        tanks: state.tanks
    }
};

const mapDispatchToProps = dispatch => {
  return {
    get_tanks: () => dispatch(get_tanks())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TanksWrapper);
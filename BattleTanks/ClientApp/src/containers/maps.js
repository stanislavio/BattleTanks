import React, { Component } from 'react';
import { connect } from 'react-redux';
import { get_map } from '../actions/admin';


class MapsWrapper extends Component {

    componentDidMount(){
        this.props.get_maps();
    }

    render() {

        return <>
        Maps
        </>
    }
}

const mapStateToProps = state => {
    return {
        maps: state.admin.maps
    }
};

const mapDispatchToProps = dispatch => {
  return {
    get_maps: () => dispatch(get_map())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MapsWrapper);
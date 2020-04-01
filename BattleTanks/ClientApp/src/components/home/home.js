import React, { Component }  from 'react';
import NotFound from '../Route guard/404';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import ModalWind from '../modal';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import './home.css';
import { renderSelectTankField, DefaultLinkBlack } from '../helpers/helpers';

class Home extends Component{

    render() {
        
        const { pristine, reset, submitting, handleSubmit, onCompSubmit } = this.props;
        console.log(this.props);
        return <div className="row width-100 height-100 justify-content-center align-items-center">
            <DefaultLinkBlack to="/find-game">Find game</DefaultLinkBlack>
            <form
                className="text-center w-100"
                onSubmit={handleSubmit}>
                    <Field name='tankId' component={renderSelectTankField} data={this.props.tanks.data} text={'Tank'}/>
                    <br/>
                    <Field name='mapId' component={renderSelectTankField} data={this.props.maps.data} text={'Map'}/>
                    <br/>
                    <Button disabled={submitting} type="submit" value="New Game" color="primary">Create Game</Button>
            </form>
            
        </div>
    }
}


const mapStateToProps = (state) => ({
    tanks: state.tanks,
    maps: state.maps
});

const mapDispatchToProps = (dispatch) => {
    return {
    }
};

Home = reduxForm({
    form: 'game'
})(Home);

Home = connect(mapStateToProps, mapDispatchToProps)(Home);

export default Home;
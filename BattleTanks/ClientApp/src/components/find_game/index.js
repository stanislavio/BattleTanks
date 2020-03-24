import React, {Component} from 'react';
import { DefaultLinkBlack } from '../helpers/helpers'

export default class FindGame extends Component {

    renderGameCart = (arr) => {
        console.log(arr)
        return arr.map((el) => (<>
                <DefaultLinkBlack to={'/game/' + el.id}>Play with {el.author.nickname}</DefaultLinkBlack>
                <br />
                </>)
        );
    } 

    render() {
        const { data } = this.props;

        return <>
            {this.renderGameCart(data)}
        </>
    }

}
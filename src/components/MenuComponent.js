import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle } from 'reactstrap';
import DishDetail from './DishdetailComponent';

class Menu extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const menu = this.props.dishes.map((dish) => {
            return (
                <Card key={dish.id} className="col-12 col-md-5 m-1"
                     onClick={() => this.props.onClick(dish.id)}>
                        <CardImg width="100%" src={dish.image} alt={dish.name} />
                        <CardImgOverlay>
                          <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    </Card>
                
            )
        });

        return (
            
            <div className="container">
                <div className="row">
                    { menu }
                </div>
                
            </div>


        );
    }

    componentDidMount() {
        console.log("Menu componentDidMount is Ok");
    }
}

export default Menu;
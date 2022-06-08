import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody, 
    CardTitle, Breadcrumb, BreadcrumbItem, 
    Button, Modal, ModalBody, ModalHeader,Label, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';


const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => (val) && (val.length >= len);

class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.state={
            isCommentFormModalOpen: false
        };

        this.toggleCommentFormModal=this.toggleCommentFormModal.bind(this);
        this.handleCommentFormSubmit=this.handleCommentFormSubmit.bind(this);
    }
    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }

    handleCommentFormSubmit(values) {
        this.toggleCommentFormModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        
    }



    toggleCommentFormModal() {
        this.setState({
            isCommentFormModalOpen: !this.state.isCommentFormModalOpen
        });
    }

    render(){
        return(
            <React.Fragment>
                <Button outline onClick={this.toggleCommentFormModal}> 
                    <span className="fa fa-comments fa-lg"></span> Submit Comment
                </Button>

                {/* comment form modal */}

                <Modal isOpen={this.state.isCommentFormModalOpen} toggle={this.toggleCommentFormModal} >
                    <ModalHeader toggle={this.toggleCommentFormModal}>
                        Submit comment
                    </ModalHeader>

                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleCommentFormSubmit(values)}>

                        {/*Rating*/}
                        <Row className="form-group">
                        <Label htmlFor="rating" md={12}>Rating</Label>
                        <Col md={12}>
                            <Control.select 
                                
                                model=".rating"
                                className="form-control"
                                name="rating"
                                id="rating"
                                validators={{required}}
                            >
                                <option>Please select</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>

                            </Control.select>

                            <Errors className="text-danger"
                            model=".author"
                            show="touched"
                            messages={{required: "Required",}} />
                        </Col>
                        </Row>

                        {/*Author*/}

                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                placeholder="First Name"
                                className="form-control"
                                validators={{required, minLength: minLength(3), maxLength: maxLength(20)}}
                                />

                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 2 characters',
                                        maxLength: 'Must be 15 characters or less'}} 

                                />
                            </Col>
                        </Row>

                        {/*Text of comment*/}

                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col md={12}>
                                <Control.textarea model=".comment" id="comment" name="comment"
                                rows="6"
                                className="form-control"
                                validators={{required}}
                                />

                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',}} 

                                />
                            </Col>
                        </Row>

                        <Row className="form-group">
                            <Col>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                        </LocalForm>
                    </ModalBody>

                </Modal>
            </React.Fragment>
        );
    }
}

    function RenderDish({dish}) {
        return(
            <div className="col-12 col-md-5 m-1">
                <Card>
                    <CardImg top src={dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }

        

    function RenderComments({comments, addComment, dishId}) {
        if (comments == null) {
            return (<div></div>)
        }

        const cmnts = comments.map(comment => {
            return (
                <li key={comment.id}>
                    <p>{comment.comment}</p>
                    <p>-- {comment.author},
                    &nbsp;
                    {new Intl.DateTimeFormat('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: '2-digit'
                    }).format(new Date(Date.parse(comment.date)))}
                    </p>
                </li>
            )
        })

        return (
            <div className="col-12 col-md-5 m-1">
                <h4> Comments </h4>
                <ul className="list-unstyled">
                    {cmnts}
                </ul>
                <CommentForm dishId={dishId} addComment={addComment} />
            </div>
        )

    }

    const DishDetail = (props) => {
        if(props.dish != null) 
          return (
            <div className="container">
              <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Menu</h3>
                    <hr />
              </div>
            </div>
            <div className="row">
                <RenderDish dish={props.dish} />
                <RenderComments comments={props.comments}
                addComment={props.addComment}
                dishId={props.dish.id} />
             </div>
             </div>

            
          );
    else
        return (
             <div></div>
        );

    }




export default DishDetail;
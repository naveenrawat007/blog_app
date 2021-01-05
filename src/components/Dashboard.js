import React, { useState, useEffect} from 'react'
import {Table, Button, Modal, Form, Row, Col, FormGroup} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import _ from "lodash/fp";
import axios from 'axios';

export default function Dashboard() {

	const { register, handleSubmit, errors } = useForm({
    mode: "onChange",
  });

	const [comments, setComments] = useState([]);
	const [isEdit, setEdit] = useState(false);
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [upComment, setComment] = useState({
		id: "",
    title: "",
    description: "",
  });

	useEffect(() => {
		axios.get(process.env.REACT_APP_BACKEND_BASE_URL + "comments")
    .then(res => {
      if (res.data.status === 200) {
        setComments(res.data.comments)
      }else{
				// if any error comes
      }
    })
    .catch(function (error) {});
		return () => {
		};
	}, []);
	
	const onSubmit = (data, e) => {
    axios.post(process.env.REACT_APP_BACKEND_BASE_URL + "comments", {comment: data })
    .then(res => {
      if (res.data.status === 200) {
				setComments(res.data.comments)
				handleClose();
      }else{
				// if any error comes
      }
    })
		.catch(function (error) {});
		e.target.reset();
	}

	const deleteComment = (id) => {
		axios.delete(process.env.REACT_APP_BACKEND_BASE_URL + "comments/" + id)
    .then(res => {
      if (res.data.status === 200) {
				setComments(res.data.comments)
      }else{
				// if any error comes
      }
    })
    .catch(function (error) {});
	}

	const setEditValue = (i) => {
		handleShow();
		setEdit(true)
		setComment({id: comments[i].id ,title: comments[i].title, description: comments[i].description})
	}

	const addComment = () =>{
		handleShow()
		setComment("")
		setEdit(false)
	}

	const updateComment = () =>{
		axios.put(process.env.REACT_APP_BACKEND_BASE_URL + "comments/" + upComment.id, {comment: upComment})
    .then(res => {
      if (res.data.status === 200) {
				setComments(res.data.comments)
				handleClose()
      }else{
				// if any error comes
      }
    })
    .catch(function (error) {});
	}

	function changeComment(e) {
    const { name , value } = e.target;
    setComment({ ...upComment, [name]: value });
  }
	

	return (
		<div>
				<h2>Comments</h2>
				<br/>
				<Button variant="primary" className="ml-3" onClick={addComment}>Add Comment</Button><br/><br/>
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>Id</th>
							<th>Title</th>
							<th>Descritpion</th>
							<th>Action</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{
							comments.map((comment,i) =>(
								<tr key={i}>
									<td>{comment.id}</td>
								 	<td>{comment.title}</td>
								 	<td>{comment.description}</td>
								 	<td><Button variant="primary" onClick= {() => setEditValue(i)}>Edit</Button></td>
									<td><Button variant="danger" onClick={() => deleteComment(comment.id)}>Delete</Button></td>
								</tr>
						 ))
						}
					</tbody>
				</Table>

				<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
					<Form className="comment-form" onSubmit={handleSubmit(onSubmit)}>
      		<Row>
        		<Col md="6">
          <FormGroup className="form-field">
          <input
            type="text"
						name="title"
						value={ upComment.title }
						onChange={ changeComment }
            placeholder="Title"
            autoComplete="off"
            ref={register({
              required: true,
            })}
          />
          {_.get("title.type", errors) === "required" && (
            <p>Title required</p>
          )}
          </FormGroup>
        </Col>
        		<Col md="6">
          <FormGroup className="form-field">
          <input
            type="text"
						placeholder="Description"
						value={ upComment.description }
						onChange={ changeComment }
            name="description"
            autoComplete="off"
            ref={register({
              required: true,
            })}
          />
          {_.get("description.type", errors) === "required" && (
            <p>Description required</p>
          )}
          </FormGroup>
        </Col>
        	{isEdit ? <Button className="ml-3" onClick={() => updateComment()}>Update</Button> : <Button type="submit" className="ml-3">Submit</Button> }
      	</Row>
  
   	 </Form>
				</Modal.Body>
        <Modal.Footer>
          
        </Modal.Footer>
      </Modal>
		</div>
	)
}

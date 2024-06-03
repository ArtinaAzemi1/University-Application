import React, {useState, useEffect, Fragment} from 'react';

import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
  } from "reactstrap";

import {Button, Modal, Container} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {ButtonToolbar, Form, Image} from 'react-bootstrap';
//import AddStudent from './AddStudent'
import AddProfessor from "./AddProfessor.js";

const Professor =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[name, setName] = useState('')
    const[surname, setSurname] = useState('')
    const[birthDate, setBirthDate] = useState('')
    const[gender, setGender] = useState('')
    const[city, setCity] = useState('')
    const[email, setEmail] = useState('')

    const[editId, setEditId] = useState('');
    const[editName, setEditName] = useState('')
    const[editSurname, setEditSurname] = useState('')
    const[editBirthDate, setEditBirthDate] = useState('')
    const[editGender, setEditGender] = useState('')
    const[editCity, setEditCity] = useState('')
    const[editEmail, setEditEmail] = useState('')

    const empdata = [
        {
            id: 1,
            name : 'Mai',
            surname : 'Mala',
            birthDate : '19-2-2001',
            gender : 'Male',
            city : 'Prishtina',
            email : 'mai@gmail.com'
        },
        {
            id: 2,
            name : 'Ela',
            surname : 'Gashi',
            birthDate : '10-10-2000',
            gender : 'Female' ,
            city : 'Prishtina',
            email : 'ela@gmail.com'
        }
    ]

    const[data, setData] = useState([]);

    //useEffect(()=> {
    //    getData();
    //},[])

    const getData = () => {
        axios.get('http://localhost:5034/api/Professor').then((result) =>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=> {
        getData();
    },[])

    const handleEdit =(id) => {
        handleShow();
        axios.get('http://localhost:5034/api/Student/${id}').then((result)=>{
            setEditName(result.data.name);
            setEditSurname(result.data.surname);
            setEditBirthDate(result.data.birthDate);
            setEditGender(result.data.gender);
            setEditCity(result.data.city);
            setEditEmail(result.data.email);
            setEditId(id);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleDelete =(id) => {
        if(window.confirm("Are you sure you want to delete this student ?") == true) {
            axios.delete('http://localhost:5034/api/Student/${id}').then((result)=>{
                if(result.status === 200) {
                    toast.success('Student has been deleted');
                    getData();
                }
            })
            .catch((error)=>{
                toast.error(error);
            })
        }
    }

    const handleUpdate =()=> {
        const url = 'http://localhost:5034/api/Student/${editId}';
        const data = {
            "id": editId,
            "name": editName,
            "surname": editSurname,
            "birthDate": editBirthDate,
            "gender": editGender,
            "city": editCity,
            "email": editEmail
        }

        axios.put(url, data).then((result) => {
            handleClose();
            getData();
            clear();
            toast.success('Student has been updated !');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    const handleSave =() => {
        const url = 'http://localhost:5034/api/Student';
        const data = {
            "name": name,
            "surname": surname,
            "birthDate": birthDate,
            "gender": gender,
            "city": city,
            "email": email
        }

        axios.post(url, data).then((result) => {
            getData();
            clear();
            toast.success('Student has been added !');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    const clear = () => {
        setName('');
        setSurname('');
        setBirthDate('');
        setGender('');
        setCity('');
        setEmail('');
        setEditName('');
        setEditSurname('');
        setEditBirthDate('');
        setEditGender('');
        setEditCity('');
        setEditEmail('');
        setEditId('');
    }

    const handleActiveChange =(e) => {
        if(e.target.value) {
            setEmail("");
        }
        else {
            setEmail("");
        }
    }

    const handleEditActiveChange =(e) => {
        if(e.target.value) {
            setEditEmail("");
        }
        else {
            setEditEmail("");
        }
    }

    //const express = require('express');
    //const cors = require('cors');
    //
    //const app = express();
    //
    //// Allow requests from all origins
    //app.use(cors());
    //
    //// Or, specify specific origins
    //app.use(cors({
    //  origin: 'http://localhost:3000' // Replace with your client's domain
    //}));
    //
    //// Your other route handlers and middleware
    //
    //app.listen(5034, () => {
    //  console.log('Server is running on port 5034');
    //});

    return (
        <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Professor Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>BirthDate</th>
                        <th>Gender</th>
                        <th>City</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                           data && data.length > 0 ?
                            data.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.id}</td>
                                        <td>{item.name}</td>
                                        <td>{item.surname}</td>
                                        <td>{item.birthDate}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.city}</td>
                                        <td>{item.email}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.id)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                                        </td>
                                  </tr>
                                )
                            })
                            :
                            'Loading...'
                        }
                    </tbody>
                  </Table>
                  </CardBody>
            </Card>
          </Col>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                            <Modal.Title>Modify / Update Professor</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Col>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Name"
                            value= {editName} onChange={(e)=> setEditName(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Surname"
                            value= {editSurname} onChange={(e)=> setEditSurname(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter BirthDate"
                            value= {editBirthDate} onChange={(e)=> setEditBirthDate(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Gender"
                            value= {editGender} onChange={(e)=> setEditGender(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter City"
                            value= {editCity} onChange={(e)=> setEditCity(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" classNme="form-control" placeholder="Enter Email"
                            value= {editEmail} onChange={(e)=> handleEditActiveChange(e.target.value)} />
                            </Col>
                        </Col>
                      </Modal.Body>
                      <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                        </Button>
                        <Button variant="primary" onClick={handleUpdate}>
                              Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
        </Row>
        <Button><Link to="./addProfessor" style={{ color: 'white', textDecoration: 'none' }}>Add Professor</Link></Button>
        <Fragment>
        <Button onClick={handleShow} >Add Student</Button>
        
    

                <Modal show={show} onHide={handleClose}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton>
                            <Modal.Title>Add Student</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                      <Row>
                        <Col sm={6}>
                            <Form>
                                <Form.Group controlId = "StudentName">
                                    <Form.Label>Student Name</Form.Label>
                                    <Form.Control type="text" name="StudentName" required placeholder="Name..."></Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "StudentSurname">
                                    <Form.Label>Student Surname</Form.Label>
                                    <Form.Control type="text" name="StudentSurname" required placeholder="Surname..."></Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "StudentName">
                                    <Form.Label>Student Date of Birth</Form.Label>
                                    <Form.Control type="date" name="StudentName" required placeholder="Birthdate..."></Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "StudentName">
                                    <Form.Label>Student Gender</Form.Label>
                                    <Form.Control type="text" name="StudentName" required placeholder="Gender..."></Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "StudentName">
                                    <Form.Label>Student City</Form.Label>
                                    <Form.Control type="text" name="StudentName" required placeholder="City..."></Form.Control>
                                </Form.Group>
                                <Form.Group controlId = "StudentName">
                                    <Form.Label>Student Email</Form.Label>
                                    <Form.Control type="text" name="StudentName" required placeholder="Email..."></Form.Control>
                                </Form.Group>
                                <Form.Group controlId = "StudentName">
                                    <Form.Label>Department</Form.Label>
                                    <Form.Control type="text" name="StudentName" required placeholder="Department..."></Form.Control>
                                </Form.Group>
                                <br/>
                                <Form.Group controlId = "StudentName">
                                <Form.Label>Add Photo</Form.Label>
                                  <Form.Control type="file"></Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Button variant = "info" type="submit">
                                        Add New Student
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Col>

                        <Col sm={6}>
                          <Image  width="300px" height="300px" />
                          <br/><br/>
                          <input type="file"/>
                        </Col>
                    </Row>
                      </Modal.Body>
                      <Modal.Footer>
                            <Button variant="danger" onClick={handleClose}>
                              Close
                        </Button>
                      </Modal.Footer>
                    </Modal>
              </Fragment>
        
        </div>
        </>
    )
}

export default Professor;
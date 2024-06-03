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
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {ButtonToolbar, Form} from 'react-bootstrap';
//import AddStudent from './AddStudent'
    
const AddProfessor =() => {

    const[name, setName] = useState('')
    const[surname, setSurname] = useState('')
    const[birthDate, setBirthDate] = useState('')
    const[gender, setGender] = useState('')
    const[city, setCity] = useState('')
    const[email, setEmail] = useState('')

    const handleSave = () => {
        // Your save logic here
        toast.success("Professor added successfully!");
    };

    return (
    <>
    <div className="mt-5 d-grid justify-content-left">
        <Form>
            <ToastContainer/>
            <Container>
                <Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter Name"
                  value= {name} onChange={(e)=> setName(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter Surname"
                  value= {surname} onChange={(e)=> setSurname(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter BirthDate"
                  value= {birthDate} onChange={(e)=> setBirthDate(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter Gender"
                  value= {gender} onChange={(e)=> setGender(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" className="form-control" placeholder="Enter City"
                  value= {city} onChange={(e)=> setCity(e.target.value)} />
                  </Col>
                  <Col>
                  <input type="text" classNme="form-control" placeholder="Enter Email"
                  value= {email} onChange={(e)=> setEmail(e.target.value)} />
                  </Col>
                  <Col>
                  <Button classNme="btn btn-primary" onClick={() => handleSave()}> Submit</Button>
                  </Col>
                </Col>
            </Container>
            </Form>
            </div>
        </>
        )
}
export default AddProfessor;
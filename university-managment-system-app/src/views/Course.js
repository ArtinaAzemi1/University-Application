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

const Course =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    

    const[name, setName] = useState('')
    const[semester, setSemester] = useState('')
    const[ects, setEcts] = useState('')

    const[editCourseId, setEditCourseId] = useState('');
    const[editName, setEditName] = useState('')
    const[editSemester, setEditSemester] = useState('')
    const[editEcts, setEditEcts] = useState('')

    const empdata = [
        {
           courseId: 1,
            name : 'Computer Science and Engineering',
            deanName : 'Filan Fisteku',
            stafCount : 40,
        },
        {
            departmentId: 1,
            name : 'Mecatronics',
            deanName : 'Fitim Mustafa',
            stafCount : 30,
        }
    ]

    const[data, setData] = useState([]);
    const [editData, setEditData] = useState({
        courseId: '',
        name: '',
        semester: '',
        ects: ''
    });

    //useEffect(()=> {
    //    getData();
    //},[])

    const getData = () => {
        axios.get('http://localhost:5034/api/Course').then((result) =>{
            setData(result.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    useEffect(()=> {
        getData();
    },[])

    const handleEdit =(courseId) => {
        handleShow();
        axios.get('http://localhost:5034/api/Course/${courseId}').then((result)=>{
            setEditName(result.data.name);
            setEditSemester(result.data.semester);
            setEditEcts(result.data.ects);
            setEditCourseId(courseId);
        })
        .catch((error)=>{
            console.log(error);
        })
    }

    const handleDelete =(courseId) => {
        if(window.confirm("Are you sure you want to delete this course ?")) {
            axios.delete('http://localhost:5034/api/Course/${courseId}').then((result)=>{
                if(result.status === 200) {
                    toast.success('Course has been deleted');
                    getData();
                }
            })
            .catch((error)=>{
                toast.error(error);
            })
        }
    }

    const handleUpdate =()=> {
        const url = 'http://localhost:5034/api/Course/${editCourseId}';
        const data = {
            "courseId": editCourseId,
            "name": editName,
            "semester": editSemester,
            "ects": editEcts
        }

        axios.put(url, data).then((result) => {
            handleClose();
            getData();
            clear();
            toast.success('Course has been updated !');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    const handleSave =() => {
        const url = 'http://localhost:5034/api/Course';
        const data = {
            "name": name,
            "semester": semester,
            "ects": ects
        }

        axios.post(url, data).then((result) => {
            getData();
            clear();
            toast.success('Course has been added !');
        }).catch((error)=>{
            toast.error(error);
        })
    }

    const clear = () => {
        setName('');
        setSemester('');
        setEcts('');
        setEditName('');
        setEditSemester('');
        setEditEcts('');
        setEditCourseId('');
    }

    /*const handleActiveChange =(e) => {
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
    }*/

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
                <CardTitle tag="h4">Simple Table</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                        <th>#</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Semester</th>
                        <th>ECTS</th>
                      </tr>
                    </thead>
                    <tbody>
                        {
                           data && data.length > 0 ?
                            data.map((item, index)=>{
                                return (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{item.courseId}</td>
                                        <td>{item.name}</td>
                                        <td>{item.semester}</td>
                                        <td>{item.ects}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={()=> handleEdit(item.courseId)}>Edit</button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.courseId)}>Delete</button>
                                        </td>
                                  </tr>
                                )
                            })
                            :
                            'Loading...'
                        }
                    </tbody>
                  </Table>

                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                            <Modal.Title>Modify / Update Department</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Col>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Name"
                            value= {editName} onChange={(e)=> setEditName(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Semester"
                            value= {editSemester} onChange={(e)=> setEditSemester(e.target.value)} />
                            </Col>
                            <br/>
                            <Col>
                            <input type="text" className="form-control" placeholder="Enter Ects"
                            value= {editEcts} onChange={(e)=> setEditEcts(e.target.value)} />
                            </Col>
                            <br/>
                            
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
              </CardBody>
            </Card>
          </Col>
          </Row>

            
        </div>
        </>
    )
}

export default Course;
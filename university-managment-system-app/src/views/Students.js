import React, { useState, useEffect, Fragment }  from "react";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
//import Row from 'react-bootstrap/Row';
//import Col from 'react-bootstrap/Col';
import axios from "axios";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {ButtonToolbar, Form, Image} from 'react-bootstrap';

import AddStudent2 from './AddStudent2'
import AddStudent from './AddStudent'
import Message from './Message.js'
import ViewStudent from "./ViewStudent";

const Students =() => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const[name, setName] = useState('')
    const[surname, setSurname] = useState('')
    const[birthDate, setBirthDate] = useState('')
    const[gender, setGender] = useState('')
    const[city, setCity] = useState('')
    const[email, setEmail] = useState('')
    const [id, setId] = useState();
    const [departmentId, setDepartmentId] = useState('');

    const [perditeso, setPerditeso] = useState("");
    const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
    const [tipiMesazhit, setTipiMesazhit] = useState("success");
    const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
    const [edito, setEdito] = useState(false);


    //const [departmentName, setDepartmentName] = useState('');

    //const[editId, setEditId] = useState('');
    //const[editName, setEditName] = useState('')
    //const[editSurname, setEditSurname] = useState('')
    //const[editBirthDate, setEditBirthDate] = useState('')
    //const[editGender, setEditGender] = useState('')
    //const[editCity, setEditCity] = useState('')
    //const[editEmail, setEditEmail] = useState('')

    

    const[data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    //useEffect(()=> {
    //    getData();
    //},[])


    /*const getData = async () => {
        try {
            const result = await axios.get('http://localhost:5034/api/Student');
            setData(result.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }*/

    useEffect(()=> {
        getData();
    },[])

    const getData = () => {
        axios.get("http://localhost:5034/api/Student").then((result) =>{
            setData(result.data);
            setLoading(false);
        })
        .catch((error)=>{
            console.log(error);
            setLoading(false);
        })
    }

    //useEffect(()=> {
    //    getData();
    //},[])

    /*const [loading, setLoading] = useState(false);
    useEffect(() => {
        const shfaqStudentet = async () => {
            try {
                setLoading(true);
                const studenti = await axios.get("https://localhost:7285/api/Kompania/shfaqKompanit", authentikimi);
                setKompanit(kompania.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
                setLoading(false);
            }
        };

        shfaqKompanit();
    }, [perditeso]);*/

    const handleEdito = (id) => {
        setEdito(true);
        setDepartmentId(id);
    };

    const handleEditoMbyll = () => setEdito(false);

    const handleDelete = async (id) => {
        if(window.confirm("Are you sure you want to delete this student?")) {
            try {
                const response = await fetch(`http://localhost:5034/api/Student/${id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
    
                if (!response.ok) {
                    throw new Error('Failed to delete student');
                }
    
                toast.success('Student has been deleted');
                getData();
            } catch (error) {
                toast.error(`Error: ${error.message}`);
            }
        }
    }

    const handleSave =() => {
        const url = 'http://localhost:5034/api/Student';
        const data = {
            "name": name,
            "surname": surname,
            "birthDate": birthDate,
            "gender": gender,
            "city": city,
            "email": email,
            "departmentId": departmentId
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
    }

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const [showView, setShowView] = useState(false);

  // Funksioni për të shfaqur ViewStudent
  const handleView = () => {
    setShowView(true);
  };

  // Funksioni për të fshehur ViewStudent
  const handleCloseView = () => {
    setShowView(false);
  };

    //const handleActiveChange =(e) => {
    //    if(e.target.value) {
    //        setEmail("");
    //    }
    //    else {
    //        setEmail("");
    //    }
    //}
//
    //const handleEditActiveChange =(e) => {
    //    if(e.target.value) {
    //        setEditEmail("");
    //    }
    //    else {
    //        setEditEmail("");
    //    }
    //}

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
        {shfaqMesazhin && (
        <Message
          setShfaqMesazhin={setShfaqMesazhin}
          pershkrimi={pershkrimiMesazhit}
          tipi={tipiMesazhit}
        />)}
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Student Data</CardTitle>
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
                      <th>Department</th>
                      <th>Options</th>
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
                                            <img
                                              src={`${process.env.PUBLIC_URL}/img/students/${item.photo}`}
                                              width="50"
                                              alt=""
                                            />
                                        </td>
                                        <td>{item.departmentName}</td>
                                        <td>       
                                            <Button className="btn btn-primary" ><Link to="/viewStudent" style={{ color: 'white', textDecoration: 'none' }}>View</Link></Button> &nbsp;
                                            <button className="btn btn-danger" onClick={()=> handleDelete(item.id)}>Delete</button>
                                        </td>
                                  </tr>
                                )
                                })
                                  :
                                  "Loading..."
                                
                        }
                    </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>

        
        <Button onClick={handleShow} >Add Student</Button>
        <AddStudent 
          show={show} 
          hide={handleClose} 
          shfaqmesazhin={() => setShfaqMesazhin(true)}
          perditesoTeDhenat={() => setPerditeso(Date.now())}
          //perditesoTeDhenat={perditesoTeDhenat}
          setTipiMesazhit={setTipiMesazhit}
          setPershkrimiMesazhit={setPershkrimiMesazhit}
        /> 
      </div>
    </>
  );
}

export default Students;

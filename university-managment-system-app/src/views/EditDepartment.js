import { React, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBan, faL } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditDepartment = (props) => {
    const[name, setName] = useState('')
    const[deanName, setDeanName] = useState('')
    const[stafCount, setStafCount] = useState('')
    const [perditeso, setPerditeso] = useState("");


  const [department, setDepartment] = useState({
    name: '',
    deanName: '',
    stafCount: ''
  });
  const [checkDepartment, setCheckDepartment] = useState(false);
  const [confirmDepartment, setConfirmDepartment] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const department = await axios.get(`http://localhost:5034/api/Department`);
        setDepartment(department.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, [perditeso]);

  useEffect(() => {
    if (props.departmentId) {
        const fetchDepartment = async () => {
            try {
                const department = await axios.get(`http://localhost:5034/api/Department/${props.departmentId}`);
                setDepartment(department.data)
            } catch (err) {
                console.log(err);
            }
        };
        fetchDepartment();
    }
}, []);


  /*const handleNameChange = (value) => {
    setName(value);
  };

  const handleDeanNameChange = (value) => {
    setDeanName(value);
  };

  const handleStafCountChange = (value) => {
    setStafCount(value);
  };*/

  const handleNameChange = (value) => {
    setDepartment((prev) => ({ ...prev, name: value }));
  };
  const handleDeanNameChange = (value) => {
    setDepartment((prev) => ({ ...prev, deanName: value }));
  };

  const handleStafCountChange = (value) => {
    setDepartment((prev) => ({ ...prev, stafCount: value }));
  };
  

  /*useEffect(() => {
    Promise.all([
      fetch("https://localhost:7285/api/Kompania/shfaqKompanit"),
      fetch("https://localhost:7285/api/Kategoria/shfaqKategorit"),
    ])
      .then(([resKompanit, resKategorit]) =>
        Promise.all([resKompanit.json(), resKategorit.json()])
      )
      .then(([dataKomapit, dataKategorit]) => {
        setKompanit(dataKomapit);
        setKategoria(dataKategorit);
      });
  }, []);*/


  /*async function handleSubmit() {
      try {
        await axios.put("http://localhost:5034/api/Department", {
            name: name,
            deanName: deanName,
            stafCount: stafCount
        }) 
        .then(x => {

            props.setTipiMesazhit("success");
            props.setPershkrimiMesazhit("Department has been updated!")
            props.perditesoTeDhenat();
            props.hide();
            props.shfaqmesazhin();
          })
          .catch(error => {
            console.error('Error saving the product:', error);
            props.setTipiMesazhit("danger");
            props.setPershkrimiMesazhit("Failed to update department !")
            props.perditesoTeDhenat();
            props.shfaqmesazhin();
          });
        } catch (error) {
            console.log(error);
        }
    };*/

    async function handleSubmit() {
        try {
          await axios.put("http://localhost:5034/api/Department", props.departmentId, {
              name: department.name,
              deanName: department.deanName,
              stafCount: department.stafCount
          }) 
          .then(x => {
  
              props.setTipiMesazhit("success");
              props.setPershkrimiMesazhit("Department has been updated!")
              props.perditesoTeDhenat();
              props.hide();
              props.shfaqmesazhin();
            })
            .catch(error => {
              console.error('Error saving the product:', error);
              props.setTipiMesazhit("danger");
              props.setPershkrimiMesazhit("Failed to update department !")
              props.perditesoTeDhenat();
              props.shfaqmesazhin();
            });
          } catch (error) {
              console.log(error);
          }
      };

    //const handleStafCountChange = (value) => {
     //   setStafCount(parseInt(value, 10));
    //};

  function isNullOrEmpty(value) {
    return value === null || value === "" || value === undefined || (typeof value === "number" && isNaN(value));
  }

  const handleControll = () => {
    if (isNullOrEmpty(department.name) || isNullOrEmpty(department.deanName) || isNullOrEmpty(department.stafCount)) {
        setEmptyFields(true);
    } else {
        handleSubmit(); 
    }
      //if (confirmDepartment == false && department.filter((item) => item.name === department.name).length !== 0) {
      //  setCheckDepartment(true);
      //}
      //else {
      //  handleSubmit();
      //}
    }
  
  return (
    <>
      {emptyFields &&
        <Modal size="sm" show={emptyFields} onHide={() => setEmptyFields(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{color: 'red'}} as="h6">An error occured</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>Please fill all the fields with <span style={{ color: "red" }}>*</span></strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={() => setEmptyFields(false)} variant="secondary">
              Close <FontAwesomeIcon icon={faXmark} />
            </Button >
          </Modal.Footer>

        </Modal>
      }
      {checkDepartment &&
        <Modal size="sm" show={checkDepartment} onHide={() => setCheckDepartment(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Confirm input</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              This Department already exists in the system !
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
            Are you sure you want to continue?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setCheckDepartment(false)}>
                Correct <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={() => { handleSubmit(); }}
            >
              Go on...
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <Modal className="modalEditShto" show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Modify / Update Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Department Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => handleNameChange(e.target.value)}
                value={department.name}
                type="textarea"
                placeholder="Department name"
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dean Name</Form.Label>
              <Form.Control
                onChange={(e) => handleDeanNameChange(e.target.value)}
                value={department.deanName}
                as="textarea"
                placeholder="Dean Name"
                
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Staff Count</Form.Label>
              <Form.Control
                onChange={(e) => handleStafCountChange(e.target.value)}
                value={department.stafCount}
                as="textarea"
                placeholder="Staf Count"
                
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>
            Close
          </Button>
          <Button
            //style={{ backgroundColor: "#009879", border: "none" }}
            onClick={handleControll}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditDepartment;

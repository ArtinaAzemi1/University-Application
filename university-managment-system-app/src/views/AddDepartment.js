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

const AddDepartment = (props) => {
    const[name, setName] = useState('')
    const[deanName, setDeanName] = useState('')
    const[stafCount, setStafCount] = useState('')
    const [perditeso, setPerditeso] = useState("");


  const [department, setDepartment] = useState([]);
  const [checkDepartment, setCheckDepartment] = useState(false);
  const [confirmDepartment, setConfirmDepartment] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const department = await axios.get(
          `http://localhost:5034/api/Department`
        );
        setDepartment(department.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, [perditeso]);

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleDeanNameChange = (value) => {
    setDeanName(value);
  };

  const handleStafCountChange = (value) => {
    setStafCount(value);
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


  async function handleSubmit() {
      try {
        await axios.post("http://localhost:5034/api/Department", {
            name: name,
            deanName: deanName,
            stafCount: stafCount
        }) 
        .then(async (response) => {

            props.setTipiMesazhit("success");
            props.setPershkrimiMesazhit("Department has been added sucessfully!");
            props.perditesoTeDhenat();
            props.hide();
            props.shfaqmesazhin();
        })
        .catch((error) => {
            console.log(error);
        });
        /*toast.success('Departamenti është shtuar me sukses!', {
            position: "top-right",
            autoClose: 3000, // Kohen për të mbajtur mesazhin të shfaqur
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });*/
        //props.setTipiMesazhit("success");
        //props.setPershkrimiMesazhit("Departamenti u insertua me sukses!");
        //props.perditesoTeDhenat();
        //props.hide();
        //props.shfaqmesazhin();
    } catch (error) {
        console.error(error);
    }}



  function isNullOrEmpty(value) {
    return value === null || value === "" || value === undefined;
  }

  const handleControll = () => {
    if (
      isNullOrEmpty(name) ||
      isNullOrEmpty(deanName) ||
      isNullOrEmpty(stafCount)
    ) {
      setEmptyFields(true);
    } else {
      if (confirmDepartment == false && department.filter((item) => item.name === name).length !== 0) {
        setCheckDepartment(true);
      }
      else {
        handleSubmit();
      }
    }

  }
  
  return (
    <>
      {emptyFields &&
        <Modal size="sm" show={emptyFields} onHide={() => setEmptyFields(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }} as="h6">Ndodhi nje gabim</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>Ju lutemi plotesoni te gjitha fushat me <span style={{ color: "red" }}>*</span></strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={() => setEmptyFields(false)} variant="secondary">
              Mbylle <FontAwesomeIcon icon={faXmark} />
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
              A jeni te sigurt qe deshironi te vazhdoni?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setCheckDepartment(false)}>
              Korrigjo <FontAwesomeIcon icon={faXmark} />
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
          <Modal.Title>Add Department</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Department Name</Form.Label>
              <Form.Control
                onChange={(e) => handleNameChange(e.target.value)}
                value={name}
                type="text"
                placeholder="Department name"
                //autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Dean Name</Form.Label>
              <Form.Control
                onChange={(e) => handleDeanNameChange(e.target.value)}
                value={deanName}
                as="textarea"
                placeholder="Dean Name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Staff Count</Form.Label>
              <Form.Control
                onChange={(e) => handleStafCountChange(e.target.value)}
                value={stafCount}
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

export default AddDepartment;

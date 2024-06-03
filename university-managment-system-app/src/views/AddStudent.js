import { React, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBan, faL } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { FormLabel } from "react-bootstrap";

const AddStudent = (props) => {
    const[name, setName] = useState('')
    const[surname, setSurname] = useState('')
    const[birthDate, setBirthDate] = useState('')
    const[gender, setGender] = useState('')
    const[city, setCity] = useState('')
    const[email, setEmail] = useState('')
  const [depName, setDepName] = useState('');
  const [department, setDepartment] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [perditeso, setPerditeso] = useState("");

  const [students, setStudents] = useState([]);
  const [checkStudent, setCheckStudent] = useState(false);
  const [confirmStudent, setConfirmStudent] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const students = await axios.get(`http://localhost:5034/api/Student`);
        setDepartment(students.data);

      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, [perditeso]);

  /*const getToken = localStorage.getItem("token");

  const authentikimi = {
    headers: {
      Authorization: `Bearer ${getToken}`,
    },
  };*/

  const handleNameChange = (value) => {
    setName(value);
  };

  const handleSurnameChange = (value) => {
    setSurname(value);
  };

  const handleBirthDateChange = (value) => {
    setBirthDate(value);
  };

  const handleGenderChange = (value) => {
    setGender(value);
  };

  const handleCityChange = (value) => {
    setCity(value);
  };

  const handleEmailChange = (value) => {
    setEmail(value);
  };

  const handleDepartmentChange = (value) => {
    setDepartment(value);
  };

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  useEffect(() => {
    Promise.all([
      fetch("http://localhost:5034/api/Department"),
      //fetch("https://localhost:7285/api/Kategoria/shfaqKategorit"),
    ])
      .then(([resDepartment]) =>
        Promise.all([resDepartment.json()])
      )
      .then(([dataDepartment]) => {
        setDepartment(dataDepartment);
      });
  }, []);

  /*useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get("http://localhost:5034/api/Department");
        if (Array.isArray(response.data)) {
          setDepartment(response.data);
        } else {
          console.error("Expected an array but got", response.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);*/


  /*async function handleSubmit() {
    if (photo) {
      const formData = new FormData();
      formData.append('photo', photo);

      try {
        await axios.post("http://localhost:5034/api/Student")
          .then(async (response) => {
            await axios
              .post("http://localhost:5034/api/Student", {
                name: name,
                surname: surname,
                name: name,
                birthDate: birthDate,
                gender: gender,
                city: city,
                email: email,
                photo: response.data,
                departmentId: depName
              })
              .then(async (response) => {
                props.setTipiMesazhit("success");
                props.setPershkrimiMesazhit("Student has been insterted succesfully!");
                props.perditesoTeDhenat();
                props.hide();
                props.shfaqmesazhin();
              })
              .catch((error) => {
                console.log(error);
              });
          });
      } catch (error) {
        console.error(error);
      }

    } else {
      await axios
        .post("http://localhost:5034/api/Student", {
            name: name,
            surname: surname,
            name: name,
            birthDate: birthDate,
            gender: gender,
            city: city,
            email: email,
            fotoProduktit: "studentPhoto.png",
            departmentId: depName
        })
        .then((response) => {

          props.setTipiMesazhit("success");
          props.setPershkrimiMesazhit("Student has been insterted succesfully!");
          props.perditesoTeDhenat();
          props.hide();
          props.shfaqmesazhin();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }*/

  async function handleSubmit() {
    try {
      await axios.post("http://localhost:5034/api/Student", {
        name: name,
        surname: surname,
        name: name,
        birthDate: birthDate,
        gender: gender,
        city: city,
        email: email,
        fotoProduktit: "studentPhoto.png",
        departmentId: depName
      }) 
      .then(async (response) => {

          props.setTipiMesazhit("success");
          props.setPershkrimiMesazhit("Student has been insterted succesfully!");
          props.perditesoTeDhenat();
          props.hide();
          props.shfaqmesazhin();
      })
      .catch((error) => {
          console.log(error);
      });
  } catch (error) {
      console.error(error);
  }}

  function isNullOrEmpty(value) {
    return value === null || value === "" || value === undefined;
  }

  const handleControll = () => {
    if (
      isNullOrEmpty(name) || isNullOrEmpty(surname) || isNullOrEmpty(birthDate) ||
      isNullOrEmpty(gender) || isNullOrEmpty(city) || isNullOrEmpty(email) || isNullOrEmpty(depName)
    ) {
      setEmptyFields(true);
    } else {
      if (confirmStudent == false && department.filter((item) => item.namr === name).length !== 0) {
        setCheckStudent(true);
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
      {checkStudent &&
        <Modal size="sm" show={checkStudent} onHide={() => setCheckStudent(false)}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Konfirmo vendosjen</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <span style={{ fontSize: "10pt" }}>
              Nje produkt me te njejtin emer ekziston ne sistem!
            </span>
            <br />
            <strong style={{ fontSize: "10pt" }}>
              A jeni te sigurt qe deshironi te vazhdoni?
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" variant="secondary" onClick={() => setCheckStudent(false)}>
              Korrigjo <FontAwesomeIcon icon={faXmark} />
            </Button>
            <Button
              size="sm"
              variant="warning"
              onClick={() => { handleSubmit(); }}
            >
              Vazhdoni
            </Button>
          </Modal.Footer>
        </Modal>
      }
      <Modal className="modalEditShto" show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => handleNameChange(e.target.value)}
                value={name}
                type="text"
                placeholder="Student Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Surname</Form.Label>
              <Form.Control
                onChange={(e) => handleSurnameChange(e.target.value)}
                value={surname}
                as="textarea"
                placeholder="Pershkrimi Produktit"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Date of Birth</Form.Label>
              <Form.Control
                onChange={(e) => handleBirthDateChange(e.target.value)}
                value={birthDate}
                type="date"
                placeholder="Date of Birth"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Gender</Form.Label>
              <Form.Control
                onChange={(e) => handleGenderChange(e.target.value)}
                value={gender}
                as="textarea"
                placeholder="Student Gender"
              />
            </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student City</Form.Label>
              <Form.Control
                onChange={(e) => handleCityChange(e.target.value)}
                value={city}
                as="textarea"
                placeholder="Student City"
              />
            </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Email</Form.Label>
              <Form.Control
                onChange={(e) => handleEmailChange(e.target.value)}
                value={email}
                as="textarea"
                placeholder="Student Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Student Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                placeholder="Student Picture"
                onChange={handlePhotoChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Department<span style={{ color: "red" }}>*</span></Form.Label>
              <select
                placeholder="Student Department"
                className="form-select"
                value={depName}
                onChange={(e) => handleDepartmentChange(e.target.value)}
              >
                <option defaultValue disabled value="">
                  Select Department
                </option>
                {department.map((item) => {
                  return (
                    <option key={item.departmentId} value={item.departmentId}>
                        {item.departmentName}
                    </option>
                  );
                })}
              </select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.hide}>
            Close <FontAwesomeIcon icon={faXmark} />
          </Button>
          <Button
            style={{ backgroundColor: "#009879", border: "none" }}
            onClick={handleControll}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddStudent;

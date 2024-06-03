import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const AddStudent2 = (props) => {
    const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [email, setEmail] = useState('');
  const [depName, setDepName] = useState('');
  const [department, setDepartment] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [emptyFields, setEmptyFields] = useState(false);
  const [checkStudent, setCheckStudent] = useState(false);
  const [confirmStudent, setConfirmStudent] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`http://localhost:5034/api/Student`);
        setDepartment(response.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, []);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await fetch("http://localhost:5034/api/Department");
        const data = await response.json();
        setDepartment(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchDepartments();
  }, []);

  const handlePhotoChange = (event) => {
    setPhoto(event.target.files[0]);
  };

  const handleSubmit = async () => {
    console.log('handleSubmit called');
    if (photo) {
      const formData = new FormData();
      formData.append('photo', photo);

      try {
        const photoResponse = await axios.post("http://localhost:5034/api/PhotoUpload", formData);
        const studentData = {
          name,
          surname,
          birthDate,
          gender,
          city,
          email,
          photo: photoResponse.data,
          departmentId: depName
        };
        await axios.post("http://localhost:5034/api/Student", studentData);
        props.setTipiMesazhit("success");
        props.setPershkrimiMesazhit("Student has been inserted successfully!");
        props.perditesoTeDhenat();
        props.hide();
        props.shfaqmesazhin();
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const studentData = {
          name,
          surname,
          birthDate,
          gender,
          city,
          email,
          photo: "studentPhoto.png",
          departmentId: depName
        };
        await axios.post("http://localhost:5034/api/Student", studentData);
        props.setTipiMesazhit("success");
        props.setPershkrimiMesazhit("Student has been inserted successfully!");
        props.perditesoTeDhenat();
        props.hide();
        props.shfaqmesazhin();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const isNullOrEmpty = (value) => value === null || value === "" || value === undefined;

  const handleControll = () => {
    console.log('handleControll called');
    console.log({ name, surname, birthDate, gender, city, email, depName });

    if (
      isNullOrEmpty(name) || isNullOrEmpty(surname) || isNullOrEmpty(birthDate) ||
      isNullOrEmpty(gender) || isNullOrEmpty(city) || isNullOrEmpty(email) || isNullOrEmpty(depName)
    ) {
      setEmptyFields(true);
    } else {
      const existingStudent = department.filter((item) => item.name === name).length !== 0;
      if (confirmStudent === false && existingStudent) {
        setCheckStudent(true);
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <>
      {emptyFields && (
        <Modal size="sm" show={emptyFields} onHide={() => setEmptyFields(false)}>
          <Modal.Header closeButton>
            <Modal.Title style={{ color: "red" }} as="h6">Ndodhi nje gabim</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <strong style={{ fontSize: "10pt" }}>
              Ju lutemi plotesoni te gjitha fushat me <span style={{ color: "red" }}>*</span>
            </strong>
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onClick={() => setEmptyFields(false)} variant="secondary">
              Mbylle <FontAwesomeIcon icon={faXmark} />
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {checkStudent && (
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
              onClick={handleSubmit}
            >
              Vazhdoni
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <Modal className="modalEditShto" show={props.show} onHide={props.hide}>
        <Modal.Header closeButton>
          <Modal.Title>Add Student</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formStudentName">
              <Form.Label>Student Name<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Student Name"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentSurname">
              <Form.Label>Student Surname<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setSurname(e.target.value)}
                value={surname}
                type="text"
                placeholder="Student Surname"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentBirthDate">
              <Form.Label>Student Date of Birth<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setBirthDate(e.target.value)}
                value={birthDate}
                type="date"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentGender">
              <Form.Label>Student Gender<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                type="text"
                placeholder="Student Gender"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentCity">
              <Form.Label>Student City<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setCity(e.target.value)}
                value={city}
                type="text"
                placeholder="Student City"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentEmail">
              <Form.Label>Student Email<span style={{ color: "red" }}>*</span></Form.Label>
              <Form.Control
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                placeholder="Student Email"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentPhoto">
              <Form.Label>Student Picture</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formStudentDepartment">
              <Form.Label>Department<span style={{ color: "red" }}>*</span></Form.Label>
              <select
                className="form-select"
                value={depName}
                onChange={(e) => setDepName(e.target.value)}
              >
                <option defaultValue disabled value="">
                  Select Department
                </option>
                {department.map((item) => (
                  <option key={item.departmentId} value={item.departmentId}>
                    {item.departmentName}
                  </option>
                ))}
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


export default AddStudent2;
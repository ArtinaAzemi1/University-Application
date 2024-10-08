import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import './Login.css';

function Register() {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} md="4" controlId="validationCustom01">
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="First name"
            defaultValue="Mark"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustom02">
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Last name"
            defaultValue="Otto"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="4" controlId="validationCustomUsername">
          <Form.Label>Username</Form.Label>
          <InputGroup hasValidation>
            <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
            <Form.Control
              type="text"
              placeholder="Username"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a username.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
      </Row>
      <Row className="mb-3">
        <Form.Group as={Col} md="6" controlId="validationCustom03">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" placeholder="City" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid city.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom04">
          <Form.Label>State</Form.Label>
          <Form.Control type="text" placeholder="State" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid state.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group as={Col} md="3" controlId="validationCustom05">
          <Form.Label>Zip</Form.Label>
          <Form.Control type="text" placeholder="Zip" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid zip.
          </Form.Control.Feedback>
        </Form.Group>
      </Row>
      <Form.Group className="mb-3">
        <Form.Check
          required
          label="Agree to terms and conditions"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Button type="submit">Submit form</Button>
    </Form>
  );
}

export default Register;


//import React from "react";
//import { Helmet } from "react-helmet";
//import NavBar from "../Components/layout/NavBar";
//import Footer from "../Components/layout/Footer";
//import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/esm/Button";
//import "./Styles/SignUp.css";
//import { useState } from "react";
//import axios from "axios";
//import Col from "react-bootstrap/Col";
//import { Row } from "react-bootstrap";
//import Mesazhi from "../Components/layout/Mesazhi";
//import { Link } from "react-router-dom";
//
//
//const Register = () => {
//  const [emri, setEmri] = useState("");
//  const [mbimeri, setMbiemri] = useState("");
//  const [username, setUsername] = useState("");
//  const [email, setEmail] = useState("");
//  const [password, setPassword] = useState("");
//  const [nrTelefonit, setNrTelefonit] = useState("");
//  const [qyteti, setQyteti] = useState("");
//  const [adresa, setAdresa] = useState("");
//  const [shteti, setShteti] = useState("");
//  const [zipKodi, setZipKodi] = useState("");
//
//  const [shfaqMesazhin, setShfaqMesazhin] = useState(false);
//  const [tipiMesazhit, setTipiMesazhit] = useState("");
//  const [pershkrimiMesazhit, setPershkrimiMesazhit] = useState("");
//
//  const getToken = localStorage.getItem("token");
//
//  const authentikimi = {
//    headers: {
//      Authorization: `Bearer ${getToken}`,
//    },
//  };
//
//  const handleChange = (setState) => (event) => {
//    setState(event.target.value);
//  }
//
//  const handleShtetiChange = (event) => {
//    setShteti(event.target.value);
//  };
//
//  function isNullOrEmpty(value) {
//    return value === null || value === "" || value === undefined;
//  }
//
//  async function CreateAcc(e) {
//    e.preventDefault();
//
//    if (
//      isNullOrEmpty(emri) ||
//      isNullOrEmpty(mbimeri) ||
//      isNullOrEmpty(username) ||
//      isNullOrEmpty(email) ||
//      isNullOrEmpty(password)
//    ) {
//      setPershkrimiMesazhit("<strong>Ju lutemi plotesoni te gjitha fushat me *</strong>");
//      setTipiMesazhit("danger");
//      setShfaqMesazhin(true);
//    } else {
//      const kontrolloEmail = await axios.get(`https://localhost:7285/api/Perdoruesi/KontrolloEmail?email=${email}`, authentikimi)
//      const passREGEX = /^[A-Z][A-Za-z0-9@$!%*?&]*[a-z][A-Za-z0-9@$!%*?&]*[0-9][A-Za-z0-9@$!%*?&]*$/
//      const telefoniREGEX = /^(?:\+\d{11}|\d{9})$/
//
//
//      if (kontrolloEmail.data === true) {
//        setPershkrimiMesazhit("<strong>Ky email nuk eshte i vlefshem!</strong>");
//        setTipiMesazhit("danger");
//        setShfaqMesazhin(true);
//      } else if (!passREGEX.test(password)) {
//        setPershkrimiMesazhit("Fjalekalimi duhet te permbaj <strong>shkronja, numra dhe simbole si dhe shkroja e pare duhet te jete e madhe!</strong>");
//        setTipiMesazhit("danger");
//        setShfaqMesazhin(true);
//      } else if (!isNullOrEmpty(nrTelefonit) && !telefoniREGEX.test(nrTelefonit)) {
//        setPershkrimiMesazhit("Numri telefonit duhet te jete ne formatin: <strong>045123123 ose +38343123132</strong>");
//        setTipiMesazhit("danger");
//        setShfaqMesazhin(true);
//      }
//
//      else {
//        axios
//          .post("https://localhost:7285/api/Authenticate/register", {
//            name: emri,
//            lastName: mbimeri,
//            email: email,
//            username: username,
//            password: password,
//            adresa: adresa,
//            qyteti: qyteti,
//            shteti: shteti,
//            zipKodi: zipKodi !== "" ? zipKodi : 0,
//            nrTelefonit: nrTelefonit
//          }, authentikimi)
//          .then(() => {
//            setPershkrimiMesazhit("<strong>Llogaria juaj u krija me sukses! Ju Deshirojme blerje te kendshme</strong>");
//            setTipiMesazhit("success");
//            setShfaqMesazhin(true);
//          })
//          .catch((error) => {
//            console.error(error);
//            setPershkrimiMesazhit("<strong>Ju lutemi kontaktoni me stafin pasi ndodhi nje gabim ne server!</strong>");
//            setTipiMesazhit("danger");
//            setShfaqMesazhin(true);
//          });
//      }
//    }
//  }
//
//  return (
//    <div className="sign-up">
//      <Helmet>
//        <title>Sign Up | Tech Store</title>
//      </Helmet>
//      <NavBar />
//      {shfaqMesazhin && <Mesazhi
//        setShfaqMesazhin={setShfaqMesazhin}
//        pershkrimi={pershkrimiMesazhit}
//        tipi={tipiMesazhit}
//      />}
//      <Form className="sign-up-form">
//        <Form.Text className="formTitle">Sign Up</Form.Text>
//
//        <Row className="mb-3">
//          <Form.Group as={Col} className="p-0" controlId="formGridName">
//            <Form.Label>Name<span style={{ color: "red" }}>*</span></Form.Label>
//            <Form.Control
//              type="name"
//              placeholder="Enter Name"
//              value={emri}
//              onChange={handleChange(setEmri)}
//              required
//              autoFocus
//            />
//          </Form.Group>
//
//          <Form.Group as={Col} className="p-0" controlId="formGridLastName">
//            <Form.Label>Last Name<span style={{ color: "red" }}>*</span></Form.Label>
//            <Form.Control
//              type="last name"
//              placeholder="Last Name"
//              value={mbimeri}
//              onChange={handleChange(setMbiemri)}
//              required
//            />
//          </Form.Group>
//        </Row>
//
//        <Form.Group className="mb-3" controlId="formGridUsername">
//          <Form.Label>Username<span style={{ color: "red" }}>*</span></Form.Label>
//          <Form.Control
//            placeholder="Username"
//            value={username}
//            onChange={handleChange(setUsername)}
//            required
//          />
//        </Form.Group>
//
//        <Form.Group className="mb-3" controlId="formGridEmail">
//          <Form.Label>Email<span style={{ color: "red" }}>*</span></Form.Label>
//          <Form.Control
//            placeholder="example@hotmail.com"
//            value={email}
//            onChange={handleChange(setEmail)}
//            required
//          />
//        </Form.Group>
//
//        <Form.Group className="mb-3" controlId="formGridPassword">
//          <Form.Label>Password<span style={{ color: "red" }}>*</span></Form.Label>
//          <Form.Control
//            type="password"
//            placeholder="Password"
//            value={password}
//            onChange={handleChange(setPassword)}
//            required
//          />
//        </Form.Group>
//
//        <Form.Group className="mb-3" controlId="formGridPhoneNumber">
//          <Form.Label>Phone Number</Form.Label>
//          <Form.Control
//            placeholder="045123123 ose +38343123132"
//            value={nrTelefonit}
//            onChange={handleChange(setNrTelefonit)}
//          />
//        </Form.Group>
//        <Row>
//          <Form.Group as={Col} className="p-0" controlId="formGridAdresa">
//            <Form.Label>Adresa</Form.Label>
//            <Form.Control
//              placeholder="Agim Bajrami 60"
//              value={adresa}
//              onChange={handleChange(setAdresa)}
//            />
//          </Form.Group>
//          <Form.Group as={Col} className="p-0" controlId="formGridQyteti">
//            <Form.Label>Qyteti</Form.Label>
//            <Form.Control
//              placeholder="Kaçanik"
//              value={qyteti}
//              onChange={handleChange(setQyteti)}
//            />
//          </Form.Group>
//        </Row>
//
//        <Row className="mb-3">
//          <Form.Group as={Col} className="p-0" controlId="formGridState">
//            <Form.Label>State</Form.Label>
//            <Form.Select value={setShteti} onChange={handleShtetiChange}>
//              <option hidden disabled>Zgjedhni Shtetin</option>
//              <option>Kosovë</option>
//              <option>Shqipëri</option>
//              <option>Maqedoni e Veriut</option>
//            </Form.Select>
//          </Form.Group>
//
//          <Form.Group as={Col} className="p-0" controlId="formGridZip">
//            <Form.Label>Zip</Form.Label>
//            <Form.Control
//              type="number"
//              placeholder="71000"
//              value={zipKodi}
//              onChange={handleChange(setZipKodi)}
//            />
//          </Form.Group>
//        </Row>
//        <div style={{ display: "flex", flexDirection: "column", width: "30%" }}>
//          <Link to="/login" className="text-white-20 mb-4 p-text">Keni llogari? Kyçuni</Link>
//          <Button variant="primary" type="submit" onClick={CreateAcc}>
//            Create Account
//          </Button>
//        </div>
//      </Form>
//      <Footer />
//    </div>
//  );
//};
//
//export default Register;

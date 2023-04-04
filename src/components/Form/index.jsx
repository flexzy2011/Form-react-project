import { Container } from '@mui/material'
import Styles from "./form.module.css"
import React, { useState } from 'react'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function SingInForm() {
  const [data, setData] = useState({
    fullName: '',
    email: '',
    status: '',
    gender: '',
  });
// using useState to paste the inputs
  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      const newData = { ...prev, [name]: value };
      return newData;
    })
  };

  // calculate the progress of the completion of the form
  const calculateProgress = () => {
    let value = 0 
    let addValue = 25
    if(data.fullName){
      const explodeString = data.fullName.split(' ')
      if(explodeString[1]){
        value += addValue;
      }
    }
    if(data.email){
      let pattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
      if(pattern.test(data.email)){
        value += addValue;
      }
    }
    if(data.status){
      value += addValue;
    }
    if(data.gender){
      value += addValue;
    }
    return value
  }

  calculateProgress();

  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(true)
    setData({
      fullName: '',
      email: '',
      status: '',
      gender: '',
    })
  }
  return (
    <>
      <Alert show={show} variant="success" 
        style={{position: "fixed", zIndex: "999",
        width: "40%", display: "flex", flexDirection: "column", 
        alignItems: "center"}}>
        <Alert.Heading>Successful!</Alert.Heading>
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShow(false)} variant="outline-success">
            Data Alert
          </Button>
        </div>
      </Alert>
      <Container sx={{
        width: "100%", 
        height: "60vh", 
        margin: "0 auto", 
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-evenly"}}>

        <div className={Styles.barContainer}>
          <div className={Styles.bar} style={{width: `${calculateProgress()}%`}}></div>
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="">Full Name</label>
          <Form.Control type="text" placeholder="Enter your name" 
            name='fullName' value={data.fullName} onChange={handleChange}/>
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="">E-mail</label>
          <Form.Control type="text" placeholder="Enter your e-mail" 
          name="email" value={data.email} onChange={handleChange}/>
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="">Civil Status</label>
          <Form.Select aria-label="Default select example" name="status" 
            value={data.status} onChange={handleChange}>
            <option value="">- select...</option>
            <option value="bachelor">Bachelor</option>
            <option value="married">Married</option>
            <option value="divorced">Divorced</option>
          </Form.Select>
        </div>

        <div className={Styles.formGroup}>
          <label htmlFor="">Gender</label>
          <Form>
            <Form.Check
              inline
              label="Male"
              name="gender"
              value="male" 
              onChange={handleChange} 
              checked={data.gender === 'male'}
              type="radio"
              id={`inline-radio-1`}
            />
            <Form.Check
              inline
              label="Female"
              name='gender' 
              value="female" 
              onChange={handleChange} 
              checked={data.gender === 'female'}
              type="radio"
              id={`inline-radio-2`}
            />
          </Form>
        </div>
        
        <div className="mb-2">
          <Button 
            variant="primary" 
            size="lg"
            onClick={handleClick} 
            disabled={calculateProgress() !== 100}
          >
          Send Form
          </Button>
        </div>
      </Container>    
    </>
  )
}

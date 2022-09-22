import { useState } from 'react';
import { Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BsCurrencyDollar } from 'react-icons/bs'
import { FaUserAlt } from 'react-icons/fa'
import * as Yup from 'yup';
import { useFormik, FormikProps } from 'formik';
import './Index.css'
import { NumericFormat } from 'react-number-format';

interface formValues {
  bill: string
  customer: string
  tip: string
}

const Index = () => {
    const [bills, setBill] = useState(0);
    const [customers, setCustomer] = useState(0);
    const [tips, setTip] = useState(0);

    const validate = Yup.object().shape({
    bill: Yup.string()
        .min(2, "Bill must be at least 2 digits")
        .required("Bill cannot be zero"),
    customer: Yup.string()
        .min(1, "Customer must be at least 1 characters")
        .required("Customer cannot be zero"),
    tip: Yup.string()
        .min(3, "Tip must be selected")
        .required("Please select a percentage tip"),
  })

  const handleSubmit = () => {}

  const formik: FormikProps<formValues> = useFormik<formValues>({
    initialValues: {
      bill: '',
      customer: '',
      tip: ''
    },
    onSubmit: handleSubmit,
    validationSchema: validate
  })

  return (
    <Container>
        <h2 className='title'>spli<br/>tter</h2>

        <Row>
            <Col md={6}>
              <form className='form_wrap'>
                <div className='form_contain'>
                  <Form.Label htmlFor='bill'>Bill</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="currency">
                      <BsCurrencyDollar fontSize={24} fontFamily='Space Mono, monospace'/>
                    </InputGroup.Text>
                    <NumericFormat
                      displayType='input'
                      placeholder="0.0"
                      className='form-control'
                      thousandSeparator={true}
                      decimalScale={2}
                      name="bill"
                      value={formik.values.bill}
                      onValueChange={(values, sourceInfo) => {
                        formik.values.bill = values.value
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </InputGroup> 
                </div>
                <div className='form_contain'>
                  <Form.Label htmlFor='customer' className='tip'>Select Tip %</Form.Label>
                    
                </div>
                <div className='form_contain'>
                  <Form.Label htmlFor='customer' className='customer'>Number of People</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="customer">
                      <FaUserAlt fontSize={24} fontFamily='Space Mono, monospace'/>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder='5'
                      aria-label="Number of People"
                      aria-describedby="customer"
                      name='customer'
                    />
                  </InputGroup> 
                </div>
              </form>
            </Col>
            <Col md={6}>
              <div className='calc_dark'>

              </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Index
import { useEffect, useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
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
type Bill = {
  bills: string
}
type Customer = {
  customer: string
}
type Tip = {
  tip: number
}

const Index = () => {
    const [bills, setBill] = useState<Bill | ''>('');
    const [customers, setCustomer] = useState<Customer | ''>('');
    const [tips, setTip] = useState(0);
    const [totalBills, setTotalBill] = useState<Bill | ''>('');
    const [personTip, setpersonTip] = useState<Tip | ''>('');

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

  useEffect(()=>{
    let bill = Number(bills)
    let customer = Number(customers)

    console.log(tips, bills, customers)
    const tipAmmount = tips / 100 * bill;
    console.log('Amount: ', tipAmmount)
    const tipPerPerson = tipAmmount / customer
    console.log('Person tip: ', tipPerPerson)
    setpersonTip({tip: tipPerPerson})
    console.log(personTip)

  }, [tips, bills, customers])
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
                      <BsCurrencyDollar fontSize={24} fontFamily='Space Mono, monospace' color='hsl(184, 14%, 56%)'/>
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
                        setBill({bills: values.value})
                        formik.values.bill = values.value
                      }}
                      onBlur={formik.handleBlur}
                    />
                  </InputGroup> 
                </div>
                <div className='form_contain'>
                  <Form.Label htmlFor='customer' className='tip'>Select Tip %</Form.Label>
                  <div className='d-flex w-100 flex-wrap justify-content-between btn_con'>
                    <Button className='button_color' onClick={()=>{setTip(5)}}>5%</Button>
                    <Button className='button_color' onClick={()=>{setTip(10)}}>10%</Button>
                    <Button className='button_color button_cyan' onClick={()=>{setTip(15)}}>15%</Button>
                    <Button className='button_color' onClick={()=>{setTip(25)}}>25%</Button>
                    <Button className='button_color' onClick={()=>{setTip(50)}}>50%</Button>
                    <Button className='button_color button_light'>Custom</Button>
                  </div>  
                </div>
                <div className='form_contain'>
                  <Form.Label htmlFor='customer' className='customer'>Number of People</Form.Label>
                  <InputGroup className="mb-3">
                    <InputGroup.Text id="customer">
                      <FaUserAlt fontSize={24} fontFamily='Space Mono, monospace' color='hsl(184, 14%, 56%)'/>
                    </InputGroup.Text>
                    <Form.Control
                      placeholder='5'
                      aria-label="Number of People"
                      aria-describedby="customer"
                      name='customer'
                      onChange={(e)=>{setCustomer({customer: e.target.value})}}
                    />
                  </InputGroup> 
                </div>
              </form>
            </Col>
            <Col md={6}>
              <div className='calc_dark'>
                  <form className='w-100 d-flex justify-content-between form_'>
                    <div className='w-100'>
                      <div className='d-flex w-100 justify-content-between mb-5 calc_height'>
                        <div className='calc_label'>
                          <label>Tip Amount</label>
                          <span>/ person</span>
                        </div>
                        <div className='calc_input'>
                          <input type="text" placeholder='$0.0' value={personTip.toString()} readOnly/>
                        </div>
                      </div>
                      <div className='d-flex w-100 justify-content-between calc_height'>
                        <div className='calc_label'>
                          <label>Total</label>
                          <span>/ person</span>
                        </div>
                        <div className='calc_input'>
                          <input type="text" placeholder='$0.0' value={totalBills.toString()} readOnly/>
                        </div>
                      </div>
                    </div>
                    <button type='reset' className='btn btn-lg w-100 reset_btn'>RESET</button>
                  </form>
              </div>
            </Col>
        </Row>
    </Container>
  )
}

export default Index
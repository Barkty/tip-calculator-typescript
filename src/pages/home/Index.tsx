import { Col, Container, Row } from 'react-bootstrap'
import './Index.css'

const Index = () => {

  return (
    <Container>
        <h2 className='title'>spli<br/>tter</h2>

        <Row>
            <Col md={6}>
              <div className='form_wrap'>
                  <div className='form_group'>

                  </div>
              </div>
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
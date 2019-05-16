import React from 'react';
import Container from 'react-bootstrap/Container';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import AlertMessage from '../public/AlertMessage';

class VATLedger extends React.Component {
  constructor(props) {
    super(props);

    this.printDocument = this.printDocument.bind(this);

    this.state = {
      pdfName: props.location.state !== undefined ? `${props.location.state.year} ${props.location.state.quarter}` : '',
    };
  }

  printDocument() {
    // window.html2canvas = html2canvas;
    const input = document.getElementById('divToPrint');
    const { pdfName } = this.state;
    const { location } = this.props;
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1);
        // eslint-disable-next-line
          const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 0);
        // pdf.output('dataurlnewwindow');
        if (location.pathname === '/profile/VATLedger') {
          pdf.save('VAT Assessment Current.pdf');
        } else {
          pdf.save(`VAT Assessment ${pdfName}.pdf`);
        }
      });
  }

  render() {
    let allCompensations;
    let allDeductions;

    const { location } = this.props;

    console.log(location);

    if (location.state === undefined) {
      return (
        <AlertMessage
          variant="warning"
          message={"You can't access this page directly from the url. You need"
              + ' to get access from the VAT Transaction ledger page.'}
        />
      );
    }

    const { sell, purchase } = location.state;

    let totalCompensations = 0;
    let totalDeductions = 0;

    if (purchase !== null
      && purchase !== undefined
      && purchase.length !== 0) {
      allCompensations = purchase.map((item) => {
        totalCompensations = parseFloat(parseFloat(totalCompensations + item.totalVat).toFixed(2));
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td><h3 style={{ color: 'blue' }}>{`${item.total - item.totalVat} CUB`}</h3></td>
            <td><h3 style={{ color: 'red' }}>{`${item.totalVat} CUB`}</h3></td>
            <td>
              <h3 style={{ color: 'green' }}>
                {`${item.total} CUB`}
                {' '}
              </h3>
            </td>
          </tr>
        );
      });
    }

    if (sell !== null
      && sell !== undefined
      && sell.length !== 0) {
      allDeductions = sell.map((item) => {
        totalDeductions = parseFloat(parseFloat(totalDeductions + item.totalVat).toFixed(2));
        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td><h3 style={{ color: 'blue' }}>{`${item.total - item.totalVat} CUB`}</h3></td>
            <td><h3 style={{ color: 'red' }}>{`${item.totalVat} CUB`}</h3></td>
            <td><h3 style={{ color: 'green' }}>{`${item.total} CUB`}</h3></td>
          </tr>
        );
      });
    }

    return (
      <Container>
        <Link to="/profile/VATManagement">
          <Button variant="dark" size="lg">
            Back to VAT Management
          </Button>
        </Link>
        <div id="divToPrint" style={{ marginTop: '2%' }}>
          <Row>
            <Col>
              <h2> Current quarter  VAT compensations </h2>
              <Table striped bordered hover>
                <thead>
                  <tr key="0">
                    <th>Id</th>
                    <th>Total without VAT</th>
                    <th>VAT portion</th>
                    <th>Total with VAT</th>
                  </tr>
                </thead>
                <tbody>
                  {allCompensations}
                </tbody>
              </Table>
              <div>
                <b>
                  TOTAL COMPENSATIONS:
                </b>

                <h3 style={{ color: 'green' }}>{ `${totalCompensations} CUB` }</h3>
              </div>
            </Col>
            <Col>
              <h2> Current quarter  VAT deductions </h2>
              <Table striped bordered hover>
                <thead>
                  <tr key="0">
                    <th>Id</th>
                    <th>Total without VAT</th>
                    <th>VAT portion</th>
                    <th>Total with VAT</th>
                  </tr>
                </thead>
                <tbody>
                  {allDeductions}
                </tbody>
              </Table>
              <div>
                <b>
                  TOTAL DEDUCTIONS:
                </b>

                <h3 style={{ color: 'red' }}>{ `${totalDeductions} CUB`}</h3>
              </div>
            </Col>
          </Row>
        </div>
        <div style={{ textAlign: 'center', padding: '0.5em' }}>
          <Button
            type="button"
            variant="info"
            size="lg"
            onClick={this.printDocument}
            style={{ marginRight: '2%' }}
          >
            Download VAT assessment
          </Button>
        </div>
      </Container>
    );
  }
}

VATLedger.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types,react/require-default-props
  location: PropTypes.object,
};


export default VATLedger;

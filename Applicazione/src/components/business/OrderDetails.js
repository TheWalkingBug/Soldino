import React from 'react';
import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Table } from 'react-bootstrap';
import AlertMessage from '../public/AlertMessage';


class OrderDetails extends React.Component {
  constructor(props) {
    super(props);

    this.printDocument = this.printDocument.bind(this);

    this.state = {
      pdfName: props.location.state !== undefined ? props.location.state.id : '',
    };
  }

  printDocument() {
    // window.html2canvas = html2canvas;
    const input = document.getElementById('divToPrint');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png', 1);
        // eslint-disable-next-line
                const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0, 210, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save(`Invoice Order ID ${this.state.pdfName}.pdf`);
      });
  }

  render() {
    const { location } = this.props;

    if (location.state === undefined) {
      return (
        <AlertMessage
          variant="warning"
          message={"You can't access this page directly from the url. You need"
      + ' to get access from the orders management page.'}
        />
      );
    }
    const actor = location.state.orderType === '0' ? 'Seller' : 'Buyer';
    const allDetails = location.state.products.map((item, index) => (
      <tr key={item.id}>
        <td>{location.state.date}</td>
        <td>{item.name}</td>
        <td>{location.state.quantities[parseInt(index, 10)]}</td>
        {actor === 'Seller' ? <td>{location.state.seller}</td> : <td>{location.state.buyer}</td>}
        <td>{`${item.VAT}%`}</td>
        <td>
          {`${item.price} CUB`}
        </td>
      </tr>
    ));

    let vatPortion = 0;

    if (location.state.products.length !== 0) {
      for (let i = 0; i < location.state.products.length; i += 1) {
        const item = location.state.products[i];
        vatPortion += ((item.VAT * item.price) / 100) * location.state.quantities[i];
      }
    }

    return (
      <Container>
        <h1>Order details</h1>
        <br />
        <div id="divToPrint">
          <Table striped bordered hover>
            <thead>
              <tr key="0">
                <th>Date</th>
                <th>Product name</th>
                <th>Quantity</th>
                <th>{actor}</th>
                <th>VAT</th>
                <th>Unit price</th>
              </tr>
            </thead>
            <tbody>{allDetails}</tbody>
          </Table>
          <p style={{ textAlign: 'right', marginRight: '2%' }}>
            <b>Total without VAT: </b>
            {' '}
            {(location.state.total - vatPortion).toFixed(2)}
            {' '}
                CUB
          </p>
          <p style={{ textAlign: 'right', marginRight: '2%' }}>
            <b>VAT portion: </b>
            {' '}
            {vatPortion.toFixed(2)}
            {' '}
                CUB
          </p>
          <p style={{ textAlign: 'right', marginRight: '2%' }}>
            <b>Total: </b>
            {' '}
            {location.state.total}
            {' '}
                CUB
          </p>
        </div>


        <div style={{ textAlign: 'center', padding: '0.5em' }}>
          <Button
            type="button"
            variant="info"
            size="lg"
            onClick={this.printDocument}
            style={{ marginRight: '2%' }}
          >
                        Download Receipt
          </Button>
          <Link to="/profile/ordersManagement">
            <Button variant="dark" size="lg">
                            Back to all orders
            </Button>
          </Link>
        </div>
      </Container>
    );
  }
}

OrderDetails.propTypes = {
  // eslint-disable-next-line
    location: PropTypes.object.isRequired,
};

export default OrderDetails;

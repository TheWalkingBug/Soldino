import React from 'react';
import { Container, Table } from 'react-bootstrap';

global.fetch = require('node-fetch');
const cc = require('cryptocompare');

cc.setApiKey('b9db5773d7b63351b1213b1a9b3ee2353e6a180232ff0d8b906a3595850c0b40');
class Price extends React.Component {
  constructor() {
    super();
    this.state = {
      ethValue: { USD: 0, EUR: 0 },
      operationPrices: {
        mint: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        distribute: {
          base: {
            ETH: 0,
            USD: 0,
            EUR: 0,
          },
          user: {
            ETH: 0,
            USD: 0,
            EUR: 0,
          },
        },
        confirm: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        removeBusiness: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        payVAT: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        refuseVAT: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        register: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        addProduct: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        modifyProduct: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        deleteProduct: {
          ETH: 0,
          USD: 0,
          EUR: 0,
        },
        buyProducts: {
          owner: {
            ETH: 0,
            USD: 0,
            EUR: 0,
          },
        },
      },
    };
  }

  componentDidMount() {
    cc.price('ETH', ['USD', 'EUR']).then((newEthValue) => {
      this.setState({
        ethValue: newEthValue,
        operationPrices: {
          mint: {
            ETH: `${0.000717}ETH`,
            USD: `${(newEthValue.USD * 0.000717).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.000717).toFixed(2)}€`,
          },
          distribute: {
            user: {
              ETH: `${0.00075}ETH`,
              USD: `${(newEthValue.USD * 0.00075).toFixed(2)}$`,
              EUR: `${(newEthValue.EUR * 0.00075).toFixed(2)}€`,
            },
          },
          confirm: {
            ETH: `${0.000648}ETH`,
            USD: `${(newEthValue.USD * 0.000648).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.000648).toFixed(2)}€`,
          },
          removeBusiness: {
            ETH: `${0.000686}ETH`,
            USD: `${(newEthValue.USD * 0.000686).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.000686).toFixed(2)}€`,
          },
          payVAT: {
            ETH: `${0.003682}ETH`,
            USD: `${(newEthValue.USD * 0.003682).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.003682).toFixed(2)}€`,
          },
          refuseVAT: {
            ETH: `${0.002903}ETH`,
            USD: `${(newEthValue.USD * 0.002903).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.002903).toFixed(2)}€`,
          },
          register: {
            ETH: `${0.000929}ETH`,
            USD: `${(newEthValue.USD * 0.000929).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.000929).toFixed(2)}€`,
          },
          addProduct: {
            ETH: `${0.001485}ETH`,
            USD: `${(newEthValue.USD * 0.001485).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.001485).toFixed(2)}€`,
          },
          modifyProduct: {
            ETH: `${0.001745}ETH`,
            USD: `${(newEthValue.USD * 0.001745).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.001745).toFixed(2)}€`,
          },
          deleteProduct: {
            ETH: `${0.00026}ETH`,
            USD: `${(newEthValue.USD * 0.00026).toFixed(2)}$`,
            EUR: `${(newEthValue.EUR * 0.00026).toFixed(2)}€`,
          },
          buyProducts: {
            owner: {
              ETH: `${0.003}ETH`,
              USD: `${(newEthValue.USD * 0.003).toFixed(2)}$`,
              EUR: `${(newEthValue.EUR * 0.003).toFixed(2)}€`,
            },
          },
        },
      });
    });
  }

  render() {
    const { operationPrices, ethValue } = this.state;

    return (
      <Container>
        <h1>Price list</h1>
        <h2>Ethereum price</h2>
        <Table bordered>
          <thead>
            <tr>
              <th>ETH</th>
              <th>EUR</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>{ethValue.EUR}</td>
              <td>{ethValue.USD}</td>
            </tr>
          </tbody>
        </Table>
        <p>1 Cubit = 1 Euro</p>

        <h2>Operation Price</h2>
        <Table bordered>
          <thead>
            <tr>
              <th>Operation</th>
              <th>ETH</th>
              <th>EUR/Cubit</th>
              <th>USD</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>All reading operations</td>
              <td>FREE</td>
              <td>FREE</td>
              <td>FREE</td>
            </tr>
            <tr>
              <td>Login/logout</td>
              <td>FREE</td>
              <td>FREE</td>
              <td>FREE</td>
            </tr>
            <tr>
              <td>Register as citizen/business owner</td>
              <td>{`~${operationPrices.register.ETH}`}</td>
              <td>{`~${operationPrices.register.EUR}`}</td>
              <td>{`~${operationPrices.register.USD}`}</td>
            </tr>
            <tr>
              <td>Mint Cubit</td>
              <td>{`~${operationPrices.mint.ETH}`}</td>
              <td>{`~${operationPrices.mint.EUR}`}</td>
              <td>{`~${operationPrices.mint.USD}`}</td>
            </tr>
            <tr>
              <td>Distribute Cubit</td>
              <td>{`~${operationPrices.distribute.user.ETH} for each user`}</td>
              <td>{`~${operationPrices.distribute.user.EUR} for each user`}</td>
              <td>{`~${operationPrices.distribute.user.USD} for each user`}</td>
            </tr>
            <tr>
              <td>Buy products</td>
              <td>{`~${operationPrices.buyProducts.owner.ETH} for each business you are buying from`}</td>
              <td>{`~${operationPrices.buyProducts.owner.EUR} for each business you are buying from`}</td>
              <td>{`~${operationPrices.buyProducts.owner.USD} for each business you are buying from`}</td>
            </tr>
            <tr>
              <td>Add a product</td>
              <td>{`~${operationPrices.addProduct.ETH}`}</td>
              <td>{`~${operationPrices.addProduct.EUR}`}</td>
              <td>{`~${operationPrices.addProduct.USD}`}</td>
            </tr>
            <tr>
              <td>Modify a product</td>
              <td>{`~${operationPrices.modifyProduct.ETH}`}</td>
              <td>{`~${operationPrices.modifyProduct.EUR}`}</td>
              <td>{`~${operationPrices.modifyProduct.USD}`}</td>
            </tr>
            <tr>
              <td>Remove a product</td>
              <td>{`~${operationPrices.deleteProduct.ETH}`}</td>
              <td>{`~${operationPrices.deleteProduct.EUR}`}</td>
              <td>{`~${operationPrices.deleteProduct.USD}`}</td>
            </tr>
            <tr>
              <td>Confirm a business owner</td>
              <td>{`~${operationPrices.confirm.ETH}`}</td>
              <td>{`~${operationPrices.confirm.EUR}`}</td>
              <td>{`~${operationPrices.confirm.USD}`}</td>
            </tr>
            <tr>
              <td>Remove a business</td>
              <td>{`~${operationPrices.removeBusiness.ETH}`}</td>
              <td>{`~${operationPrices.removeBusiness.EUR}`}</td>
              <td>{`~${operationPrices.removeBusiness.USD}`}</td>
            </tr>
            <tr>
              <td>Pay VAT taxes</td>
              <td>{`~${operationPrices.payVAT.ETH}`}</td>
              <td>{`~${operationPrices.payVAT.EUR}`}</td>
              <td>{`~${operationPrices.payVAT.USD}`}</td>
            </tr>
            <tr>
              <td>Refuse the payment of VAT taxes</td>
              <td>{`~${operationPrices.refuseVAT.ETH}`}</td>
              <td>{`~${operationPrices.refuseVAT.EUR}`}</td>
              <td>{`~${operationPrices.refuseVAT.USD}`}</td>
            </tr>

          </tbody>
        </Table>

      </Container>
    );
  }
}

export default Price;

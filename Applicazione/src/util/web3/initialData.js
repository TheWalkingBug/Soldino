const bs58 = require('bs58');
const { Buffer } = require('ipfs-http-client');
const IPFS = require('ipfs-http-client');
const moment = require('moment');

const ipfs = new IPFS({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

function getBytes32FromIpfsHash(ipfsListing) {
  console.log('loading...');
  return `0x${bs58.decode(ipfsListing)
    .slice(2)
    .toString('hex')}`;
}

function insertInIpfs(data) {
  const bufferToUpload = Buffer.from(JSON.stringify(data));
  return ipfs.add(bufferToUpload).then(result => getBytes32FromIpfsHash(result[0].hash));
}

module.exports = async function getData() {
  return {
    citizens: [{
      address: '0xD76C1DF7185B0008Efd0c638BDe48632B153FE6E', // Account 5
      hash: await insertInIpfs({
        userType: 1,
        name: 'Mario',
        surname: 'Rossi',
        fiscalCode: 'RSSMRA70B17H501J',
        mail: 'Mario.Rossi@gmail.com',
      }),
    }],
    businessOwners: [{
      address: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64', // Account 2
      confirmed: moment('2018-09-15').valueOf() / 1000,
      hash: await insertInIpfs({
        userType: 2,
        businessName: 'Apple',
        location: 'Cupertino',
        VATNumber: '376925457365',
        CE: 'info@apple.com',
      }),
    },
    {
      address: '0xB83E733fb9BD2b1C8031e301ab0E3D590448B1d7', // Account 3
      confirmed: moment('2018-12-11').valueOf() / 1000,
      hash: await insertInIpfs({
        userType: 2,
        businessName: 'LG S.p.a.',
        location: 'Seul',
        VATNumber: '05006900962',
        CE: 'info@lg.it',
      }),
    },
    {
      address: '0xB6cbe6AC1438a0ce859192dB011E714234d8885c', // Account 4
      confirmed: moment('2018-10-11').valueOf() / 1000,
      hash: await insertInIpfs({
        userType: 2,
        businessName: 'Qualcomm',
        location: 'San Diego',
        VATNumber: '08617970960',
        CE: 'info@qualcomm.com',
      }),
    }],
    products: [{
      hash: await insertInIpfs({
        imagePreview: '', // TODO IMAGE
        name: 'iPhone XS', // prod 1
        description: 'The best iPhone ever made​​',
      }),
      price: 1200,
      owner: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64', // account 2
      availability: 16,
      VAT: 22,
      deleted: false,
    },
    {
      hash: await insertInIpfs({
        imagePreview: '', // TODO IMAGE
        name: 'MacBook Pro touchbar', // prod 2
        description: 'The best MacBook ever made.​​',
      }),
      price: 3399,
      owner: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64', // account 2
      availability: 24,
      VAT: 22,
      deleted: false,
    },
    {
      hash: await insertInIpfs({
        imagePreview: '', // TODO IMAGE
        name: 'AirPods 2', // prod 3
        description: 'The best AirPods ever made.​',
      }),
      price: 229,
      owner: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64', // account 2
      availability: 13,
      VAT: 22,
      deleted: false,
    },
    {
      hash: await insertInIpfs({
        imagePreview: '', // TODO IMAGE
        name: 'iPhone XS OLED display', // prod 4
        description: 'A display for the best iPhone ever made.',
      }),
      price: 80,
      owner: '0xB83E733fb9BD2b1C8031e301ab0E3D590448B1d7', // account 3
      availability: 14,
      VAT: 22,
      deleted: false,
    },
    {
      hash: await insertInIpfs({
        imagePreview: '', // TODO IMAGE
        name: 'LG Nano Cell TV', // prod 5
        description: 'The brightest TV ever made.',
      }),
      price: 1999,
      owner: '0xB83E733fb9BD2b1C8031e301ab0E3D590448B1d7', // account 3
      availability: 12,
      VAT: 22,
      deleted: false,
    },
    {
      hash: await insertInIpfs({
        imagePreview: '', // TODO IMAGE
        name: 'Quad-core 2.5GHz Kryo Processor', // prod 6
        description: 'The fastest processor ever made.',
      }),
      price: 150,
      owner: '0xB6cbe6AC1438a0ce859192dB011E714234d8885c', // account 4
      availability: 2,
      VAT: 22,
      deleted: false,
    }],
    balances: [{
      address: '0x0409d8EA8Fb40d2C4765246F25256719143b6EF7', // account 1
      balance: 1000000,
    },
    {
      address: '0xD76C1DF7185B0008Efd0c638BDe48632B153FE6E', // Account 5
      balance: 1700,
    },
    {
      address: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64', // Account 2
      balance: 150000,
    },
    {
      address: '0xB83E733fb9BD2b1C8031e301ab0E3D590448B1d7', // Account 3
      balance: 150000,
    },
    {
      address: '0xB6cbe6AC1438a0ce859192dB011E714234d8885c', // Account 4
      balance: 150000,
    }],
    productTransactions: [{
      products: [5],
      productQuantity: [9],
      date: moment('2018-12-13').unix(),
      buyer: '0xB83E733fb9BD2b1C8031e301ab0E3D590448B1d7', // Account 3
    },
    {
      products: [0, 1],
      productQuantity: [4, 3],
      date: moment('2018-12-17').unix(),
      buyer: '0xD76C1DF7185B0008Efd0c638BDe48632B153FE6E', // Account 5
    },
    {
      products: [3],
      productQuantity: [10],
      date: moment('2018-12-17').unix(),
      buyer: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64', // Account 2
    },
    {
      products: [4],
      productQuantity: [1],
      date: moment('2018-12-19').unix(),
      buyer: '0xD76C1DF7185B0008Efd0c638BDe48632B153FE6E', // Account 4
    },
    {
      products: [0, 1],
      productQuantity: [4, 3],
      date: moment('2019-01-17').unix(),
      buyer: '0xD76C1DF7185B0008Efd0c638BDe48632B153FE6E', // Account 5
    },
    {
      products: [3],
      productQuantity: [10],
      date: moment('2019-01-17').unix(),
      buyer: '0x19e070BCb62E3CD1bC981886E7c151cEeCd88e64', // Account 2
    },
    {
      products: [4],
      productQuantity: [1],
      date: moment('2019-01-19').unix(),
      buyer: '0xD76C1DF7185B0008Efd0c638BDe48632B153FE6E', // Account 4
    }],
    VATTransactions: [/* { // TODO CALCOLARE TASSE EFFETTIVE
        date: '',
        amount: '',
        addresser: '',
        addressee: '',
        refused: '',
        year: '',
        quarter: '',
      } */],
  };
};

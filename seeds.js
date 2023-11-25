const Product = require("./model/Product");


let products = [
  {
    name: 'Buff',
    img: 'https://th.bing.com/th/id/OIP.QjLjznet2357INu6n37JGQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    des: 'polishing buff',
    price: 900,
  },
  {
    name: 'Buff',
    img: 'https://th.bing.com/th/id/OIP.QjLjznet2357INu6n37JGQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    des: 'polishing buff',
    price: 900,
  },
  {
    name: 'Buff',
    img: 'https://th.bing.com/th/id/OIP.QjLjznet2357INu6n37JGQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    des: 'polishing buff',
    price: 900,
  },
  {
    name: 'Buff',
    img: 'https://th.bing.com/th/id/OIP.QjLjznet2357INu6n37JGQHaHa?w=192&h=192&c=7&r=0&o=5&dpr=1.3&pid=1.7',
    des: 'polishing buff',
    price: 900,
  },
];

async function seedDB(){
  await Product.insertMany(products);
  console.log('hogya push')
}

module.exports = seedDB;
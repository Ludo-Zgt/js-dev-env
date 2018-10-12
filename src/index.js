import numeral from 'numeral';

const courseValue = numeral(15000).format('$0,0..00');
console.log(`I would pay ${courseValue} for this awesome car!`);

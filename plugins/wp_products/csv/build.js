const fs = require('fs');
const path = require("path");
// const HTMLParser = require('node-html-parser');

// ==============================================

const build = ({ products, cols }) => {

  const head_open = '<?php';
  const head_close = '';

  const product_rows = [];
  const variant_rows = [];
  for (let i = 0; i < products.length; ++i ) {
    product_rows.push(` [
    "${products[i].product['title']}",
    "${products[i].product['sub_title']}",
    "${products[i].product['body']}",
    "${products[i].product['category']}",
    "${products[i].product['gender']}",
     ${products[i].product['price'] * 100},
     ${products[i].product['price_compare'] * 100},
  ],`);

    
    for (let j = 0; j < products[i].variants.length; ++j) {
      variant_rows.push(` [
    ${i + 1},
    ${Number(products[i].variants[j]['qty'])},
    "${products[i].variants[j]['size']}",
    "${products[i].variants[j]['color']}",
    "${products[i].variants[j]['img']}",
  ],`);
    } // end for j

  } // end for i

  const output = `${head_open}

  // ==============================================

  // Products:

  $products = array(${product_rows.join('\r\n')});

  // ==============================================

  // Variants:

  $variants = array(${variant_rows.join('\r\n')});

  // ==============================================

${head_close}
`;

  console.blue('Writing .php...');
  const write_path = path.join(__dirname, "dist");
  if (!fs.existsSync(write_path))
    fs.mkdirSync(write_path);

  fs.writeFileSync(`${write_path}/seedProducts.php`, output, err => {
    if (err)  console.err(err);
    else      console.log('file written successfully!')
  });

  console.yellow('Copying file:\t/csv/dist  ->  /database/seeders');
  fs.copyFile(`${write_path}/seedProducts.php`, `${write_path}/../../seedProducts.php`, () => {
    console.green('File copied successfully.');
  });
};

// ==============================================

module.exports = build;
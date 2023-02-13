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



// $dummies = array(
//   //'title' [0], 'sub_title' [1],   'body' [2],  'category' [3],  'gender' [4],  'price' [5],  'price_compare' [6],  'created_at' [7]
//   // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
//   ['product a',  'product-a',  'shirts',         'red',         'lg',       'new',      'men',              10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
// ); // $dummies




  for (let j = 0; j < products[i].variants.length; ++j) {
      variant_rows.push(`  DB::table('variants')->insert([
    'product_id'  =>  ${i + 1},
    'qty'         =>  ${Number(products[i].variants[j]['qty'])},
    'size'        =>  "${products[i].variants[j]['size']}",     
    'color'       =>  "${products[i].variants[j]['color']}",     
    'img'         =>  "${products[i].variants[j]['img']}",     
    'created_at'  =>  date("Y-m-d H:i:s")
  ]);`);
  
    }
  }

  const output = `${head_open}

  // ==============================================

  // Products:

  $products = array(${product_rows.join('\r\n')});

  // ==============================================

  // Variants:



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
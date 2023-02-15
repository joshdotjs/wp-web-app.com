<?php

/*
Plugin Name: Custom DB Table -- wp_products
Description:
Version: 1.0
Author: Josh Holloway
Author URI: https://www.joshua-holloway.com/
*/

// ==============================================

if( ! defined( 'ABSPATH' ) ) exit; // Exit if accessed directly

// ==============================================

// 0.a (Activate) plugin hook:

register_activation_hook(__FILE__, function () {

  // --------------------------------------------

  // 5.0 < 5.9 (anything below 5.9 is unsupported)
  if(version_compare(get_bloginfo('version'), '5.9', '<')) {
    wp_die( // kill it
      __('You must updated WordPress to use this plugin', 'josh-namespace')
    );
  }

  // --------------------------------------------

  global $wpdb;
  $charsetCollate = $wpdb->get_charset_collate();

  // --------------------------------------------

  // Create the table when we activate the plugin.

  // ABSPATH is the path to the WP installation
  require_once(ABSPATH . "/wp-admin/includes/upgrade.php"); // -allow access to dbDelta()

  // --------------------------------------------

  // Create products table:
  $tableName = "{$wpdb->prefix}products";
  $sql = "CREATE TABLE {$tableName} (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(32) NULL,
    sub_title varchar(32) NULL,
    body varchar(1024) NULL,
    category varchar(32) NULL,
    gender varchar(32) NULL,
    price int(6) unsigned NULL,
    price_compare int(6) unsigned NULL
  ) ENGINE='InnoDB' {$charsetCollate};";

  // execute a query for creating tables
  dbDelta($sql); // only creates table if it does not exist

  // --------------------------------------------

  // Create variants table:
  $tableName = "{$wpdb->prefix}variants";
  $sql = "CREATE TABLE {$tableName} (
    id bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    img varchar(256) NULL,
    size varchar(32) NULL,
    color varchar(32) NULL,
    qty int(6) unsigned NULL,
    product_id bigint(20) unsigned NOT NULL
  ) ENGINE='InnoDB' {$charsetCollate};";

  // execute a query for creating tables
  dbDelta($sql); // only creates table if it does not exist

  // --------------------------------------------

  // load products and variants from seed file:
  require_once 'seedProducts.php';

  // --------------------------------------------
  
  // -Initialize table with dummy products 
  foreach($products as &$product) {

    // Create new row in table
    $wpdb->insert(
      "{$wpdb->prefix}products",
      [ //   col       val
        'title'            => $product[0],  // s
        'sub_title'        => $product[1],  // s
        'body'             => $product[2],  // s
        'category'         => $product[3],  // s
        'gender'           => $product[4],  // s
        'price'            => $product[5],  // d
        'price_compare'    => $product[6],  // d
      ],
      //  0    1     2     3     4     5     6 
      [ '%s', '%s', '%s', '%s', '%s', '%d', '%d' ],
    );
  }

  // --------------------------------------------
  
  // -Initialize table with dummy products 
  foreach($variants as &$variant) {

    // Create new row in table
    $wpdb->insert(
      "{$wpdb->prefix}variants",
      [ //   col       val
        'product_id'  => $variant[0],  // d
        'qty'         => $variant[1],  // s
        'size'        => $variant[2],  // s
        'color'       => $variant[3],  // s
        'img'         => $variant[4],  // s
      ],
      //  0    1     2     3     4  
      [ '%d', '%s', '%s', '%s', '%s' ],
    );
  }

  // --------------------------------------------

});

// 0.b: Deactivate plugin hook (TODO: Remove table drop!!!):
register_deactivation_hook( __FILE__, function() {
  global $wpdb;

  // Drop products table:
  $table_name = "{$wpdb->prefix}products";
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);

  // Drop variants table:
  $table_name = "{$wpdb->prefix}variants";
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);
} );

// ==============================================

// 1. REST endpoints: 

add_action('rest_api_init', function () {

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Read] - Get all products
  register_rest_route('josh/v1', 'products', [ // [GET]
    'methods' => WP_REST_SERVER::READABLE,
    'permission_callback' => '__return_true',
    'callback' => function() { 

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
    
      $products = $wpdb->get_results(
        "SELECT * FROM wp_products;"
      );

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['products'] = $products;
      return $res; 
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Read] Grab with filtering in POST body:
  register_rest_route('josh/v1', 'filter-products', [ // [POST]
    'methods' => WP_REST_SERVER::CREATABLE,
    'permission_callback' => '__return_true',
    'callback' => function($req) {

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
      
      // Grab data from req.body:
      $body = $req->get_json_params();

      $categories        = $body['categories'];
      $genders           = $body['genders'];
      
      $sort_col          = $body['sort_col'];
      $sort_direction    = $body['sort_direction'];
      
      $page_num          = $body['page_num'];
      $products_per_page = $body['products_per_page']; 

      $offset = ($page_num + 1) * $products_per_page;


     function doImplode ($arr) {
        $imploded = "'" . implode ( "', '", $arr ) . "'";
        return  $imploded;
      }

      $conditions = [];
      if (sizeof($categories) > 0) {
        $imploded_categories = doImplode($categories);
        array_push($conditions, "AND category IN ($imploded_categories)");
      } 
      if (sizeof($genders) > 0) {
        $imploded_genders = doImplode($genders);
        array_push($conditions, "AND gender IN ($imploded_genders)");
      }
      
      // -Generic, multiple row results can be pulled 
      //  from the database with get_results. 
      // -The method returns the entire query result 
      //  as an array. 
      // -Each element of this array corresponds 
      //  to one row of the query result and, 
      //  like get_row, can be an object, 
      //  an associative array, or a numbered array. 
      // -If no matching rows are found, 
      //  or if there is a database error, 
      //  the return value will be an empty array.
      // -If your $query string is empty, or you pass an invalid $output_type, 
      //  NULL will be returned.

      $imploded_conditions = implode(' ', $conditions);
 

      // Laravel:
      // $products = DB::table('products')
      // ->whereIn('category', $categories)
      // ->whereIn('gender', $genders)
      // ->skip($page_num * $products_per_page)
      // ->take($products_per_page)
      // ->orderBy($sort_col, $sort_direction)
      // ->get();

      $products_query = "SELECT * FROM wp_products
        WHERE 1=1 
        $imploded_conditions
        ORDER BY $sort_col $sort_direction
        LIMIT $products_per_page OFFSET $offset
      ;";

      $count_products_query = "SELECT COUNT(*) FROM wp_products
        WHERE 1=1 
        $imploded_conditions
      ";

      $products = $wpdb->get_results($wpdb->prepare(
        $products_query
      )); // array|object|null Database query results.

      $num_products = $wpdb->get_var($wpdb->prepare(
        $count_products_query
      ));

      // -Each row stores product data with an array storing the variants for that rows products
      $arr = [];
      foreach($products as $product) {
        $product_id = $product->id;
        
        // Laravel:
        //   $variants = DB::table('variants')
        //     ->where('product_id', '=', $product_id)
        //     ->get();
        $variants = $wpdb->get_results($wpdb->prepare(
          "SELECT * FROM wp_variants
            WHERE product_id = %d
          ;", $product_id
        ));

        array_push($arr, [
          'product'  => $product,
          'variants' => $variants,
        ]);
      };


      if ( $wpdb->last_error ) {
        $res['message'] = 'error grabbing products';
        return $res;
      }

      $res['status']       = 2;
      $res['message']      = 'success';
      $res['num_products'] = $num_products;

      // TODO:
      $res['products']     = $arr;
      $res['page_num']     = $page_num;
      return $res;
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 
  // - - - - - - - - - - - - - - - - - - - - - - 

});

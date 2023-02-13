<?php

/*
  Plugin Name: Custom DB Table -- wp_orders
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
  $tableName = "{$wpdb->prefix}orders";
  $charsetCollate = $wpdb->get_charset_collate();

  // --------------------------------------------

  // Create the table when we activate the plugin.

  // ABSPATH is the path to the WP installation
  require_once(ABSPATH . "/wp-admin/includes/upgrade.php"); // -allow access to dbDelta()

  // Create orders table:
  $sql = "CREATE TABLE {$tableName} (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    user_id bigint(20) unsigned NOT NULL,
    total int(6) NULL,
    time_stamp bigint(11) NULL,
    datetime_created datetime NULL,
    datetime_updated datetime NULL ON UPDATE CURRENT_TIMESTAMP,
    stage_1 bit(1) NULL,
    stage_2 bit(1) NULL,
    stage_3 bit(1) NULL,
    stage_4 bit(1) NULL,
    stage_5 bit(1) NULL
  ) ENGINE='InnoDB' {$charsetCollate};";

  // execute a query for creating tables
  dbDelta($sql); // only creates table if it does not exist

  // --------------------------------------------

  // wp_order_2_products
  $tableName = "{$wpdb->prefix}order_2_products";
  $sql = "CREATE TABLE {$tableName} (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    order_id bigint(20) unsigned NOT NULL,
    product_id bigint(20) unsigned NOT NULL,
    qty int(4) unsigned NOT NULL,
    product_price int(8) unsigned NOT NULL
  ) ENGINE='InnoDB' {$charsetCollate};";

  dbDelta($sql); // execute a query for creating tables

  // --------------------------------------------

  // -Initialize table with dummy products 
  $dummies = array(
    
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
    [1, 100, '2022-11-03 14:03:29', '2022-11-03 14:03:29'],
    [1, 200, '2022-11-10 14:03:29', '2022-11-03 14:03:29'],
    [1, 300, '2022-11-17 14:03:29', '2022-11-03 14:03:29'],
    [1, 400, '2022-11-24 14:03:29', '2022-11-03 14:03:29'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ); // $dummies

  foreach($dummies as &$dummy) {

    // Create new row in table
    $wpdb->insert(
      "{$wpdb->prefix}orders",
      [ //   col       val
        'user_id'           => $dummy[0],  // d
        'total'             => $dummy[1],  // d
        'datetime_created'  => $dummy[2],  // s
        'datetime_updated'  => $dummy[3],  // s
      ],
      //  0     1     2     3
      [ '%d', '%d', '%s', '%s', ],
    );
  }

  // --------------------------------------------

});

// ==============================================

// 0.b: Deactivate plugin hook (TODO: Remove table drop!!!):
register_deactivation_hook( __FILE__, function() {

  // TODO: REMOVE!!!
  // -Drop table => Effectively overwrite (via deactivate + activate) to refresh the table back to original state.
  //    --Without drop, table is only created if it does not exist)
  //    --We want to drop the table to just restart from scratch
  //      by deactivating & re-activating the plugin.
  //    --Also, since we add some dummy orders below,
  //      we don't want the number of dummy orders to 
  //      be added to a previously created set of dummy produdcts.

  global $wpdb;
  $table_name = "{$wpdb->prefix}orders";
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);

  $table_name = "{$wpdb->prefix}order_2_products";
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);

} );

// ==============================================

// 1. REST endpoints: 

add_action('rest_api_init', function () {

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Read] - Get all orders
  register_rest_route('josh/v1', 'orders', [ // [GET]
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => function() { 

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
  
      // Join orders and users tables
      $orders = $wpdb->get_results(
        "SELECT 
        wp_orders.ID AS order_id,	
        wp_orders.user_id,
        wp_users.display_name AS user_display_name,
        wp_users.user_email,
        wp_orders.total,
        wp_orders.time_stamp,
        wp_orders.datetime_created,
        wp_orders.datetime_updated
        FROM wp_orders
        INNER JOIN wp_users ON wp_orders.user_id = wp_users.ID;
      "); // array|object|null  Database query results.
        // -- wp_orders.stage_1,
        // -- wp_orders.stage_2,
        // -- wp_orders.stage_3,
        // -- wp_orders.stage_4,
        // -- wp_orders.stage_5,
        // -- wp_users.user_login,
        // -- wp_users.user_nicename,
        // -- wp_users.user_status
        
      if ( $wpdb->last_error ) {
        $res['message'] = 'error joining wp_orders with wp_users';
        return $res;
      }

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['orders'] = $orders;
      return $res; 
    },
  ]);

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Read] - Get order by ID - Get all products in order
  register_rest_route('josh/v1', 'order/(?P<id>\d+)', [
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => function($req) { 
  
      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
  
      $order_id = $req['id'];
  
      $order = $wpdb->get_results($wpdb->prepare(
        "SELECT 
        wp_orders.ID AS order_id,	
        wp_orders.user_id,
        wp_orders.total,
        wp_orders.time_stamp,
        wp_orders.stage_1,
        wp_orders.stage_2,
        wp_orders.stage_3,
        wp_orders.stage_4,
        wp_orders.stage_5,
        wp_users.user_login,
        wp_users.user_email,
        wp_users.user_nicename,
        wp_users.display_name,
        wp_users.user_status
        FROM wp_orders
        INNER JOIN wp_users ON wp_orders.user_id = wp_users.ID
        WHERE wp_orders.ID = %d;", $order_id 
      )); // array|object|null  Database query results.
      
      if ( $wpdb->last_error ) {
        $res['message'] = 'error joining order_2_products with orders table';
        return $res;
      }

      // -Get products for order
      $products = $wpdb->get_results($wpdb->prepare(
        "SELECT *
        FROM wp_order_2_products
        INNER JOIN wp_products ON wp_order_2_products.product_id = wp_products.ID
        WHERE wp_order_2_products.order_id = %d;", $order_id 
      )); // array|object|null  Database query results.

      if ( $wpdb->last_error ) {
        $res['message'] = 'error joining order_2_products with products table';
        return $res;
      }

      $res['status']   = 2;
      $res['message']  = 'success';
      $res['order']    = $order;
      $res['products'] = $products;
      return $res; 
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Read] Grab with filtering in POST body:
  register_rest_route('josh/v1', 'orders', [ // [POST]
    'methods' => WP_REST_SERVER::CREATABLE,
    'callback' => function($req) {

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
      
      // Grab data from req.body:
      $body = $req->get_json_params();

      $date_range_min = $body['date_range_min'];
      $date_range_max = $body['date_range_max'];

      $query =  "SELECT 
          wp_orders.ID AS order_id,	
          wp_orders.user_id,
          wp_users.display_name AS user_display_name,
          wp_users.user_email,
          wp_orders.total,
          wp_orders.time_stamp,
          wp_orders.datetime_created,
          wp_orders.datetime_updated,
          wp_orders.stage_1,
          wp_orders.stage_2,
          wp_orders.stage_3,
          wp_orders.stage_4,
          wp_orders.stage_5
          FROM wp_orders
          INNER JOIN wp_users ON wp_orders.user_id = wp_users.ID
          WHERE '{$date_range_min}' <= wp_orders.datetime_created
          AND wp_orders.datetime_created <= '{$date_range_max}'
        ;
      ";

      $orders = $wpdb->get_results($query); // array|object|null  Database query results.
        // -- wp_users.user_login,
        // -- wp_users.user_nicename,
        // -- wp_users.user_status

      if ( $wpdb->last_error ) {
        $res['message'] = 'error grabbing orders';
        $res['query']   = $query;
        return $res;
      }

      $res['date_range_min'] = $date_range_min;
      $res['status']         = 2;
      $res['message']        = 'success';
      $res['num_orders']     = sizeof($orders);
      $res['orders']         = $orders;

      return $res;
    },
  ]); // array|object|null Database query results.

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Create]
  register_rest_route('josh/v1', 'order', [ // [POST]
    'methods' => WP_REST_SERVER::CREATABLE,
    'callback' => function($req) {

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
      
      // Grab data from req.body:
      $body = $req->get_json_params();

      // -Get cart (array of objects)
      $cart = $body['cart'];

      // -Get ID of user
      // $user_id = get_current_user_id(); // [int] The current user's ID, or 0 if no user is logged in.
      $user_id = 1;
      // TODO
      // TODO
      // TODO
      // TODO
      // TODO
      // TODO
      // TODO
      // TODO



      // -Create row in wp_orders table
      $num_rows = $wpdb->insert( // Create new row in table
        "{$wpdb->prefix}orders",
        [ //   col           val
          
          // user_id bigint(20) unsigned NOT NULL,
          'user_id'       => $user_id,

          // stage_1 bit(1) NULL,
          // stage_2 bit(1) NULL,
          // stage_3 bit(1) NULL,
          // stage_4 bit(1) NULL,
          // stage_5 bit(1) NULL
        ],
        [ 
          '%d', 
          '%d',
        ]
      ); // int|false   The number of rows inserted, or false on error.

      if ($num_rows == false) {
        $res['message'] = 'error inserting product into wp_orders';
        return $res;
      }

      // -Get the ID of the new wp_orders row
      $order_id = $wpdb->insert_id;

      // update datetime
      $wpdb->query(
        $wpdb->prepare(
          "
            UPDATE {$wpdb->prefix}orders
            SET datetime_created = CURRENT_TIMESTAMP, time_stamp = %d
            WHERE id = %d;
          ",
          time(),
          $order_id,
        )
      );

      // -Store the cart items in the wp_order_2_products table
      $total = 0;
      foreach ($cart as &$line_item) {

        // NOTE: 
        //   -We want to grab the price of the products
        //    and compute the total here on backend.
        //   -If we send price from frontend then 
        //    user can modify the price in the request.

        // Look up the price of each item
        $product_id = $line_item['ID'];
        $product_price = $wpdb->get_var($wpdb->prepare(
          "SELECT price
          FROM wp_products
          WHERE ID =%d", $product_id
        )); // Should be an integer to keep everything in Cents to avoid decimals all together.

        // $line_item_price = qty * price
        $line_item_qty = $line_item['qty'];
        $line_item_price = $product_price * $line_item_qty;

        // Accumulate total
        $total += $line_item_price;
  
        $num_rows = $wpdb->insert( // Create new row in table
          "{$wpdb->prefix}order_2_products",
          [ //   col     val
            'order_id'        => $order_id, 
            'product_id'      => $product_id,
            'product_price'   => $line_item_price,
            'qty'             => $line_item_qty,
          ],
          [ 
            '%d', 
            '%d',
            '%d',
            '%d',
          ]
        ); // int|false The number of rows inserted, or false on error.
    
        if ($num_rows == false) {
          $res['message'] = 'error inserting product into order_2_products';
          return $res;
        }
      }


      // Update the wp_orders table with the total
      $num_rows = $wpdb->update( // returns false if errors
        "{$wpdb->prefix}orders", // table
        [ // data
          'total' => $total,
        ],
        [ 'ID' => $order_id ], // where
        [ '%d' ], // $total type
        [ '%d' ], // where_format
      ); // Returns false if errors, or the number of rows affected if successful
      if ($num_rows == false) {
        $res['message'] = 'error updating total in orders table';
        return $res;
      }


      $res['status']       = 2;
      $res['message']      = 'success';
      // $res['num_orders']   = sizeof($orders);
      // $res['orders']       = $orders;
      $res['body']         = $body;
      $res['cart']         = $cart;

      return $res;
    },
  ]);

  // - - - - - - - - - - - - - - - - - - - - - - 

  register_rest_route('josh/v1', 'update-stage/(?P<stage>\d+)', [ // [GET]
    'methods' => WP_REST_SERVER::READABLE,
    'permission_callback' => '__return_true',
    'callback' => function ($req) {

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];

      $stage = $req['stage'];
    
      // Step 1: Look up order post id for currently logged in user (most recent)
      // $user_id = get_current_user_id();
      $user_id = 1;
      // TODO: Fix
      // TODO: Fix
      // TODO: Fix
      // TODO: Fix
      // TODO: Fix
      
      $orders_table_id = $wpdb->get_var($wpdb->prepare(
        "SELECT *
          FROM   wp_orders
          WHERE  user_id =%d
          ORDER  BY time_stamp DESC
          LIMIT  1;", $user_id
      ));
    
      // Step 2: Update status of order.
      // UPDATE wp_orders
      // SET stage_1 = 1
      // WHERE ID = 1;
      $wpdb->update(
        'wp_orders',
        [ 'stage_' . $stage => 1 ],
        [ 'ID'       => $orders_table_id ],
        [ '%d' ],
        [ '%d' ],
      );

      $res['message'] = 'SUCCESS from WP endpoint:  /test [GET]';
      $res['status'] = 2;
    
      return $res;
    },
  ]);

  // - - - - - - - - - - - - - - - - - - - - - - 


});

// ==============================================
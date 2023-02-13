<?php

/*
Plugin Name: Custom DB Table -- wp_products
Description:
Version: 1.0
Author: Josh Holloway
Author URI: https://www.joshua-holloway.com/
*/



// ==============================================



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
  $tableName = "{$wpdb->prefix}products";
  $charsetCollate = $wpdb->get_charset_collate();

  // --------------------------------------------

  // Create the table when we activate the plugin.

  // ABSPATH is the path to the WP installation
  require_once(ABSPATH . "/wp-admin/includes/upgrade.php"); // -allow access to dbDelta()

  // Create products table:
  $sql = "CREATE TABLE {$tableName} (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
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




  require_once 'seedProducts.php';
  // $products = array(
  //   //'title' [0], 'slug' [1],   'category' [2],  'color' [3],  'size' [4],  'tag' [5],  'department' [6],  'stock' [7],  'price' [8],  'rating' [9],  'num_ratings' [10],  'image_id' [11],  'image_height' [12],  'image_width' [13],  'image_url' [14],                                                             'descript' [15],     'permalink_url' [16]
  //   // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  //   ['0', '1', '2', '3', '4', 5, 6],
  //   ['0', '1', '2', '3', '4', 5, 6],
  // ); // $dummies



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
});

// 0.b: Deactivate plugin hook (TODO: Remove table drop!!!):
register_deactivation_hook( __FILE__, function() {
  global $wpdb;
  $table_name = "{$wpdb->prefix}products";
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);
} );

// ==============================================
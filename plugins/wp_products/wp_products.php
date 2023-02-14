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
  $charsetCollate = $wpdb->get_charset_collate();

  // --------------------------------------------

  // Create the table when we activate the plugin.

  // ABSPATH is the path to the WP installation
  require_once(ABSPATH . "/wp-admin/includes/upgrade.php"); // -allow access to dbDelta()

  // --------------------------------------------

  // Create products table:
  $tableName = "{$wpdb->prefix}products";
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

  // Create variants table:
  $tableName = "{$wpdb->prefix}variants";
  $sql = "CREATE TABLE {$tableName} (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
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
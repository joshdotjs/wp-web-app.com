<?php

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
  $tableName = "{$wpdb->prefix}products";
  $charsetCollate = $wpdb->get_charset_collate();

  // --------------------------------------------

  // Create the table when we activate the plugin.

  // ABSPATH is the path to the WP installation
  require_once(ABSPATH . "/wp-admin/includes/upgrade.php"); // -allow access to dbDelta()

  // Create products table:
  $sql = "CREATE TABLE {$tableName} (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    -- post_id bigint(20) unsigned NOT NULL,
    title varchar(32) NULL,
    slug varchar(32) NULL,
    category varchar(32) NULL,
    color varchar(32) NULL,
    size varchar(32) NULL,
    tag varchar(32) NULL,
    department varchar(32) NULL,
    stock int(6) unsigned NULL,
    price int(6) unsigned NULL,
    rating float(3,2) unsigned NULL,
    num_ratings int(6) unsigned NULL,
    image_id int(6) unsigned NULL,
    image_height int(9) unsigned NULL,
    image_width int(9) unsigned NULL,
    image_url varchar(128) NULL,
    descript varchar(280) NULL, -- Tweet: 40-70 words (with spaces)
    permalink_url varchar(128) NULL
  ) ENGINE='InnoDB' {$charsetCollate};";

  // execute a query for creating tables
  dbDelta($sql); // only creates table if it does not exist

  // --------------------------------------------

  $description = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequa.';

  // -Initialize table with dummy products 
  $dummies = array(
    //'title' [0], 'slug' [1],   'category' [2],  'color' [3],  'size' [4],  'tag' [5],  'department' [6],  'stock' [7],  'price' [8],  'rating' [9],  'num_ratings' [10],  'image_id' [11],  'image_height' [12],  'image_width' [13],  'image_url' [14],                                                             'descript' [15],     'permalink_url' [16]
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
    ['product a',  'product-a',  'shirts',         'red',         'lg',       'new',      'men',              10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'red',         'lg',       'new',      'men',              10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'lg',       'new',      'men',              10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'lg',       'new',      'men',              10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product a',  'product-a',  'shirts',         'red',         'sm',       'new',      'men',              10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'red',         'sm',       'new',      'men',              10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'sm',       'new',      'men',              10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'sm',       'new',      'men',              10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product a',  'product-a',  'shirts',         'red',         'lg',       'new',      'men',              10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'red',         'lg',       'new',      'men',              10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'lg',       'new',      'men',              10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'lg',       'new',      'men',              10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product a',  'product-a',  'shirts',         'red',         'sm',       'new',      'men',              10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'red',         'sm',       'new',      'men',              10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'sm',       'new',      'men',              10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    ['product a',  'product-a',  'shirts',         'blue',        'sm',       'new',      'men',              10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-a'],
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
    ['product c',  'product-c',  'shirts',         'red',         'lg',       'new',      'women',            10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'red',         'lg',       'new',      'women',            10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'lg',       'new',      'women',            10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'lg',       'new',      'women',            10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product c',  'product-c',  'shirts',         'red',         'sm',       'new',      'women',            10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'red',         'sm',       'new',      'women',            10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'sm',       'new',      'women',            10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'sm',       'new',      'women',            10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product c',  'product-c',  'shirts',         'red',         'lg',       'new',      'women',            10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'red',         'lg',       'new',      'women',            10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'lg',       'new',      'women',            10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'lg',       'new',      'women',            10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product c',  'product-c',  'shirts',         'red',         'sm',       'new',      'women',            10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'red',         'sm',       'new',      'women',            10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'sm',       'new',      'women',            10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    ['product c',  'product-c',  'shirts',         'blue',        'sm',       'new',      'women',            10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-c'],
    // ===================================================================================================================================================================
    ['product b',  'product-b',  'pants',         'red',         'lg',       'sale',     'men',              10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'red',         'lg',       'sale',     'men',              10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'lg',       'sale',     'men',              10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'lg',       'sale',     'men',              10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product b',  'product-b',  'pants',         'red',         'sm',       'sale',      'men',             10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'red',         'sm',       'sale',      'men',             10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'sm',       'sale',      'men',             10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'sm',       'sale',      'men',             10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product b',  'product-b',  'pants',         'red',         'lg',       'sale',      'men',             10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'red',         'lg',       'sale',      'men',             10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'lg',       'sale',      'men',             10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'lg',       'sale',      'men',             10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product b',  'product-b',  'pants',         'red',         'sm',       'sale',      'men',             10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'red',         'sm',       'sale',      'men',             10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'sm',       'sale',      'men',             10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    ['product b',  'product-b',  'pants',         'blue',        'sm',       'sale',      'men',             10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-b'],
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
    ['product d',  'product-d',  'pants',         'red',         'lg',       'sale',    'women',             10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'red',         'lg',       'sale',    'women',             10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'lg',       'sale',    'women',             10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'lg',       'sale',    'women',             10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product d',  'product-d',  'pants',         'red',         'sm',       'sale',     'women',            10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'red',         'sm',       'sale',     'women',            10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'sm',       'sale',     'women',            10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'sm',       'sale',     'women',            10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product d',  'product-d',  'pants',         'red',         'lg',       'sale',    'women',             10,           100,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'red',         'lg',       'sale',    'women',             10,           200,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'lg',       'sale',    'women',             10,           300,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'lg',       'sale',    'women',             10,           400,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    ['product d',  'product-d',  'pants',         'red',         'sm',       'sale',     'women',            10,           500,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'red',         'sm',       'sale',     'women',            10,           600,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'sm',       'sale',     'women',            10,           700,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    ['product d',  'product-d',  'pants',         'blue',        'sm',       'sale',     'women',            10,           800,          0,             0,                   247,             438,                  640,                'http://jadefse.local/wp-content/uploads/2022/12/Slide-16_9-1-1024x576.png',  $description,         'http://jadefse.local/product-d'],
    // -------------------------------------------------------------------------------------------------------------------------------------------------------------------
  ); // $dummies

  foreach($dummies as &$dummy) {

    // Create new row in table
    $wpdb->insert(
      "{$wpdb->prefix}products",
      [ //   col       val
        'title'            => $dummy[0],  // s
        'slug'             => $dummy[1],  // s
        'category'         => $dummy[2],  // s
        'color'            => $dummy[3],  // s
        'size'             => $dummy[4],  // s
        'tag'              => $dummy[5],  // s
        'department'       => $dummy[6],  // s
        'stock'            => $dummy[7],  // d
        'price'            => $dummy[8],  // d
        'rating'           => null,       // f
        'num_ratings'      => $dummy[10], // d
        'image_id'         => $dummy[11], // d
        'image_height'     => $dummy[12], // d
        'image_width'      => $dummy[13], // d
        'image_url'        => $dummy[14], // s
        'descript'         => $dummy[15], // s
        'permalink_url'    => $dummy[16], // s
      ],
      //  0    1     2     3     4     5     6     7     8     9     10    11    12    13    14    15    16
      [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d', '%f', '%d', '%d', '%d', '%d', '%s', '%s', '%s', ],
    );
  }

  // --------------------------------------------
});

// 0.b: Deactivate plugin hook (TODO: Remove table drop!!!):
register_deactivation_hook( __FILE__, function() {

  // TODO: REMOVE!!!
  // -Drop table => Effectively overwrite (via deactivate + activate) to refresh the table back to original state.
  //    --Without drop, table is only created if it does not exist)
  //    --We want to drop the table to just restart from scratch
  //      by deactivating & re-activating the plugin.
  //    --Also, since we add some dummy products below,
  //      we don't want the number of dummy products to 
  //      be added to a previously created set of dummy produdcts.

  global $wpdb;
  $table_name = "{$wpdb->prefix}products";
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
    'callback' => function() { 


      return 'JOSH';

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
  
  // [CRUD - Read] - Get product by ID
  register_rest_route('josh/v1', 'product/(?P<id>\d+)', [
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => function($req) { 

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];

      $id = $req['id'];

      $product = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM wp_products
        WHERE ID = %d;", $id 
      ));

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['product'] = $product;
      return $res; 
    },
  ]);

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Read] - Get product(s) [all variants] by slug
  register_rest_route('josh/v1', 'products/(?P<slug>[^/]+)', [ // https://stackoverflow.com/a/56038307
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => function($req) { 

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];

      $slug = $req['slug'];
    
      $products = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM wp_products
        WHERE slug = %s;", $slug 
      ));

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['products'] = $products;
      return $res; 
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Read] Grab with filtering in POST body:
  register_rest_route('josh/v1', 'products', [ // [POST]
    'methods' => WP_REST_SERVER::CREATABLE,
    'callback' => function($req) {

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
      
      // Grab data from req.body:
      $body = $req->get_json_params();

      // $title     = $body['title'];        // s  0
      // $slug      = $body['slug'];         // s  1

      $categories   = $body['categories'];   // s  2
      $colors       = $body['colors'];       // s  3
      $sizes        = $body['sizes'];        // s  4
      $tags         = $body['tags'];         // s  5
      $departments  = $body['departments'];  // s  6
      $stock_min    = $body['stock']['min']; // d  7
      $stock_max    = $body['stock']['max']; // d  7
      $price_min    = $body['price']['min']; // d  7
      $price_max    = $body['price']['max']; // d  7
      $sort_col     = $body['sort']['col'];
      $sort_type    = $body['sort']['type'];

     function doImplode ($arr) {
        $imploded = "'" . implode ( "', '", $arr ) . "'";
        return  $imploded;
      }

      $conditions = [];
      if (sizeof($categories) > 0) {
        $imploded_categories = doImplode($categories);
        array_push($conditions, "AND category IN ($imploded_categories)");
      } 
      if (sizeof($tags) > 0) {
        $imploded_tags = doImplode($tags);
        array_push($conditions, "AND tag IN ($imploded_tags)");
      } 
      if (sizeof($sizes) > 0) {
        $imploded_sizes = doImplode($sizes);
        array_push($conditions, "AND size IN ($imploded_sizes)");
      }
      if (sizeof($colors) > 0) {
        $imploded_colors = doImplode($colors);
        array_push($conditions, "AND color IN ($imploded_colors)");
      }
      if (sizeof($departments) > 0) {
        $imploded_departments = doImplode($departments);
        array_push($conditions, "AND department	IN ($imploded_departments)");
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
 
      $products = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM wp_products
          WHERE price >= $price_min 
            AND price <= $price_max
            AND stock >= $stock_min
            AND stock <= $stock_max
          $imploded_conditions 
          ORDER BY $sort_col $sort_type;
        ;"
      )); // array|object|null Database query results.

      if ( $wpdb->last_error ) {
        $res['message'] = 'error grabbing products';
        return $res;
      }

      $res['status']       = 2;
      $res['message']      = 'success';
      $res['num_products'] = sizeof($products);
      $res['products']     = $products;
      $res['departments']  = $departments;
      $res['categories']   = $categories;
      $res['tags']         = $tags;
      $res['sort']         = [ 'col' => $sort_col, 'type' => $sort_type ];
      
      return $res;
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Create] Create a product:
  register_rest_route('josh/v1', 'product', [ // [POST]
    'methods' => WP_REST_SERVER::CREATABLE,
    'permission_callback' => '__return_true',
    'callback' => function($req){ 

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];
      
      // Grab data from req.body:
      $body = $req->get_json_params();
    
      // Create new row in table
      $wpdb->insert( 
        "{$wpdb->prefix}products",
        [
          'title'            => $body['title'],       // s  0
          'slug'             => $body['slug'],        // s  1
          'category'         => $body['category'],    // s  2
          'color'            => $body['color'],       // s  3
          'size'             => $body['size'],        // s  4
          'tag'              => $body['tag'],         // s  5
          'department'       => $body['department'],  // s  6
          'stock'            => $body['stock'],       // d  7
          'price'            => $body['price'],       // d  8
          'rating'           => null,                 // f  9
          'num_ratings'      => 0,                    // d  10
          'image_id'         => $body['image_id'],    // d  11
          'image_url'        => $body['image_url'],   // s  12
          'image_height'     => $body['image_height'],// s  13
          'image_width'      => $body['image_width'], // s  14
          'descript'         => $body['description'], // s  15
          'permalink_url'    => 'http://jadefse.local/' . $body['slug'], // s  16
        ],//0     1     2     3     4     5     6     7     8    9     10    11    12    13    14    15    16
        [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d', '%f', '%d', '%d', '%s', '%d', '%s', '%s', '%s', ],
      );

      $id = $wpdb->insert_id;

      $product = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM wp_products
        WHERE ID = %d;", $id 
      ));
    
      // -emmit event
      //  --1. event name
      //  --2. data to be passed to other plugins
      do_action('product_created', [
        'ID' => $id,
      ]);
    
      $res['status'] = 2;
      $res['message'] = 'success';
      $res['id'] = $id;
      $res['product'] = $product;
      return $res;
    },
  ]);
  
  // // - - - - - - - - - - - - - - - - - - - - - - 

  // // [CRUD - Update] Edit a product:
  register_rest_route('josh/v1', 'product/(?P<id>\d+)', [ // [PUT]
    'methods' => WP_REST_SERVER::EDITABLE,
    'callback' => function($req) {

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];

      // URL path variable:
      $id = $req['id'];

      // Grab data from req.body:
      $body = $req->get_json_params();

    
      // update( $table, $data, $where, $format = null, $where_format = null );
      $num_rows = $wpdb->update( // returns false if errors
        "{$wpdb->prefix}products", // table
        [ // data
          'title'       => $body['title'],        // s  0
          'slug'        => $body['slug'],        // s  1
          'category'    => $body['category'],   // s  2
          'color'       => $body['color'],       // s  3
          'size'        => $body['size'],        // s  4
          'tag'         => $body['tag'],         // s  5
          'department'  => $body['department'],  // s  6
          'stock'       => $body['stock'],        // d  7
          'price'       => $body['price'],        // d  8
          // 'rating'      => null,               // f  9
          // 'num_ratings' => 0,                  // d  10
          'image_id'    => $body['image_id'],     // d  11
          'image_url'   => $body['image_url'],    // s  12
          'image_height'=> $body['image_height'], // s  13
          'image_width' => $body['image_width'],  // s  14
          'descript'    => $body['description'],  // s  15
          'permalink_url'    => 'http://jadefse.local/' . $body['slug'], // s  16
        ],
        [ 'ID' => $id ], // where
          //0     1     2     3     4     5     6     7     8       9    10      11    12    13    14    15    16
        [ '%s', '%s', '%s', '%s', '%s', '%s', '%s', '%d', '%d', /*'%f', '%d',*/ '%d', '%s', '%d', '%s', '%s', '%s', ],
        [ '%d' ], // where_format
      );

      if ($num_rows == false) {
        return $res;
      }

      $id = $wpdb->insert_id;

      $product = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM wp_products
        WHERE ID = %d;", $id 
      ));
      
      $res['status'] = 2;
      $res['message'] = 'success';
      $res['num_rows_deleted'] = $num_rows;
      $res['product'] = $product;
      return $res; 
      // return 'endpoint:  /product [PUT]'; 
    },
  ]);

  // // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Delete] Delete a product by ID (delete a single variant):
  register_rest_route('josh/v1', 'product/(?P<id>\d+)', [ // [DELETE]
    'methods' => WP_REST_SERVER::DELETABLE,
    'callback' => function($req) { 

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];

      $id = $req['id'];
    
      $num_rows = $wpdb->delete( 'wp_products', array( 'ID' => $id ) );

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['num_rows_deleted'] = $num_rows;
      return $res; 
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Delete] Delete a product by slug (delete all variants):
  register_rest_route('josh/v1', 'products/(?P<slug>[^/]+)', [ // [DELETE]
    'methods' => WP_REST_SERVER::DELETABLE,
    'callback' => function($req) {

      global $wpdb;
      $res = ['status' => 1, 'message' => 'error'];

      $slug = $req['slug'];
    
      $num_rows = $wpdb->delete( 'wp_products', [
        'slug' => $slug
      ], [
        '%s'
      ]);

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['num_rows_deleted'] = $num_rows;
      return $res; 
    },
  ]);

  // - - - - - - - - - - - - - - - - - - - - - - 

});

// ==============================================
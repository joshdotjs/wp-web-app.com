<?php

/*
Plugin Name: Custom DB Table -- wp_tags
Description:
Version: 1.0
Author: Josh Holloway
Author URI: https://www.joshua-holloway.com/
*/

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
  $tableName = "{$wpdb->prefix}tags";
  $charsetCollate = $wpdb->get_charset_collate();

  // --------------------------------------------

  // Create the table when we activate the plugin.

  // ABSPATH is the path to the WP installation
  require_once(ABSPATH . "/wp-admin/includes/upgrade.php"); // -allow access to dbDelta()

  // Create tags table:
  $sql = "CREATE TABLE {$tableName} (
    ID bigint(20) unsigned NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title varchar(32) NULL,
    slug varchar(32) NULL,
    detailed varchar(64) NULL
  ) ENGINE='InnoDB' {$charsetCollate};";

// execute a query for creating tables
  dbDelta($sql); // only creates table if it does not exist

  // --------------------------------------------

  // -Initialize table with dymmy tags 
  $dummies = array(
    //'title' [0], 'slug' [1],  
    ['Featured', 'featured', 'Featured Items' ],
    ['New',      'new', 'New Arrivals' ],
    ['Sale',     'sale', 'On Sale' ],
  ); // $dummies

  foreach($dummies as &$dummy) {

    // Create new row in table
    $wpdb->insert(
      "{$wpdb->prefix}tags",
      [ //   col       val
        'title'       => $dummy[0],
        'slug'        => $dummy[1],
        'detailed'    => $dummy[2],
      ],
      [ '%s', '%s', '%s', ]
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
  //    --Also, since we add some dummy tags below,
  //      we don't want the number of dummy tags to 
  //      be added to a previously created set of dummy produdcts.

  global $wpdb;
  $table_name = "{$wpdb->prefix}tags";
  $sql = "DROP TABLE IF EXISTS $table_name";
  $wpdb->query($sql);
} );

// ==============================================

// 1. REST endpoints: 

add_action('rest_api_init', function () {

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Read] - Get all tags
  register_rest_route('josh/v1', 'tags', [ // [GET]
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => function() { 

      global $wpdb;
      $tableName = "{$wpdb->prefix}tags";
      $res = ['status' => 1, 'message' => 'error'];
    
      $tags = $wpdb->get_results(
        "SELECT * FROM {$tableName};"
      );

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['tags'] = $tags;
      return $res; 
    },
  ]);

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Read] - Get tag by ID
  register_rest_route('josh/v1', 'tag/(?P<id>\d+)', [
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => function($req) { 

      global $wpdb;
      $tableName = "{$wpdb->prefix}tags";
      $res = ['status' => 1, 'message' => 'error'];

      $id = $req['id'];

      $tag = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM {$tableName}
        WHERE ID = %d;", $id 
      ));

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['tag'] = $tag;
      return $res; 
    },
  ]);

  // - - - - - - - - - - - - - - - - - - - - - - 
  
  // [CRUD - Read] - Get tag(s) by slug
  register_rest_route('josh/v1', 'tags/(?P<slug>[^/]+)', [ // https://stackoverflow.com/a/56038307
    'methods' => WP_REST_SERVER::READABLE,
    'callback' => function($req) { 

      global $wpdb;
      $tableName = "{$wpdb->prefix}tags";
      $res = ['status' => 1, 'message' => 'error'];

      $slug = $req['slug'];
    
      $tags = $wpdb->get_results($wpdb->prepare(
        "SELECT * FROM {$tableName}
        WHERE slug = %s;", $slug 
      ));

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['tags'] = $tags;
      return $res; 
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Read] Grab with filtering in POST body:
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Create] Create a tag:
  register_rest_route('josh/v1', 'tag', [ // [POST]
    'methods' => WP_REST_SERVER::CREATABLE,
    'callback' => function($req){ 

      global $wpdb;
      $tableName = "{$wpdb->prefix}tags";
      $res = ['status' => 1, 'message' => 'error'];
      
      // Grab data from req.body:
      $body = $req->get_json_params();
    
      // Create new row in table
      $wpdb->insert( 
        $tableName,
        [
          'title'       => $body['title'],      // s  0
          'slug'        => $body['slug'],       // s  1
          'detailed'    => $body['title'],      // s  2
        ],//0     1     2
        [ '%s', '%s', '%s', ]
      );

      $id = $wpdb->insert_id;

      // Get updated tags
      $tags = $wpdb->get_results("SELECT * FROM {$tableName}");
        
      // -emmit event
      //  --1. event name
      //  --2. data to be passed to other plugins
      do_action('tag_created', [
        'ID' => $id,
      ]);
    
      $res['status'] = 2;
      $res['message'] = 'success';
      $res['id'] = $id;
      $res['tags'] = $tags;
      return $res;
    },
  ]);
  
  // // - - - - - - - - - - - - - - - - - - - - - - 

  // // [CRUD - Update] Edit a tag:
  register_rest_route('josh/v1', 'tag/(?P<id>\d+)', [ // [PUT]
    'methods' => WP_REST_SERVER::EDITABLE,
    'callback' => function($req) {

      global $wpdb;
      $tableName = "{$wpdb->prefix}tags";
      $res = ['status' => 1, 'message' => 'error', 'num_rows_updated' => 0];

      // URL path variable:
      $id = $req['id'];

      // Grab data from req.body:
      $body = $req->get_json_params();

      // update( $table, $data, $where, $format = null, $where_format = null );
      $num_rows = $wpdb->update( // returns false if errors
        $tableName , // table
        [ // data
          'title'       => $body['title'],      // s  0
          'slug'        => $body['slug'],       // s  1
          'detailed'    => $body['title'],      // s  2
        ],//0     1     2     3     4     5     6     7     8     9    10
        [ 'ID' => $id ], // where
        [ '%s', '%s' , '%s' ], // format
        [ '%d' ], // where_format
      );

      if ($num_rows == false) {
        return $res;
      }

      // Get updated tags
      $tags = $wpdb->get_results("SELECT * FROM {$tableName}");
      
      $res['status'] = 2;
      $res['message'] = 'success';
      $res['num_rows_updated'] = $num_rows;
      $res['tags'] = $tags;
      return $res; 
    },
  ]);

  // // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Delete] Delete a tag by ID (delete a single variant):
  register_rest_route('josh/v1', 'tag/(?P<id>\d+)', [ // [DELETE]
    'methods' => WP_REST_SERVER::DELETABLE,
    'callback' => function($req) { 

      global $wpdb;
      $tableName = "{$wpdb->prefix}tags";
      $res = ['status' => 1, 'message' => 'error', 'num_rows_deleted' => 0];

      $id = $req['id'];
    
      $num_rows = $wpdb->delete( $tableName, array( 'ID' => $id ) );

      if ($num_rows == false) {
        return $res;
      }

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['num_rows_deleted'] = $num_rows;
      return $res; 
    },
  ]);
  
  // - - - - - - - - - - - - - - - - - - - - - - 

  // [CRUD - Delete] Delete a tag by slug (delete all variants):
  register_rest_route('josh/v1', 'tags/(?P<slug>[^/]+)', [ // [DELETE]
    'methods' => WP_REST_SERVER::DELETABLE,
    'callback' => function($req) {

      global $wpdb;
      $tableName = "{$wpdb->prefix}tags";
      $res = ['status' => 1, 'message' => 'error', 'num_rows_deleted' => 0];

      $slug = $req['slug'];
    
      $num_rows = $wpdb->delete( $tableName, [
        'slug' => $slug
      ], [
        '%s'
      ]);

      if ($num_rows == false) {
        return $res;
      }

      $res['status'] = 2;
      $res['message'] = 'success';
      $res['num_rows_deleted'] = $num_rows;
      return $res; 
    },
  ]);

});

// ==============================================
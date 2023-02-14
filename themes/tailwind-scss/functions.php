<?php

// ==============================================

add_action('wp_enqueue_scripts', function() {

  wp_enqueue_script('main-js', get_theme_file_uri('/build/index.js'), array('wp-element'), '1.0', true);
  wp_enqueue_style('main-css', get_theme_file_uri('/build/index.css'));

  wp_localize_script('main-js', 'PHP', array(
    'is_user_logged_in'   => is_user_logged_in(),
    'wp_get_current_user' => wp_get_current_user(),
    'nonce'               => wp_create_nonce('wp_rest'),
    'site_url'            => esc_url_raw( site_url('') ),       // http://localhost:3000
    'rest_url'            => esc_url_raw(rest_url('josh/v1')),  // http://localhost:3000/wp-json/josh/v1
    'wp_rest_url'         => esc_url_raw(rest_url('wp/v2')),  // http://localhost:3000/wp-json/wp/v2
    
    
    'api_url_prod'        => esc_url_raw('https://ecommerce-nodejs.herokuapp.com'),
    'api_url_dev'         => esc_url_raw('http://localhost:9000'),
  ));
  
});

// ==============================================

add_action('after_setup_theme', function() {
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
});

// ==============================================

add_filter( 'ai1wm_exclude_themes_from_export',
function ( $exclude_filters ) {
  $exclude_filters[] = 'josh-theme-tailwind/node_modules';
  return $exclude_filters;
} );
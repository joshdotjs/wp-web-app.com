<!DOCTYPE html>
<!-- "Sticky" footer: https://css-tricks.com/couple-takes-sticky-footer/ -->
<!-- <html < ?php language_attributes(); ?>> -->
<html>
  <head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="<?php echo get_theme_file_uri('/web-comp/_template.js') ?>" type="module"><script>
    <?php wp_head(); ?>
  </head>
  <body <?php body_class(); ?> >




    <?php
      $site_URLs = [ // URL's for page navigation
        'home'           => esc_url_raw( site_url('/') ),
        'about'          => esc_url_raw( site_url('/about') ),  
        'contact'        => esc_url_raw( site_url('/contact') ),
        'blog'           => esc_url_raw( site_url('/blog') ),
        'store'          => esc_url_raw( site_url('/store') ),
        'orders'         => esc_url_raw( site_url('/orders') ),
        'auth_login'     => esc_url_raw( site_url('/auth-login') ),
        'auth_register'  => esc_url_raw( site_url('/auth-register') ),
      ];

      $rest_URLs = [ // URL's for REST endpoints
        'base' => esc_url_raw(rest_url('josh/v1')),
        'signup' => esc_url_raw(rest_url('josh/v1/signup')),
        'signin' => esc_url_raw(rest_url('josh/v1/signin')),
        // 'signout' => esc_url_raw(rest_url('josh/v1/signout')),
        // 'users' => esc_url_raw(rest_url('josh/v1/users')),
        // 'orders' => esc_url_raw(rest_url('josh/v1/orders')),
        // 'categories' => esc_url_raw(rest_url('josh/v1/categories')),
        // 'colors' => esc_url_raw(rest_url('josh/v1/colors')),
        // 'departments' => esc_url_raw(rest_url('josh/v1/departments')),
        // 'sizes' => esc_url_raw(rest_url('josh/v1/sizes')),
        // 'tags' => esc_url_raw(rest_url('josh/v1/tags')),
      ];

      if(is_page('home')    or wp_get_post_parent_id(0) == 83)   $active_page = 'home';
      if(is_page('about')   or wp_get_post_parent_id(0) == 75)   $active_page = 'about';
      if(is_page('contact') or wp_get_post_parent_id(0) == 110)  $active_page = 'contact';
      if(is_page('blog')    or wp_get_post_parent_id(0) == 87)   $active_page = 'blog';
      if(is_page('store')   or wp_get_post_parent_id(0) == 112)  $active_page = 'store';

      // Auth:
      $is_logged_in = is_user_logged_in();
      $current_user = wp_get_current_user();
      $nonce = wp_create_nonce();


  
      // ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱ ╲╱
      // ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ ⋁ 
      // ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓ ↓
      // ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼ ▼
      // ADD BELOW FOR THE RATING STUFF (from plugins/josh-plugin)!!
      // ADD BELOW FOR THE RATING STUFF (from plugins/josh-plugin)!!
      // ADD BELOW FOR THE RATING STUFF (from plugins/josh-plugin)!!
      // ADD BELOW FOR THE RATING STUFF (from plugins/josh-plugin)!!
      // ADD BELOW FOR THE RATING STUFF (from plugins/josh-plugin)!!
      // ADD BELOW FOR THE RATING STUFF!!
      // ADD BELOW FOR THE RATING STUFF!!
      // ADD BELOW FOR THE RATING STUFF!!
      // // TEMP - DEBUG
      // // TEMP - DEBUG
      // // TEMP - DEBUG
      // // TEMP - DEBUG
      // $userID = 55;
      // $postID = 55;
      //
      // // Count:
      // // -We did this same count via PHP in  the auth/index.php
      // //  via  $wpdb->num_rows.
      // global $wpdb;
      // $ratingCount = $wpdb->get_var($wpdb->prepare(
      //   "SELECT COUNT(*) FROM {$wpdb->prefix}recipe_ratings
      //   WHERE post_id=%d AND user_id=%d",
      //   $postID, $userID
      // ));


      ?>
    
    
    <!-- NOTE: data-key attributes are used in JS as elem.dataset.key, converted to lowercase if key is uppercase! -->
    <!-- NOTE: single quotes (') are required surrounding the value due to there being double-quotes in the stringified JSON returned from wp_json_encode() -->
    <div 
      id="react-header" 
      data-site_urls='<?php echo wp_json_encode($site_URLs); ?>'
      data-rest_urls='<?php echo wp_json_encode($rest_URLs); ?>'
      data-active_page='<?php echo $active_page; ?>'
      data-is_logged_in='<?php echo $is_logged_in; ?>'
      data-current_user='<?php echo wp_json_encode($current_user); ?>'
    >
    </div>
    <div id="react-portal-cart"></div>
    <div id="react-portal-navdrawer"></div>
    <div id="react-portal-modal"></div>


    <div id="react-portal-navbar"></div>
    <div id="react-portal-mobile-filters"></div>


    <div id="page-content">

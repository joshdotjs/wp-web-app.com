<?php

get_header(); ?>

<!-- ======================================== -->

<h2 id="debug-php-file" style="position: fixed; z-index: 100; bottom: 10px; left: 10px; color: white; background: deepskyblue; padding: 0.5rem;">single.php</h2>

<!-- <div class="max-w-4xl mx-auto px-4"> -->





<div >
  <?php if (have_posts()) {
    while(have_posts()) {
      the_post(); ?>



      <!--react component -->
      <div id="react-theme--single" data-id="<?php echo get_the_ID(); ?>"></div>
      <!-- endreact component -->
      
      <div>
        <h1><?php the_title(); ?></h1>
        <?php the_content(); ?>
      </div>
    <?php }
  } ?>
</div>


<!-- </div> -->

<!-- ======================================== -->


<?php get_footer();
<?php  //  Page: About  =>  /about

get_header(); ?>

<!-- ======================================== -->

<h1>DEBUG PAGE</h1>

<web-comp-template>index.php</web-comp-template>

<h2 id="debug-php-file" style="position: fixed; z-index: 100; bottom: 10px; left: 10px; color: white; background: deepskyblue; padding: 0.5rem;">index.php</h2>

<!-- <div class="max-w-4xl mx-auto px-4"> -->


  <!--react component -->
  <div id="react-theme--page-blog"></div>
  <!-- endreact component -->

  <div class="prose max-w-full">
    <?php if (have_posts()) {
      while(have_posts()) {
        the_post(); ?>
        <div>
          <h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
          <?php the_content(); ?>
        </div>
      <?php }
    } ?>
  </div>
<!-- </div> -->

  <!-- ======================================== -->

<?php get_footer();
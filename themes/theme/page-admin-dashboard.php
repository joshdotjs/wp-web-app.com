<?php  //  Page: admin-dashboard  =>  /admin-dashboard

get_header(); ?>

<!-- ======================================== -->

<h2 id="debug-php-file" style="position: fixed; z-index: 100; bottom: 10px; left: 10px; color: white; background: deepskyblue; padding: 0.5rem;">page-admin-dashboard.php</h2>

<div id="react-theme--page-admin-dashboard-container">

<!--react component -->
<div id="react-theme--page-admin-dashboard"></div>
<!-- endreact component -->
<script type="module">
  // const container = document.querySelector('#react-theme--page-admin-dashboard-container');
  const header = document.querySelector('#react-header > header');
  const footer = document.querySelector('#react-footer > footer');
  // const header_height = header.offsetHeight;
  // console.log('header: ', header_height);
  // container.style.marginTop = `150px`;
  if (header)
    header.style.display = 'none';
  if (footer)
    footer.style.display = 'none';
</script>


</div>

  <!-- ======================================== -->

<?php get_footer();
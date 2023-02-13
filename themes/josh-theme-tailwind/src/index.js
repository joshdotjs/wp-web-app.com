// import "./main.scss"; // index.css loaded in functions.php for tailwind
import React from "react";
import ReactDOM from "react-dom";

import { log } from "./util/log";
import { setLS } from "./util/local-storage";

// NOTE:
//  -In "Loading React on the Frontend" the following is done:
//  --import { render } from '@wordpress/element'; // both versions are the same, but WP provides backwards compatability so it is safer for the future to use the WP version
//  --document.addEventListener('DOMContentLoaded', () => {
//      render(<Component />, root);
// });

// console.lot('universityData: ', universityData);

// ==============================================

const json = (str) => JSON.parse(str);

// ==============================================

import PageHome from "./pages/page-home/page-home";
const home_page_root = document.querySelector("#react-theme--page-home");
if (home_page_root) {
  ReactDOM.render(<PageHome />, home_page_root);
}

// ==============================================

import PageAbout from "./pages/page-about/page-about";
const about_page_root = document.querySelector("#react-theme--page-about");
if (about_page_root) {
  ReactDOM.render(<PageAbout />, about_page_root);
}

// ==============================================

import PageStore from "./pages/page-store/_page-store";
const store_page_root = document.querySelector("#react-theme--page-store");
if (store_page_root) {
  ReactDOM.render(<PageStore />, store_page_root);
}

// ==============================================

import PageContact from "./pages/page-contact/page-contact";
const contact_page_root = document.querySelector("#react-theme--page-contact");
if (contact_page_root) {
  ReactDOM.render(<PageContact />, contact_page_root);
}

// ==============================================

import PageBlog from "./pages/page-blog/page-blog";
const blog_page_root = document.querySelector("#react-theme--page-blog");
if (blog_page_root) {
  ReactDOM.render(<PageBlog />, blog_page_root);
}

// ==============================================

import PageOrders from "./pages/page-orders/_page-orders";
const orders_page_root = document.querySelector("#react-theme--page-orders");
if (orders_page_root) {
  ReactDOM.render(<PageOrders />, orders_page_root);
}

// ==============================================

import PageCheckout from "./pages/page-checkout/_page-checkout";
const checkout_page_root = document.querySelector("#react-theme--page-checkout");
if (checkout_page_root) {
  ReactDOM.render(<PageCheckout />, checkout_page_root);
}

// ==============================================

import PageAuth from "./pages/page-auth/_page-auth";

// Auth page 1: Login
const auth_page_login_root = document.querySelector("#react-theme--page-auth-login");
if (auth_page_login_root) {
  ReactDOM.render(<PageAuth auth_type="login" />, auth_page_login_root);
}

// Auth page 2: Register
const auth_register_page_root = document.querySelector("#react-theme--page-auth-register");
if (auth_register_page_root) {
  ReactDOM.render(<PageAuth auth_type="register" />, auth_register_page_root);
}

// ==============================================

import PageAdminDashboard from "./pages/page-admin-dashboard/_page-admin-dashboard";
const admin_dashboard_page_root = document.querySelector("#react-theme--page-admin-dashboard");
if (admin_dashboard_page_root) {
  ReactDOM.render(<PageAdminDashboard />, admin_dashboard_page_root);
}

// ==============================================

import Single from "./pages/single/single";
const single_root = document.querySelector("#react-theme--single");
if (single_root) {
  const { id } = single_root.dataset;
  ReactDOM.render(<Single { ...{ id } } />, single_root);
}

// ==============================================

import Header from './comps/header/_header';
const header_root = document.querySelector('#react-header');
const { site_urls, rest_urls, active_page, is_logged_in, current_user } = header_root.dataset;

// console.log('src/siteurls: ', json(site_urls), '\nrest_urls: ', json(rest_urls));
console.log('src/[index.js] is_logged_in: ', is_logged_in);
// console.log('src/[index.js] current_user: ', json(current_user));
// console.log('[index.js] current_user (roles): ', json(current_user).roles);
// log(json(current_user), 'green', 'current_user');
// console.log(json(current_user).data);

const current_user_json = json(current_user);
const { data, roles } = current_user_json;

const user = {
  id: data.ID,
  is_logged_in: !!is_logged_in,
  username: data.user_login,
  email: data.user_email,
  display_name: data.display_name,
  admin: roles.includes('administrator'),
};

console.log('src/[index.js], user: ', user);
// console.log('src/[index.js], setting user and nonce into local-storage');

setLS('user', user);

// debugger
// window.base_site_url = site_urls.base;
console.log('PHP: ', PHP);

// console.log('user: ', user);

// ReactDOM.render(<Header site_urls={ json(site_urls) } rest_urls={ json(rest_urls) } active_page={ active_page } />, header_root);
ReactDOM.render(<Header site_urls={ json(site_urls) } rest_urls={ json(rest_urls) } { ...{ active_page, is_logged_in, user }} />, header_root);
// ReactDOM.render(<Header />, header_root);

// ==============================================

import Footer from './comps/footer/_footer';
ReactDOM.render(<Footer />, document.querySelector('#react-footer'));
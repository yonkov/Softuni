This is a custom Single page application blog built with Express.js and the Angular.js framework. 
The app can authenticate users and an admin. 

## Public Part

The public part of the blog is visible without authentication.
Unauthorized users can visit the home page and the about pageand  can read all the articles. However, they need to be registered to post comments. 

## Private Part

Logged-in users can post comments and read all the articles. However, they can create, modify or delete articles.

## Admin Part

There is an admin who can can create, modify or delete all the website's articles. 
The app uses guard resolvers to disallow access to these pages to non-authorized users.

## Project Architecture

The app tries to follow the best folder structure practices as described in this article: 
https://itnext.io/choosing-a-highly-scalable-folder-structure-in-angular-d987de65ec7.

## Forms and Directives
The app uses reactive forms. Front-end form validation is included.

## Lazy Loading
The whole Blog section is lazy-loaded to allow faster initial loading of the app.
Lazy loading is also added for the authentication part.

## Responsive Design
The app uses Bootstrap and is fully responsive.
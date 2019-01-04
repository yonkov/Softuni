$(() => {
    const app = Sammy('#container', function () {
        //Load templates
        this.use('Handlebars', 'hbs')
        this.get('#/home', getHomePage);
        this.get('index.html', getHomePage);

        //Register user
        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;
            let repeatPass = ctx.params.repeatPass;

            //Validate input
            if (!/^[A-Za-z]{3,}$/.test(username)) {
                notify.showError('Invalid credentials. Please retry your request with valid credentials.');
            } else if (!/^[A-Za-z\d]{6,}$/.test(password)) {
                notify.showError('Password should be at least 6 charachters long.');
            } else if (repeatPass !== password) {
                notify.showError('Password should be at least 6 charachters long.');
            } else {
                auth.register(username, password)
                    .then((userData) => {
                        auth.saveSession(userData)
                        notify.showInfo('User registration successful!');
                        ctx.redirect('#/catalog')
                    })
                    .catch(notify.handleError);
            }

        });

        //Log in User

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            if (!username.trim() || !password.trim()) {
                notify.showError('All fields should be non-empty');
            } else {
                auth.login(username, password)
                    .then((userData) => {
                        auth.saveSession(userData)
                        notify.showInfo('Login successful!');
                        ctx.redirect('#/catalog')
                    })
                    .catch(notify.handleError);
            }

        });

        //Log Out user

        this.get('#/logout', (ctx) => {
            auth.logout()
                .then(() => {
                    sessionStorage.clear();
                    ctx.redirect('#/home');
                })

        });

        // Render HomePage
        function getHomePage(ctx) {
            let isLoggedIn = auth.isAuth();

            if (!isLoggedIn) {
                ctx.loadPartials({
                        header: './templates/header.hbs',
                        footer: './templates/footer.hbs',
                    })
                    .then(function () {
                        this.partial('./templates/home.hbs');
                    })
            } else {
                ctx.redirect('#/catalog');
            }
        }

        this.get('#/catalog', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            posts.getAllPosts()
                .then((posts) => {
                    //Add properties to the post object
                    posts.forEach((p, i) => {
                        p.rank = i + 1;
                        p.date = calcTime(p._kmd.ect);
                        p.isAuthor = p._acl.creator === sessionStorage.getItem('userId');
                        
                    }); 

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.posts = posts;

                    ctx.loadPartials({
                        header: './templates/header.hbs',
                        footer: './templates/footer.hbs',
                        navigation: './templates/navigation.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog.hbs');
                    })
                })
                .catch(notify.handleError);
        });
        //Create post
        this.get('#/create/post', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }
            
            ctx.loadPartials({
                header: './templates/header.hbs',
                footer: './templates/footer.hbs',
                navigation: './templates/navigation.hbs',
            })
            .then(function () {
                this.partial('./templates/createPost.hbs');
            })
            

        });

        this.post('#/create/post', (ctx) => {
            let author = sessionStorage.getItem('username');
            let url = ctx.params.url;
            let imageUrl = ctx.params.image;
            let title = ctx.params.title;
            let description = ctx.params.description;
            
            //Validate input
            if (!title.trim()) {
                notify.showError('Title is required');
            }
            else if(!url.trim()){
                notify.showError('Url is required');
            }
            else if(!url.startsWith('http')){
                notify.showError('Url must be a valid link');
            }
            else{
                posts.createPost(author, title, description, url, imageUrl)
                .then(()=> {
                notify.showInfo('Post created!');
                ctx.redirect('#/catalog');
                })
                .catch(notify.handleError);
            }

        });
        //Edit post
        this.get('#/edit/post/:postId', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }
            let postId = ctx.params.postId;
            posts.getPostById(postId)
            .then((post)=> {
                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem('username');
                ctx.post = post;
                
                ctx.loadPartials({
                    header: './templates/header.hbs',
                    footer: './templates/footer.hbs',
                    navigation: './templates/navigation.hbs',
                })
                .then(function () {
                    this.partial('./templates/editPost.hbs');
                })

            })
            
            

        });

        this.post('#/edit/post/', (ctx) => {
            let postId = ctx.params.postId;
            let author = sessionStorage.getItem('username');
            let url = ctx.params.url;
            let imageUrl = ctx.params.image;
            let title = ctx.params.title;
            let description = ctx.params.description;
            
            //Validate input
            if (!title.trim()) {
                notify.showError('Title is required');
            }
            else if(!url.trim()){
                notify.showError('Url is required');
            }
            else if(!url.startsWith('http')){
                notify.showError('Url must be a valid link');
            }
            else{
                posts.editPost(postId, author, title, description, url, imageUrl)
                .then(()=> {
                notify.showInfo('Post edited!');
                ctx.redirect('#/catalog');
                })
                .catch(notify.handleError);
            }

        });

        //Delete post
        this.get('#/delete/post/:postId', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }
            let postId = ctx.params.postId;
            posts.deletePost(postId)
            .then(()=> {
                notify.showInfo('Post deleted');
                ctx.redirect('#/catalog');
            })
            
        });
        
        // My Posts Page
        this.get('#/posts', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            posts.getMyPosts(sessionStorage.getItem('username'))
                .then((posts) => {
                    //Add properties to the post object
                    posts.forEach((p, i) => {
                        p.rank = i + 1;
                        p.date = calcTime(p._kmd.ect);
                        p.isAuthor = p._acl.creator === sessionStorage.getItem('userId');
                        
                    }); 

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.posts = posts;

                    ctx.loadPartials({
                        header: './templates/header.hbs',
                        footer: './templates/footer.hbs',
                        navigation: './templates/navigation.hbs',
                    }).then(function () {
                        this.partial('./templates/myPost.hbs');
                    })
                })
                .catch(notify.handleError);
        });
        
        //Helper function
        function calcTime(dateIsoFormat) {
            let diff = new Date - (new Date(dateIsoFormat));
            diff = Math.floor(diff / 60000);
            if (diff < 1) return 'less than a minute';
            if (diff < 60) return diff + ' minute' + pluralize(diff);
            diff = Math.floor(diff / 60);
            if (diff < 24) return diff + ' hour' + pluralize(diff);
            diff = Math.floor(diff / 24);
            if (diff < 30) return diff + ' day' + pluralize(diff);
            diff = Math.floor(diff / 30);
            if (diff < 12) return diff + ' month' + pluralize(diff);
            diff = Math.floor(diff / 12);
            return diff + ' year' + pluralize(diff);

            function pluralize(value) {
                if (value !== 1) return 's';
                else return '';
            }
        }


    })
    app.run();
});
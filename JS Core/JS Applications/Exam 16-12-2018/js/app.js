$(() => {
    const app = Sammy('#container', function () {
        //Load templates
        this.use('Handlebars', 'hbs')
        this.get('#/home', getHomePage);
        this.get('index.html', getHomePage);

        // Render Homepage
        function getHomePage(ctx) {
            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
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

                ctx.loadPartials({
                        header: './templates/header.hbs',
                        footer: './templates/footer.hbs',
                    })
                    .then(function () {
                        this.partial('./templates/home.hbs');
                    })
            }
        }

        //Register user
        this.get('#/register', (ctx) => {

            ctx.loadPartials({
                    header: './templates/header.hbs',
                    footer: './templates/footer.hbs',
                })
                .then(function () {
                    this.partial('./templates/register.hbs');
                })


        });

        this.post('#/register', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            //Validate input
            if (!/^[A-Za-z\d]{3,}$/.test(username)) {
                notify.showError('Username must be at least 3 symbols');
            } else if (!/^[A-Za-z\d]{6,}$/.test(password)) {
                notify.showError('Password should be at least 6 charachters long.');
            } else {
                auth.register(username, password)
                    .then((userData) => {
                        auth.saveSession(userData)
                        notify.showInfo('User registration successful!');
                        ctx.redirect('#/home')
                    })
                    .catch(notify.handleError);
            }

        });

        //Login User
        this.get('#/login', (ctx) => {

            ctx.loadPartials({
                    header: './templates/header.hbs',
                    footer: './templates/footer.hbs',
                })
                .then(function () {
                    this.partial('./templates/login.hbs');
                })

        });

        this.post('#/login', (ctx) => {
            let username = ctx.params.username;
            let password = ctx.params.password;

            //Validate input
            if (!/^[A-Za-z\d]{3,}$/.test(username)) {
                notify.showError('Username must be at least 3 symbols.');
            } else if (!/^[A-Za-z\d]{6,}$/.test(password)) {
                notify.showError('Password must be at least 6 charachters long.');
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

        //List Al Cats

        this.get('#/catalog', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            pets.getAllpets()
                .then((pets) => {
                    //Add properties to the car object
                    pets.forEach((pet, i) => {
                        pet.isNotAuthor = pet._acl.creator !== sessionStorage.getItem('userId');
                    });

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.pets = pets;

                    ctx.loadPartials({
                        header: './templates/header.hbs',
                        footer: './templates/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/catalog.hbs');
                    })
                })
                .catch(notify.handleError);
        });

        //Filter Categories

        //All

        this.get("#/all", (ctx) => {
            ctx.redirect('#/catalog')

        })

        //Dog
        this.get("#/dogs", (ctx) => {
            pets.getAllpets().then((pets) => {
                let dogs = pets.filter((p) => {
                    if (p["category"] === "Dog") {
                        return p;
                    }
                })
                dogs.forEach((dog) => {
                    dog.isNotAuthor = dog._acl.creator !== sessionStorage.getItem('userId');

                })
                ctx.pets = dogs;
                ctx.username = sessionStorage.getItem("username");
                ctx.isAuth = auth.isAuth();
                ctx.loadPartials({
                    header: "../templates/header.hbs",
                    footer: "../templates/footer.hbs",
                }).then(function () {
                    this.partial("../templates/catalog.hbs")
                })

            })

        })

        // Cat

        this.get("#/cats", (ctx) => {
            pets.getAllpets().then((pets) => {
                let cats = pets.filter((p) => {
                    if (p["category"] === "Cat") {
                        return p;
                    }
                })
                cats.forEach((cat) => {
                    cat.isNotAuthor = cat._acl.creator !== sessionStorage.getItem('userId');
                })
                ctx.pets = cats;
                ctx.username = sessionStorage.getItem("username");
                ctx.isAuth = auth.isAuth();
                ctx.loadPartials({
                    header: "../templates/header.hbs",
                    footer: "../templates/footer.hbs",
                }).then(function () {
                    this.partial("../templates/catalog.hbs")
                })

            })

        })

        //Parrots

        this.get("#/parrots", (ctx) => {
            pets.getAllpets().then((pets) => {
                let parrots = pets.filter((p) => {
                    if (p["category"] === "Parrot") {
                        return p;
                    }
                })
                parrots.forEach((parrot) => {
                    parrot.isNotAuthor = parrot._acl.creator !== sessionStorage.getItem('userId');
                })
                ctx.pets = parrots;
                ctx.username = sessionStorage.getItem("username");
                ctx.isAuth = auth.isAuth();
                ctx.loadPartials({
                    header: "../templates/header.hbs",
                    footer: "../templates/footer.hbs",
                }).then(function () {
                    this.partial("../templates/catalog.hbs")
                })

            })

        })

        //Reptiles

        this.get("#/reptiles", (ctx) => {
            pets.getAllpets().then((pets) => {
                let reptiles = pets.filter((p) => {
                    if (p["category"] === "Reptile") {
                        return p;
                    }
                })
                reptiles.forEach((reptile) => {
                    reptile.isNotAuthor = reptile._acl.creator !== sessionStorage.getItem('userId');
                })
                ctx.pets = reptiles;
                ctx.username = sessionStorage.getItem("username");
                ctx.isAuth = auth.isAuth();
                ctx.loadPartials({
                    header: "../templates/header.hbs",
                    footer: "../templates/footer.hbs",
                }).then(function () {
                    this.partial("../templates/catalog.hbs")
                })

            })

        })


        //Other

        this.get("#/other", (ctx) => {
            pets.getAllpets().then((pets) => {
                let others = pets.filter((p) => {
                    if (p["category"] === "Other") {
                        return p;
                    }
                })
                others.forEach((other) => {
                    other.isNotAuthor = other._acl.creator !== sessionStorage.getItem('userId');
                })
                ctx.pets = others;
                ctx.username = sessionStorage.getItem("username");
                ctx.isAuth = auth.isAuth();
                ctx.loadPartials({
                    header: "../templates/header.hbs",
                    footer: "../templates/footer.hbs",
                }).then(function () {
                    this.partial("../templates/catalog.hbs")
                })

            })

        })

        // Create pet
        this.get('#/create/pet', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            ctx.isAuth = auth.isAuth();
            ctx.username = sessionStorage.getItem('username');
            let isLoggedIn = auth.isAuth();

            ctx.loadPartials({
                    header: './templates/header.hbs',
                    footer: './templates/footer.hbs',
                })
                .then(function () {
                    this.partial('./templates/create.hbs');
                })

        });

        this.post('#/create/pet', (ctx) => {

            let name = ctx.params.name;
            let description = ctx.params.description;
            let imageURL = ctx.params.imageURL;
            let category = ctx.params.category;
            let likes = 0;

            //Validate input
            if (!name.trim()) {
                notify.showError('Title should not be empty!');
            } else if (!description.trim()) {
                notify.showError('Description should not be empty');
            } else {
                pets.createpet(name, description, imageURL, category, likes)
                    .then(() => {
                        notify.showInfo('Pet created!');
                        ctx.redirect('#/catalog');
                    })
                    .catch(notify.handleError);
            }
        });

        this.get('#/my-pets', (ctx) => {
            if (!auth.isAuth()) {
                ctx.redirect('#/home');
                return;
            }

            pets.getMypets(sessionStorage.getItem('userId'))
                .then((pets) => {
                    pets.forEach((p, i) => {
                        p.isAuthor = p._acl.creator === sessionStorage.getItem('userId');
                        
                    }); 

                    ctx.isAuth = auth.isAuth();
                    ctx.username = sessionStorage.getItem('username');
                    ctx.pets = pets;

                    ctx.loadPartials({
                        header: './templates/header.hbs',
                        footer: './templates/footer.hbs',
                    }).then(function () {
                        this.partial('./templates/my-pets.hbs');
                    })
                })
                .catch(notify.handleError);
        });

        this.get("#/details/:petId",(ctx)=>{
            let petId = ctx.params.petId;

            pets.getpetById(petId).then((pet)=>{
               
                ctx.pet = pet;
                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem("username");

                ctx.loadPartials({
                    header:"../templates/header.hbs",
                    footer: "../templates/footer.hbs"
                }).then(function(){
                    this.partial("../templates/petDetails.hbs")
                })
            })
        })

        this.get("#/edit/:petId",(ctx)=>{
            let petId = ctx.params.petId;
            pets.getpetById(petId).then((pet)=>{
                ctx.pet = pet;
                ctx.isAuth = auth.isAuth();
                ctx.username = sessionStorage.getItem("username");

                ctx.loadPartials({
                    header:"../templates/header.hbs",
                    footer: "../templates/footer.hbs"
                }).then(function(){
                    this.partial("../templates/edit.hbs")
                })
            })
        })


        this.post("#/edit/:petId",(ctx)=>{
            let petId = ctx.params.petId;
            pets.getpetById(petId).then((pet)=>{
                let name = pet["name"];
                let description = ctx.params.description;
                let imageURL = pet["imageURL"];
                let category = pet["category"];
                let likes = pet["likes"];
                let petId = ctx.params.petId;

                pets.editpet(petId,name, description,imageURL,category,likes).then(()=>{
                    ctx.redirect("#/catalog");
                    notify.showInfo("Updated successfully!");
                }).catch(notify.handleError)
            }).catch(notify.handleError)

        })

        //Delete pet
        this.get("#/delete/:petId",(ctx)=>{
            let petId = ctx.params.petId;
            pets.deletepet(petId).then(()=>{
                notify.showInfo("Pet removed successfully!");
                ctx.redirect("#/catalog")
            }).catch(notify.handleError);
        })


        this.get("#/pet/:petId",(ctx)=>{
            let petId = ctx.params.petId;
            $(this).on( 'click', getAllLikes);
            
        })

        this.post("#/pet/:petId",getAllLikes(ctx))

        
        function getAllLikes(ctx){
            let petId = ctx.params.petId;
            pets.getpetById(petId).then((pet)=>{

                let likes = pet["likes"]+ 1;

                pets.addpet(likes).then(()=>{
                    ctx.redirect("#/catalog");
                    notify.showInfo("Updated successfully!");
                }).catch(notify.handleError)
            }).catch(notify.handleError)

        }




    });
    app.run();
});
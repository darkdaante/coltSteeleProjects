#YelpCamp Initial

* Add Landing Page
* Add Campground Page that Lists all Campground 

Each CampGround has:
* Name
* Image



#Layout and Basic Styling
* Create our header and footer partials
* Add in Bootstrap



#Creating New Campgrounds
* Setup new campground POST route
* Add in body-parser
* Setup route to show form
* Add basic unstyled form



#Style the Campgrounds page
* Add a better header/title
* Make Campgrounds display in a grid



#Style the Navbar and Form
* Add a navbar to all templates
* Style the new Campground Form



#Adding Mongoose
* Install and configure mongoose
* Setup campground model
* Use Campground model inside of our routes!



#Show Page
* Review the RESTful routes we've seen so far
* Add description to our campground model
* Show db.collection.drop()
* Add a show route/template



#Refactor Mongoose Code
* Create a models directory
* Use module.exports
* Require everything correctly



#Add Seeds File
* Add a seeds.js file
* Run the seeds file every time the server starts



#Add the Comment model!
* Make our errors go away!
* Display comments on campground show page



#Comment New/Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new Comment form



#Style Show Page
* Add sidebar to show page
* Display Comments nicely



#Finish Styling Show Page
* Add Public directory
* Add Custom Stylesheet



#Auth P1 - Add User Model
* Install All packages needed for auth
* Define User Model

#Auth P2 - Register
* Configure Passport
* Add register routes
* Add register template



#Auth P3 - Login
* Add login routes
* Add login template



#Auth P4 - Logout/NavBar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar



#Auth P5 - Show/Hide Links
* Show/hide auth links in navbar correctly



#Refactor The Routes
* Use Express router to recognize all routes



#Users + Comments
* Associate users and comments
* Save author's name to a comment automatically



#Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground



#Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Update Route



#Deleting Campgrounds
* Add Destroy Route
* Add Delete button



#Authorization
* User can only edit his/her campgrounds 
* User can only delete his/her campgrounds
* Hide/show edit and delete buttons



#Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route



#Deleting Comments
* Add Destroy route
* Add Delete Button



#Authorization P2 : Comments
#User can edit his/her comments
* User can only dlete his/her comments
* Hide/show edit and delete buttons
* Refactor Middleware



#Adding in Flash!
* Demo working version
* Install and configure connect-flash
* Add bootstrap alerts to header
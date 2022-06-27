# social-network-api

# Decription
A simple yet functional template for a MongoDB based social network/blog API. This API has been intentionally kept "broad stroke" in its construction to serve more as an example of how this type of database works in an MVC format.

# Installation
This particular API will require the installation of MongoDB, community edition was used for development, or it can alternatively be connected to MongoDB's Atlas service, and NodeJS.
* MongoDB
* NodeJS

Once Mongo is up and running open the root folder of the local instance and run npm i to install the relevant dependencies, Nodemon is recommended but definitely not required.
Once everything is done installing run node server or nodemon server depending on wether or not you installed nodemon.

From here the server should be up and running, however keep in mind that in order for the database to generate you must use a POST route before any other operations will work. The best place to start is with creating a new user.

# How To Use
There is a full route map in the docs folder inside of this repository however, below is an example of how to create your first user, which will be needed before any of the other CRUD operations will work.

In the event that you are using Insomnia for testing your routes there is JSON file in the docs folder that has a pre-configured work environment with test routes and sample data already set up to help get you started.

* Insomnia Download

* Insomnia Setup File

* Demo Video

Full route documentation can be found here: 
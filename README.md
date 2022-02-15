# Meadowlark Tutorial Project
## Tutorial Source
This work is based on the book Web Development with Node & Express by Ethan Brown (2020).
## Key Technologies
The project uses Node, Express, Handlebars, and Bootstrap.
## Important Deviations
Mostly I've got along with the tutorial, but I diverged from the main-line in a few places.  The tutorial calls for a custom implementation of configurations and flash messages.  For these features I went with config and connect-flash intstead.
```
npm install config
npm install connect-flash
```

For a database the Ethan Brown's book recommends MongoDB accessed via an abstraction layer wrapped around Mongoose.  Further he suggests going with http://mlab.com — a cloud hosted database option.  Here I went with a self hosted option running locally in Docker `docker pull mongo`.  I also left out the data abstraction later and simply used Mongoose directly.


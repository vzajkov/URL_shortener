# README

This is the link shortener.

The project uses a PostgreSQL database to store the
payload and the shortened link. The project uses a
Ruby on Rails JSON API with React (no Redux) in the front end.

Users can submit a long URL (I used common websites like
  Facebook and Yelp on http://longurlmaker.com/). I used a hash method to take the url and shorten it to be unique in the model (app/models/link.rb). Users may also edit and delete the URLs they shortened.

Please run 'rails server' after navigating to the project directory. The server should be listening to http://localhost:3000/.

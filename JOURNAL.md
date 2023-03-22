# Tuber Trader
## An adventure into the depths of web dev and wishful thinking

### The begining...
Building out the database tables felt pretty straightforward. No real trouble here.
I started by building the tables for a site User (imagining each user might have a registered account)
and for island profiles (each user could maintain multiple profiles).
To make sure I understood how to build a many-to-many rel table, I set up the
Transactions model as practice. I may not have time to implement the frontend
stuff to make use of this table, but I will come back to it as I continue to develop the site.
Left to do: set up the table to track sales prices for the week. I have to decide if I want it to track 
for only a single weeks worth of data, or if it should keep a history for an entire year.

Next up was to build out the basic routes for the tables. This took some time,
but went pretty smoothly. I spent a lot of time setting types for the routes. This might
not always be possible, but I will try to keep it up. All routes are tested and functional in postman.

Time to switch to developing the frontend. I followed along with dogger to get the
initial frontend files going, and started building out components. I know my homepage should
display a login link, the top profiles with the highest selling prices (this will need my
implementation of the table first), and a search bar, at minimum. Since I still have work
to do on the backend as far as the model for the selling price history, I dummied out the
homepage to display just a single profile for now, and will update this to
show the top profiles later. I found tracing back and forth through the files to
be difficult, or at least, it took me much longer than I expected to feel confident that I had
all the pieces where they should be. But the front end is at least running and 
displaying the super basic homepage. I haven't even touched the CSS yet. That's honestly
my last priority at this point, in part because I don't really like CSS and also
because I care most about making sure I learn the functionality we are going
over in class. But I hope to still get to it before the deadline. :)

### 3/10/23 - Still fresh, still hopeful
After our class on authorization, I spent some time updating my frontend to 
have all the Auth pieces in place. I still haven't added Auth to the backend, so the login
functionality doesn't actually DO anything from the front end as of now. I am definitely
encountering some sticky points researching to figure out how to use Oauth as my
3rd party backend authentication. I think I will put that off for a bit, and get some work done
on that sale tracking table. 

Weird, I don't know why I went snake_case on my seeder file names....
Oh crap, I'm mixing style everywhere here....yuk. I'll go back and refactor once I get things working.

Working on the route to post a new selling price. Need an enum to control for the user
telling us if they want to enter am or pm price. My first thought was, we might as well do the
date matching for the user (by getting the current date and using it to reference the table).
But I failed monumentally to be able to run the correct query on the updated_at column. The
issue is that the date format in updated_at includes a time stamp, and the Date() built in in
typescript is in a different format. I extracted just the yyyy-dd-mm piece, and tried to 
use a Like% clause in the where of my FindOneOrFail....but it didn't work. So I'm shelving that for
now and rethinking this: I'll just have my user give me the date that they are entering the price 
for. This also allows them to retroactively enter data, which might be useful anyways.

Been working on the GET route to pull the top ten profiles out of the DB (the ones with the highest selling prices).
It's been a journey through typeorm. I really wish I had invested the time in querybuilder up front.
I know what the SQL query needs to look like, but translating it to the typeorm find() method is
proving to be way harder than I expected. I finally figured out how to pull the top 10 records with the 
highest selling prices out of the sellingPriceHistory table, but hit a snag where if I tried to include a
relation to Profile, i'd get this super fun error: ERROR: column distinctAlias.SellingPriceHistory_id does not exist
. I tried tracking it down on github issues, stackoverflow...all to no avail. So I turned to trying
to decipher the actual message itself. It seemed like something was preventing the query to do with some
violation in a distinct requirement for one of the columns. I had a hunch that since there could be multiple 
repeat profile ID's in the priceHistory table, maybe this was messing with typeorm as it constructed the
results. Like perhaps it was trying to use the PROFILE's id as the distinct ID for the results. Fearing yet another
rejection, I tried for a wildcard: throw the sellingPriceHistory record id in the select clause, since it was guaranteed to
be unique for each record. Bingo. It worked. I still don't fully know why.

Side note: man if I wasn't up against the deadline, my code could be abstracted out soooo much nicer. I think
that will be the very first thing I do once I have all functionality up and running. Just get in there and start 
writing helper functions and cleaning this bad boy up

### Sometime later, as time began to slip into the land of bugs

Ok i have the route working to pull the top 10 islands with the highest current selling prices. Still to do will be the
route that can pull just the current weeks history for a specific island. To do this I need to figure out how to 
compare dates correctly. Tricky stuff, dates.

For now I want to see if I can get the frontend updated to actually show the top 10 islands I now have a route for. So 
far so good! I can get the top profiles fetched from the background, displayed as a hideous bullet list. But that
will do for now. At least I know I am understanding how to connect front end to backend at this point. What still needs
to be logic'd out is: how often do I want the homepage to update this list of top islands?

Talked to Casey on discord, and decided on using setTimeout. I had some trouble putting the settimeout in the right place.
My initial suspicions that it would need to alter some state that would be included in my axios useEffect dependency
list, was correct. However I kept thinking it was wrong because no islands were showing on the page. And guess what,
it was a total oversight. My fetch is all based on dates: I query to pull the top ten island selling prices for TODAY's
date...and we crossed over midnight an hour ago. And I hadn't seeded or posted any records to my table, with todays
date. And  sohere we are. I added some new records with todays date, and voila, the site is working!

### Unknown date (is anyone actaully keeping track of time anymore?): where I am still clinging to the belief that the elusive "later" will turn up so I can implement all that extra stuff...
Back at it now. I decided to swap my original microservice idea and build a microservice that simply handles the routes
needed for searching the site for islands based on parameters. I'll start with just a route to search an
island by name, and if I have time will add more to support extra specifications (name and turnips held for example).
Most important: make sure I can execute the microservice.

Decided to work with python's django server. Setup took WAY longer than I expected. I documented the
journey in the readme for the new python microservice project called "searchService".
The naming convention for my microservices files isn't the best, as I was learning as I
built. I will go back and refactor that later to clean it up. Some issues I ran into:
setting up the virtual environment correctly, getting django's dependecies established, and connecting
to our tuber DB (getting django off of SQLite and onto postgres). I still don't think I'm 
handling dependencies for docker correctly yet, but I will get to that part eventually.

### ...and discovering the joys of Django
Alright Django maybe wasn't the best choice, as it seems to be better suited for from-scratch
projects. I figured out how to change settings.py to link to my existing postgres DB tuber. 
And got the django server up and running, listening for HTTP Requests. The big hangup: it looks like
I still need Models to exist for the tuber DB, in my Django project, to be able to run the queries. 
I'll be using Djangos inspect-db next to see if I can generate the python code for the models,
then access data via those models. This should generate models that are NOT managed by Django
so I can continue to control the DB and its schema and migrations from the Fastify server. 

Working on making the call to my microservice search view from our React front end search bar.
Ran into some trouble with updating state for the search bar, and passing props to
the search results component once the bar did it's thing. Sorted that out, and now discovering that
my Django development server isn't accepting requests from outside domains.
So looks like I need to configure Django's dev server to include the Access-Control-Allow-Origin header in it's
response. Working on that now.

Ok getting somewhere. One issue is needing to only show the Search Results if someone searches,
need to update the initial state somehow, or adjust how the components are viewed. Also been working on
updating the search Results to show "sorry not found" to the page if the user chooses an
island that doesn't exist in our DB. Issue now is the page only rerenders on the second click
of the submit button. Also we don't want the user to see the search results until they 
click "search" button for the first time. Done, pretty easy fix.

### 3/19/23 Docker containers are born and swiftly show their demons, plus some auth0 troubles

Got frontend, backend, db, and microservice docker container to run, and the site runs! Things that did NOt work:
adding the auth0 Login button to the React frontend. It not only causes docker to fail but a lot of stuff breaks.
So auth is just a mess right now. I haven't even gotten to troubleshoot verifying the token, I'm just
trying to get the page to reroute to auth0's universal login site. Protected route, initial state, a bunch of
our doggr based features in login, and all related login stuff in navMain are commented out right now.
I will be taking it step by step to try and get them back to a state where docker likes it and auth works.

Finally got the frontend piece of the login done using Auth0's routing to a universal login without breaking the site.
Test via: kirak@pdx.edu, password: banana!82
BUT I can't get the browser to navigate to the site when everything is running from docker: only when I manually boot
up each section from the terminal (postgres running on docker, frontend via pnpm run dev, backend via pnpm dev,
and microservice from python3 manage.py runserver). But if I run postgres, backend, and service from docker, and 
manually boot up the frontend....it works. So something is wrong with my frontend container, I just don't know what. I 
also played around with writing the functionaity to be able to accept info from the homepage and update the
selling prices table with said info. But the axios request is failing, so I will have to debug that later.

### 3/20/23 Where the hope that time will be spent on anything outside of Docker finally settles behind the horizon
Not a lot of time today as I need to study for a final that's tomorrow morning. I tried exposing port 88, but docker
didn't allow it. So I'm still stuck in manual frontend land. May not even get to the minio piece before the deadline.
I need to get that JWT token stuff from Auth0 so I can reinstate the protected routes....

### Here lies the lost times. A spiral into the google hole. Hours staring into the glow of the monitor, keyboard shortcuts to toggle between shameful amounts of tabs worn thin.   A glimmer of success with Authorization, then plunged back into the recesses of Docker log errors. 
### 3/22/23 The end

Well, the last 48 hours have been an all out attempt to figure out why I cannot docker-compose build --no-cache
without failing on the PNPM install phase. I've combed through the backend files, compared them against Doggrs, discussed
my Djando microservice filestructure with another student that also wrote a Django service and checked for incongruencies
in setup (there were not except I had an extra env, which I deleted). I messed around with ports, tried clearing docker
with docker compose down and docker system prune --volumes before each new attempt to build. I tried different DB
states: migrated, not migrated, seeded, not seeded, total typOrm drop, and no differences to the issue. The only lead
that was promising is that my pnpm version is locally 7.25.0 and dockers is 7.30.0, so I ran a pnpm update, but locally
the version remained at 7.25.0. At least I haven't made any big changes to the backend, so the site is still running 
so I can demo it in the video locally with the backend running from docker still. 

So here is my workflow for at least getting everything up and running locally: because my docker build is stuck, I'm
still running off an old working version of docker. So for the presentation video here is how I will run things:

- from the terminal, navigate to: ~/workspace/FSProject/tuberTrader/backend and run: pnpm migrate:run and pnpm seed (I can't even reach these commands in the Dockerfile as they are after pnpm install)
- from the tuberTrader root directory: docker-compose up
- Shut down the frontend docker container (still not working as I haven't been able to build and troubleshoot)
- from a terminal navigate to: :~/workspace/FSProject/tuberTrader/frontend and run pnpm run dev to boot up front end
- Wait for 30 seconds (due to the timer hacky solution Casey has me add to try to quiet the backend errors)
- the site should be running, with successful features: 
  - top Turnip display
  - search bar
  - login capability (use user: kirak@pdd.edu pass: banana!82 to test auth0 login)
  - Login protected route to enter a new price (not fully functional yet, stil debugging the post failing)
  - Logged in viewable only: logout button, and token button (tests retrieval of Auth0 token, as it's not needed in the site now, but it will print to console if button is clicked)

I just updated the readme for the project to have instructions on how to clone and run the project locally, outside of docker. I am going to push to master and submit what I have
for now, just in case. And then I'll keep plugging away at the docker issues tonight. If I can get any new successes, I will update
the repo, record a new video, and resubmit everything to canvas.  I guess it's time to throw in the towel for now. It's been a good ride and I've learned a lot. May the turnips grow, and the bells rain.
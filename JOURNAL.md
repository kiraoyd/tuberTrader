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

3/10/23
After our class on authorization, I spent some time updating my frontend to 
have all the Auth pieces in place. I still haven't added Auth to the backend, so the login
functionality doesn't actually DO anything from the front end as of now. I am definitely
encountering some sticky point researching to figure out how to use Oauth as my
3rd party backend authentication. I think I will put that off for a bit, and get some work done
on that sale tracking table. 

Weird, I don't know why I went snake_case on my seeder file names....
Oh crap, I'm mixing style everywhere here....yuk. I'll go back and refactor once I get thing working.

Working on the route to post a new selling price. Need an enum to control for the user
telling us if they want to enter am or pm price. My first thought was, we might as well do the
date matching for the user (by getting the current date and using it to reference the table).
But I failed monumentally to be able to run the correct query on the updated_at column. The
issue is that the date format in updated_at includes a time stamp, and the Date() built in in
typescript is in a different format. I extracted just the yyyy-dd-mm piece, and tried to 
use a Lik% clause in the where of my FindOneOrFail....but it didn't work. So I'm shelving that for
now and rethinking this: I'll just have my user give me the date that they are entering the price 
for. This also allows them to retroactively enter data, which might be useful anyways.

Been working on the GET route to pull the top ten profiles out of the DB (the ones with the highest selling prices).
It's been a journey through typeorm. I really wish I had invested the time in querybuilder up front.
I know what the SQL query needs to look like, but translating it to the typeorm find() method is
proving to be way harder than I expected. I finally figured out how to pull the top 10 records with the 
highest selling prices out of the sellingPriceHistory table, but hit a snag where if I tried to include a
relation to Profile, i'd get an error: ERROR: column distinctAlias.SellingPriceHistory_id does not exist
. I tried tracking it down on github issues, stackoverflow...all to no avail. So I turned to trying
to decipher the actual message itself. It seemed like something was preventing the query to do with some
violation in a distinct requirement for one of the columns. I had a hunch that since there could be multiple 
repeat profile ID's in the priceHistory table, maybe this was messing with typeorm asit constructed the
results. Like perhaps it was trying to use the PROFILE's id as the distinct ID for the results. Fearing yet another
rejection, I tried for a wildcard: throw the sellingPriceHistory record id in the select clause, since it was guaranteed to
be unique for each record. Bingo. It worked. I still don't fully know why.

Side note: man if I wasn't up against the deadline, my code could be abstracted out soooo much nicer. I think
that will be the very first thing I do once I have all functionality up and running. Just get in there and start 
writing helper functions and cleaning this bad boy up

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

Back at it now. I decided to swap my microservice idea and build a microservice that simply handles the routes
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


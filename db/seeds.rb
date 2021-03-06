# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

@next_timestamp = Time.now

def create model, attrs={}
  model.create! attrs.merge(published_at: @next_timestamp)
  @next_timestamp -= rand * 24.hours
end

create ImgurImage, url: "http://i.imgur.com/nvnXc.png", imgur_hash: '1'
create GmailMessage, from: "Michael Jordan", subject: "Hey Dude", text: "<p>You are an even better player of basketball than me.</p><p>We ought to play sometime.</p><p>Here, just call me next time you're at the space station. 999-DUDE</p><p>-The Jord</p>", google_id: '1'
create Tweet, tweeter: "", tweeter_screen_name: "alltom", text: "I wish I a Google+ account!", twitter_id: '1'
create FacebookPost, actor: "Ben Bitdiddle", text: "I now have exactly 3333 friends!", facebook_id: '1'
create ImgurImage, url: "http://theawesomer.com/photos/2011/04/041911_nyan_pop_tart_cat_t.jpg", imgur_hash: '2'
create Tweet, tweeter: "", tweeter_screen_name: "leibatt", text: "zomg is this thing on?", twitter_id: '2'
create GmailMessage, from: "Bill Gates", subject: "Hello", text: "<p>I see you're follwing me on twitter. I'm honored!</p><p>Look me up if you're ever in Bellevue. We'll hang out at my pad. It's pretty sweet.</p><p>-Bill.com</p>", google_id: '2'
create ImgurImage, url: "http://icanhascheezburger.files.wordpress.com/2008/01/funny-pictures-lolspeak-jaws-shark.jpg", imgur_hash: '3'
create FacebookPost, actor: "Mark Zuckerberg", text: "The venture Rahul proposed is great! We will be implementing it shortly!", facebook_id: '2'
create GmailMessage, from: "Your Mom", subject: "Your Mom", text: "<p>I heard she is so fat...</p><p>Her joke can't fit in the preview.</p><p>www.yomamma.com</p><p>-Anonymous</p>", google_id: '3'
create Tweet, tweeter: "", tweeter_screen_name: "NYTimesVisual", text: "Minorca Revealed http://nyti.ms/IocqqU", twitter_id: '4'
create ImgurImage, url: "http://i.imgur.com/hWZCz.jpg", imgur_hash: '4'
create Tweet, tweeter: "", tweeter_screen_name: "NYTimesVisual", text: "In Nigeria, a Preview of an Overcrowded Planet http://nyti.ms/HHfuSU", twitter_id: '5'
create GmailMessage, from: "Katrina Panovich", subject: "RE: GR4 Extensions for Everyone!", text: "<p>:O</p><p>On Sun, Apr 15, 2012 at 11:58 PM, Rob Miller &lt;rcm@mit.edu&gt; wrote:<br />&gt;All you have to do is ask Katrina. No gotchas, except that all team members have to email Katrina separately.<br />&gt; <br />&gt;-Rob</p>", google_id: '4'
create ImgurImage, url: "http://i.imgur.com/KFxnf.jpg", imgur_hash: '5'
create Tweet, tweeter: "", tweeter_screen_name: "NYTimesVisual", text: "FASHION: Bill Cunningham | All the Frills http://nyti.ms/HHfuT0", twitter_id: '6'
create Tweet, tweeter: "", tweeter_screen_name: "NYTimesVisual", text: "Study Abroad, Mormon Style http://nyti.ms/HxUlGY", twitter_id: '7'
create GmailMessage, from: "Rob Miller", subject: "GR4 Extensions for Everyone!", text: "<p>All you have to do is ask Katrina. No gotchas, except that all team members have to email Katrina separately.</p><p>-Rob</p>", google_id: '5'
create Tweet, tweeter: "", tweeter_screen_name: "BillGates", text: "How do #naturalgas prices affect energy innovation? Part 1 of my chat w Daniel Yergin. Video: http://b-gat.es/IM5wj5", twitter_id: '8'
create Tweet, tweeter: "", tweeter_screen_name: "BillGates", text: "Great interest in my recent trip to Africa. We learned a lot, came back energized. Gallery from the trip: http://b-gat.es/IvdwDz", twitter_id: '9'
create GmailMessage, from: "Rahul Rajagopalan", subject: "RE: GR4", text: "<p>I heard that too.</p><p>-Rahul</p><p>On Sun, April 15, 2012 at 10:13pm, Leilani Battle &lt;leibatt@mit.edu&gt; wrote:<br />&gt;Hey,<br />&gt;Heard through the grape vine that we can get extensions if we email Katrina! XD<br />&gt;<br />&gt;--Leilani</p>", google_id: '6'
create GmailMessage, from: "Leilani Battle", subject: "GR4", text: "<p>Hey,<br />Heard through the grape vine that we can get extensions if we email Katrina! XD</p><p>--Leilani</p>", google_id: '7'
create ImgurImage, url: "http://i.imgur.com/cCb6y.jpg", imgur_hash: '6'

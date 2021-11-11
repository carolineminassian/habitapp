# habitapp
Self-improvement via new habits with tags (health, fitness, etc.) that will categorize / group the habits and will help provide recommendations for new habits based on these tags (can have multiple tags to single habit)



Client Side 
3.1. Components
Home view - links to sign up/sign in | everyone
Sign up | everyone
Sign In | authenticated user
Dashboard view | authenticated user


Server Side
4.1. REST API Endpoints
GET | listAllHabits(category) | takes ‘habit category’ as an argument and lists all habits of that category

GET | listMyHabits() | lists all habits of registered user

POST | addHabit(user._id, {habit._id, settings}) | takes habit ID as an argument and adds this habit to own calendar so that it can be tracked (maybe adds it to a personal data base where properties of habit can be changed?)

POST/DELETE | removeHabit(habit._id) | takes habit ID as an argument and removes this habit from own calendar so that it is no longer tracked

POST? | sendReminder(habit._id) | takes habit ID as an argument and sends reminder about this habit to user (at pre-defined time and frequency)

POST | updateHabit(habit._id, {settings}) | takes habit ID and data object (with data that should be changed) as an arguments and updates this habit in personal data base (user can adapt properties of habit to personal needs)

POST | habitCompletion(habit._id) | takes habit ID and data object (with timestamp) as arguments, looks for userId in habit.user.userID and adds data to habit.user.data

POST | checkStreak(habit._id) |  takes habit ID as argument, looks for userId in habit.user.userID, checks last streak in the data log habit.user.data and updates habit.user.streak accordingly



Wishlist:
POST | addChallenge(challenge._id) | takes challenge ID as an argument and adds this challenge to personal calendar so that it can be tracked (maybe populate the corresponding habit(s) here for adding them to the calendar)

POST | removeChallenge(challenge._id) | takes challenge ID as an argument and removes this challenge from personal calendar so that it is no longer tracked 

POST | checkCompletion


4.2. Models
4.2.1. Habit

Name:
type: string
required: true
unique: true
trim: true
toLowerCase: true
id:
type: ObjectId
category: 
type: string
required: true
enum: [‘fitness’, ‘languages’, ‘health’, ‘well-being’, ‘mental health’, ‘organization’, ‘...’, ‘other’]
challenges: (references challenges where this habit is included)
type: [ObjectId] 
ref: Challenges
default: []
tags: (each habit has pre-defined tags, user can add additional tags for themselves which would be saved under habit.user.additionalTags)
type: [string] 
default: []
enum: [WE NEED TO ADD SOME PRESELECTED TAGS HERE]
interval (number of ms):
type: number
required: true
user: 
[{
userID:
required: true
type: ObjectId
ref: User
settings:
	{
	quantity: 
type: number
min: 0
	unit:
type: string
enum: [..., …, …, other] (when user selects ‘other’ an input field pops up where user can input customized unit)
}
data: 
type: ObjectId
ref: Data
required: true
streak: (number of successful completions in a row. streak starts at starting date and increments upon successful habit completion. When habit is not completed, streak resets to 0)
type: number
default: 0
required: true
startingDate: (user is able to change starting point)
type: date
required
	additionalTags: 
type: [string]
}]
4.2.2. Data
→ log habit activity of user

timestamps: 
type: [number]
default: []
required: true

4.2.3. User
Name: 
type: string
required: true
id: 
type: ObjectId
points:
type: number
default: 0
required: true
Email: 
type: string
required: true
unique: true
image: 
type: string
default: [ADD IMAGE PATH HERE]
passwordhashandsalt: 
type: string
required: true
habits: 
type: [ObjectId]
default: []
challenges: 
type: [ObjectId]
default: []

4.2.4. Challenge (wishlist)
Name:
type: string
required: true
unique: true
trim: true
toLowerCase: true
id:
type: ObjectId
description:
type: string
image: 
type: string
default: [ADD IMAGE PATH HERE]
points:
type: number
required: true
min: 0
category: 
type: string
required: true
enum: [‘fitness’, ‘languages’, ‘health’, ‘well-being’, ‘mental health’, ‘organization’, ‘...’, ‘other’]
habits: (references habit(s) that is/are included)
type: [ObjectId] 
default: []
required: true
participants: (references users that are included) → personal challenge: only 1 ID, public challenge: array of IDs
type: [ObjectId] 
default: []
winners: (references winners that successfully completed the challenge) → personal challenge: only 1 ID, public challenge: array of IDs
type: [ObjectId] 
default: []


4.2.5. Subscription (wishlist)


4.3. Middleware


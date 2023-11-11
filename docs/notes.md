# Notes

*As I have ideas or notice issues I'll table them here for later consideration!*

- I noticed the target placement problem with my wide angle camera! Possible solution;
  - Have a subtle calibration where the avatar instructs the user to enter a 'T' or 'X' pose
    - Instructed to reach as wide as possible onscreen, subtly forcing the Player to get in the image plane of the camera.
  - measure on-screen limb length and scale all subsequent target poses accordingly.
  - should work as long as user doesn't move closer/further from screen;
    - Oh, you could also actively scale targets periodically updating limb-lengths for any poses perpendicular to the camera direction.

- Limb position has jitter which gives a tense feeling!
  - we might want to use some smoothing (time average or alpha-beta)

- Limb occlusion makes limb position jump!
  - discard position outliers?
  - identify sideways bodies when torso width is thin?

- the manager base class supplies the singleton objects P5 and Session. Rather than getting these through the class hierarchy, we could just import them as needed in concrete implementations. Could reduce code complexity and make testing easier. Disregard this if managers will supply additional abstract behavior.

- testing game objects currently requires spinning up the whole environment; we might benefit from a lighter testing harness for some components; for example testing a single game object, or animating a demo skeleton that doesn't use media pipe.

- Collision BB is assumed at root game object. Rotation and scale assumed at base game object; However exceptions exist. consider particles which have no dimensions. Should we add more game object types to avoid shoehorning? Or is this preoptimization?

- Usually root classes are implemented so individual systems(physics, particles, etc) can treat a collection of game objects uniformly. However the current game loop explicitly invokes these methods. Meaning we have an interface but nothing is treated generically. is it just for conceptual purposes?

- UI is homebrew; Is there a reason we are rending UI in the game canvas? Is this a conscious effort to get people familiar with UI from scratch or be a solely P5 project? If there isn't an explicit goal we might consider just moving it all to normal HTML5 elements and have the game loop respond to plain old DOM events. easier to style and maintain. Can even use your favorite css framework. The experience will probably be more transferrable for students interested in web design too.
  - I can see this needing SPA-like functionality for the UI overlays which would then need to be synced with the game state which is presumably what we were trying to avoid!
  - HTML5 Canvas actually allows you to add DOM elements 'inside' the canvas, and P5 does expose this functionality. So we may be able to still use HTML components directly in the context of your game states.
  - Also you brought up the issue of P5 being a game loop, and normal HTML being event-driven. I wonder if the P5 DOM API provides a way to deal with this
  - I need to think about this more...

- setup and cleanup calls often appear extraneous.

- flash of unstyled text; we could block until we load font...

- do we need a layer manager?

- index creates and add all fields to gamesession? Why not create them in game session?

- mouse handler stubs in the declaration of the P5 instance in index.js- are they vestigial?

- how do resize events propagate? Oh! the P5 instance calls State.resize() on the current state.
  - does it need to be propagated to the other States on the stack?

- awkward to iterate through bones and joints, can we improve this or should I just build rendering into the skeleton...

- two copies of P5? One in "./public/scripts/libs/p5/p5.js" an also "./public/scripts/p5/p5.js".

- just pause the game if you can't see the whole torso

- I think I'm doing the motion blur wrong; I should just make the skelton look like the silhouette and have in render into that cumulative image buffer...

- GameSessions fields are populated by index.js?

- How does GameSession.PoseLandmarks get updated by MediaPipe?

# Heartbeat Solutions;

- Heartbeat is another bio-rhythm which we might try to embody on the screen 
  - intermittent double pulse
  - rate is not voluntary
  - more likely for user to perceive it while holding breath...

On the downside we can't synchronize these with the player's actual rhythms.
This is less an issue with breathing, as the player is using it as a target.
But the heart rate is not voluntary!

We should just shelve it for now... But if we do go after it;

- Heartrate calibration
  - After exertion, Enter mini-game state where raising arms controls game heart-rate. User has to synchronize pulses while listening to their body.
  - Downside is if exertion level changes the heart-rate will be off, leading to the same disembodiment.
  - We could make heart rate a very slight game effect, but ramp it up during these stages?
  - It would provide good data points over time of heart-rate variability; an important health metric.

- Bio-Sensor
  - Most accurate, but adds hardware needs- defeating one of the main objectives of the project!
  - but really cool; imagine background trees cycling through the seasons with the cycles of your breath.
  - a heart monitor could give awesome feedback for exertion targets;
    - if the rate gets too high or low, switch game modes to higher/lower exertion modes
    - This way you can keep the player in specific cardio zones
      - Very good for player's physical health as well!
  - WebSerial could be an avenue on chromium? 
  - Watch/fitness band apps? These things are getting more common...
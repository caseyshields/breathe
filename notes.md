# Breathing in Game

Putting bio-rythyms on the screen could really help the feeling of embodiment.
As you suggested before a hud meter seems inappropriate.
Instead some game session object which all game objects can refer to when cycling through visual effects seems more apt.
This way the user can intuit the rythym without breaking attention from the avatar.

## Breathing

  - sinusoidal inhale/exhale, static pauses in-between
  - rate is voluntary so avatar can lead player

## Heartbeat

  - intermittent double pulse
  - rate is not voluntary
  - more likely to percieve during breath holds...

On the downside we can't synchronize it with the player's actual rythms.
This is less an issue with breathing, as the player is using it as a target.
But the heart rate is not voluntary! 

# Heartbeat Solutions;

We should just shelve it for now... But if we do go after it;

## Heartrate calibration

  - After exertion, Enter mini-game state where raising arms controls game heartrate. User has to synchronize pulses while listening to their body.
  - Downside is if exertion level changes the heartrate will be off, leading to the same disembodiment.
  - We could make heart rate a very slight game effect, but ramp it up during these stages?
  - It would provide good data points over time of heartrate variability; an important health metric.

## Bio-Sensor

  - Most accurate, but adds hardware needs- defeating one of the main objectives of the project!
  - but really cool; imagine background trees cycling through the seasons with the cycles of your breath.
  - a heart monitor could give awesome feedback for exertion targets;
    - if the rate gets too high or low, switch game modes to higher/lower exertion modes
    - This way you can keep the player in specific cardio zones
      - Very good for player's physical health as well!
  - WebSerial could be an avenue on chromium? 
  - Watch/fitness band apps? These things are getting more common...

# Breathing Rythym

- 4 phases
  - Exhale
  - wait
  - inhale
  - hold
- currently using a crude sinusoidal easing
- should you be able to dynamically alter each phase duration?
  - does it immediately take effect and if so what about boundary conditions?
  - does it schedule the change for the next cycle?

# Rythym Game Effects

What should these rythyms affect on screen?

I think having the Player's avatar interact with a simulation or generative fractal would be a strong tool to making the Player feel thier body is part of the game.

The style of control you give the Player over the simulation could have a strong proteus effect as well; Do you hand them a hammer or a fan?

## Fern Fractal

 - We could use an IFS to draw plants on the screen
 - every inhale could cause the stems to grow and fork
 - Player limb position and/or relative angle could alter the direction limbs are growing, and to a lesser extent, move the existing stems
 - goal could be to guide the plants to open space and light as shadows are cast on the plant.
 - different species of plant will have different growth patterns to control
 - this mode implies breath control and balancing/stretching the body in reaching poses...

 ![fern fractal](./img/fern.jpg)

## Compressible Fluid

 - breathing cycles trees through seasons. Every Fall/exhale drops leaves.
 - we could put avatar in a compressible liquid simulation where their limbs chould shed vortices and flutter the leaves.
 - playfuly keep leaves in the air, or knock down piles with Hadoukens of air.
 - this mode implies a more active session with taichi-like round motions

![Autumn wind](./img/autumnWind.jpg)

## Sand Simulation

 - Sand pours on the user's head, off shoulders and down their arms, building hills on the ground
 - cover the monuments of lemurian civilizations
 - dig them back up after the ecological shift of an epoch
 - this mode implies more methodical motions, with arched poses, focused downwards. Horse stance for endurance training?

 ![sand approaches ruins](./img/sandRuins.png)
 https://www.flickr.com/photos/dpicto/21185589974/

## incompressible fluid 

## N-body Gravitation

- player floats in the void, their extemities are massive celestial bodies to which emerging constellations respond.
- shepard an accretion disc from dust
- after ignition, guide planets too/from each other. 
- or maybe feed a black hole, making the game quieter?
- viewpoint? 
  - top-down, user is in center of spiral?
  - small angle above the plane of the system, so user can see small, distant bodies travelling the opposite direction before they enter on the interactive foreground?
  - both?
- This would be an active and unpredicable session with more exertion; gravity produces chaotic and rapid motions.

![moon disturbing the rings of Saturn](./img/disturbedSaturnRing.jpg)

## Ray-marched Modulo Fractals

https://www.youtube.com/watch?v=N8WWodGk9-g

https://www.youtube.com/watch?v=9U0XVdvQwAI

https://www.youtube.com/watch?v=svLzmFuSBhk

- Like IFS fractals but solid and infinite, very psychadelic!
- Can be real-time but you need a graphics card, not sure how strong, lol.
- Like IFS use limb orientations as coefficient values
- Awesome examples from the dev of 'Hyperbolica'.
- The game could be based around a posing your body to explore the space;
  - Instead of watching your avatar to get the configuration, the player tries poses until they find the target.
  - This target is a set of limb coefficients, which is a unique infinite fractal, so devs whould tag a point in the search space that look like being at the base of a soaring tower- or viewing an endless city from space, etc.
  - breathing will slightly rotate the configuration, making it look like the world is breathing as well.
  - Warm/cold feedback can come from color changes as the user gets closer to the correct pose.
- This game state would be based around mind-body connection because they have to individually move specific limbs in specific directions to 'travel' on the psychic plane.

![non-interactive speed raycasting](./img/raymarchedFractal.jpg)
http://blog.hvidtfeldts.net/index.php/2015/01/path-tracing-3d-fractals/

## Cohomology fractals

https://www.youtube.com/watch?v=fhBPhie1Tm0

pretty sure the second half of this video is a troll...

https://henryseg.github.io/cohomology_fractals/

- Fast New fractal developed by Henry Segerman and co.
- might be worth brainstorming how this could be a playspace...

# Miscellany

- Where do I add the Breathing rythym?
  - child of game session since most everything must know it?

- I noticed the target placement problem with my wide angle camera! Possible solution;
  - Have a subtle calibration where the avatar instructs the user to enter a 'T' or 'X' pose
    - Instructed to reach as wide as possible onscreen, subtly forcing the Player to get in the image plane of the camera.
  - measure on-screen limb length and scale all subesequent target poses accordingly.
  - should work as long as user doesn't move closer/further from screen;
    - Oh, you could also actively scale targets periodically updating limb-lengths for any poses perpendicular to the camera direction.

- Limb position has jitter which gives a tense feeling!
  - we might want to use some smoothing (time average or alpha-beta) to 'soothe' this

- Limb occlusion makes limb position jump!
  - discard position outliers?
  - identify sideways bodies when torso width is thin?


# Drill Pilot Variable Guide and Sample Calculations



<!-- 
Start with how we use the software  

-->

Welcome to the Drill Pilot Documentation!

When you first open the [Drill Pilot](https://drillpilot.sunsab.com/) application an empty interface will greet you.

![Drill Pilot Interface](ExampleInterface\BaseInterface.png)

The next step for opening up your very own survey begins by clicking new design.

![Drill Pilot Interface](ExampleInterface\NewDesign.png)

Once **New Design** is clicked a variable guide will open to the users. These variables can change every portion of the servey. From which direction it bends to the depth of the vertical. All aspects of the servey are controlled through these variables.

![Drill Pilot Interface](ExampleInterface\VariableGuide.png)


## Variable Guide

Before defining what each variable is it's important to define each of the sections of the drill. As the names of the sections 

### Lateral Length ($\text{m}$)

The length that the drill goes during the lateral. 

The length of the horizon

Min max


<!---
Woohoo
This is the length the well goes for after the build arc
--->


### Well Spacing ($\text{m}$)

Ask Anwar about what this definition is.
The distance the lateral is translated away from the origin
<!---
?????
--->




### Lateral Azimuth ($\degree$)

From a bird's-eye view perspective, the final angle of the drill's lateral length relative to the positive North-South axis.

<!---
The final angle the later length will sit on
--->

### Drill Turn ($\degree~30~\text{m} $)

The degree change per stick length of the drill's turn. Runs from $0\degree$ to the lateral azimuth angle

<!---
Angle per section of turn 
--->

### Total Depth ($\text{m}$)

The depth of the vertical. d

<!---
The depth of the vertical
--->



### Drill Build ($\degree~30~\text{m}$)

The degree change per stick length of the drill's build. Runs from $0\degree$ to $90\degree$.


<!---
Angle per section of build
--->


### Lateral Dip ($\degree$)


The angle that the lateral drill portion is on relative to the ground. 




<!---
Include the min and max values in this section.
Make it read more like a story
We dont need to teach the user what we are doing behind the scenes.
What we need to do is define the varaibles and the axis of the plot in a way that the user can understand. explaining using diagrams and good wording and definitions.
Since we dont need to define the equations 
--->



The main user interface for servey building is the one seen here. 

![User Information](Pictures\UserInterfaceSmall.png)


<!---

TO properly explain the variables I'll explain what each of the variables are using pictures of the application. So when it comes to well spacing for example I'll have a picture of the top down perspective and I'll have like a quick description of what we are looking at as well. 

--->

With each of these variables and their bounds defined in the following images:


### Lateral Length ($\text{m}$)
The length that the drill goes during the lateral. 

The length of the horizon

Min max


<!---
Woohoo
This is the length the well goes for after the build arc
--->


### Well Spacing ($\text{m}$)

Ask Anwar about what this definition is.
The distance the lateral is translated away from the origin
<!---
?????
--->




### Lateral Azimuth ($\degree$)

From a bird's-eye view perspective, the final angle of the drill's lateral length relative to the positive North-South axis.

<!---
The final angle the later length will sit on
--->

### Drill Turn ($\degree~30~\text{m} $)

The degree change per stick length of the drill's turn. Runs from $0\degree$ to the lateral azimuth angle

<!---
Angle per section of turn 
--->

### Total Depth ($\text{m}$)

The depth of the vertical. d

<!---
The depth of the vertical
--->



### Drill Build ($\degree~30~\text{m}$)

The degree change per stick length of the drill's build. Runs from $0\degree$ to $90\degree$.


<!---
Angle per section of build
--->


### Lateral Dip ($\degree$)


The angle that the lateral drill portion is on relative to the ground. 



## Example Data and Iterative Calculations

Initial Conditions

~~~
Lateral Length => 2000

Well Spacing => 300

Drill Turn => 7

Turn Direction => Left

Lateral Azimuth => 45

Total Depth => 2000

Drill Build => 5

Lateral Dip => 0.14
~~~
<!-- 
These input variables are then put in use during the backend calculations in creating the well build. To properly set up the calculation we split the well into 4 different sections. 

1. Vertical
2. build
3. Turn
4. Lateral 
--> 
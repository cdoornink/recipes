import DS from 'ember-data';

var Recipe = DS.Model.extend({
  title: DS.attr('string'),
  short: DS.attr('string'),
  shortTitle: Ember.computed('title', function() {
    if (this.get('short')) {
      return this.get('short')
    } else {
      return this.get('title')
    }
  }),
  groups: DS.hasMany('group', {key: 'groups'}),
  prepTime: DS.attr('number'),
  cookTime: DS.attr('number'),
  serves: DS.attr('number'),
  image: DS.attr('string'),
  ingredients: DS.attr(),
  instructions: DS.attr(),
  thumb: DS.attr(),
  background: DS.attr()
});

// produce
// rice
// bread
// post bread
// meat
// dairy
// cheese
// freezer
// baking
// pasta
// beans
// soup

Recipe.reopenClass({
  FIXTURES: [
    {
      id: 'yakisoba',
      title: 'Chicken Yakisoba',
      groups: [2],
      prepTime: 15,
      cookTime: 15,
      serves: 6,
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      background: 'http://blogs.babycenter.com/wp-content/uploads/2013/10/chicken-yakisoba-2_small.jpg',
      ingredients: [
        {name: 'green cabbage', amount: '1/4 head', aisle: 'produce'},
        {name: 'onion', amount: '1 medium', aisle: 'produce'},
        {name: 'carrots', amount: '2 medium', aisle: 'produce'},
        {name: 'broccoli', amount: '1 small crown', aisle: 'produce'},
        {name: 'fresh ginger', amount: '2 inches'},
        {name: 'chicken thighs', amount: '1 large', aisle: 'meat'},
        {name: 'vegetable oil', amount: '2 Tbsp'},
        {name: 'top ramen', amount: '2 (3oz) packages', aisle: 'soup'},
        {name: 'sesame oil', amount: '1 tsp'},
        {name: 'soy sauce', amount: '1/4 cup'},
        {name: 'worcestershire sauce', amount: ' 1/4 cup'},
        {name: 'ketchup', amount: '2 Tbsp'},
        {name: 'sriracha sauce', amount: '1 Tbsp'},
        {name: 'sugar', amount: '1 Tbsp'}
      ],
      instructions: [
        "Before you begin, prepare the meat and vegetables for stir frying. Peel the ginger with either a vegetable peeler or the side of a spoon and then grate it with a cheese grater. Peel and grate the carrots with a large holed cheese grater. Remove the core from the cabbage and cut into thin strips. Slice the onion into thin strips. Cut the broccoli into bite-sized pieces. Slice the chicken into thin strips.",
        "Begin boiling a medium pot full of water for the noodles. Heat the vegetable oil in a large skillet over medium-high heat. When the oil is hot, add the grated ginger, saute for about 30 seconds to one minute (its okay if it sticks to the pan but don’t let it burn). Add the chicken strips and cook until they are no longer pink (about five minutes).",
        "Once the chicken is cooked through, add all of the vegetables. Stir and cook until wilted (about 5-10 minutes). Meanwhile, once the water boils, add the noodles and cook just until tender (2-3 minutes). Drain, return to the pot (with the heat turned off) and toss with the sesame oil to keep from sticking.",
        "In a small bowl, combine the soy sauce, worcestershire sauce, ketchup, sriracha, and sugar. Use only ½ tsp of sriracha if you don’t want it spicy, use up to 1 Tbsp if you like it hot. Stir until the ketchup and sugar are dissolved. Pour the sauce into the skillet with the chicken and vegetables with the heat still on medium high. Add the noodles, stir to coat everything in the sauce, and heat through (just a few minutes)."
      ]
    },
    {
      id: 'orzo-soup',
      title: 'Escarole and Orzo Soup with Turkey Meatballs',
      short: 'Smitten Kitchen Orzo Soup',
      groups: [2],
      // prepTime: 15,
      // cookTime: 15,
      serves: 4,
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      background: 'http://blogs.rep-am.com/whatsfordinner/files/2011/12/ItalianWeddingSoup.jpg',
      ingredients: [
        {name: 'egg', amount: '1 large'},
        {name: 'water', amount: '2 Tbsp'},
        {name: 'plain dried breadcrumbs', amount: '1/4 cup'},
        {name: 'ground turkey', amount: '12 ounces', aisle: 'meat'},
        {name: 'parmesan cheese', amount: '1/4 cup', aisle: 'cheese'},
        {name: 'parsley', amount: '2 Tbsp'},
        {name: 'garlic cloves, minced', amount: '2'},
        {name: 'salt', amount: '3/4 tsp'},
        {name: 'ground black pepper', amount: '1/4 tsp'},
        {name: 'chicken broth', amount: '8 cups', aisle: 'soup'},
        {name: 'carrots', amount: '1 cup', aisle: 'produce'},
        {name: 'orzo', amount: '3/4 cup', aisle: 'pasta'},
        {name: 'swiss chard', amount: '4 cups', aisle: 'produce'},
      ],
      instructions: [
        "Whisk egg and 2 tablespoons water in medium bowl to blend. Mix in breadcrumbs; let stand 5 minutes. Add turkey, Parmesan cheese, parsley, garlic, salt, and pepper; gently stir to blend. Using wet hands, shape turkey mixture into 1 1/4-inch-diameter meatballs. Place on baking sheet; cover and chill 30 minutes.",
        "Bring 8 cups chicken broth to boil in large pot. Add carrots and orzo; reduce heat to medium and simmer uncovered 8 minutes. Add turkey meatballs and simmer 10 minutes. Stir in chopped swiss chard and simmer until turkey meatballs, orzo, and escarole are tender, about 5 minutes longer. Season soup to taste with salt and pepper. (Can be made 2 hours ahead. Rewarm over medium heat, thinning with more broth if desired.)",
        "Ladle soup into bowls and serve."
      ]
    },
    {
      id: 'korean-beef',
      title: 'Korean Beef Bowl',
      groups: [2],
      prepTime: 5,
      cookTime: 10,
      serves: 4,
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      background: 'http://damndelicious.net/wp-content/uploads/2013/07/Korean-Beef-Bowl-copy.jpg',
      ingredients: [
        {amount: '1/3 cup', name: 'brown sugar, packed'},
        {amount: '1/4 cup', name: 'soy sauce'},
        {amount: '1 Tbsp', name: 'sesame oil' },
        {amount: '1/2 teaspoon', name: 'crushed red-pepper flakes'},
        {amount: '1/4 teaspoon', name: 'ground ginger'},
        {amount: '1 tablespoon', name: 'vegetable oil'},
        {amount: '3 cloves', name: 'garlic, minced'},
        {amount: '1 pound', name: 'ground beef', aisle: 'meat'},
        {amount: '2', name: 'green onions', aisle: 'produce'},
        {amount: '1 head', name: 'broccoli', aisle: 'produce'},
        {name: 'rice'}
      ],
      instructions: [
        'In a small bowl, whisk together brown sugar, soy sauce, sesame oil, red pepper flakes and ginger.',
        'Cook the Broccoli',
        'Heat vegetable oil in a large skillet over medium high heat. Add garlic and cook, stirring constantly, until fragrant, about 1 minute. Add ground beef and cook until browned, about 3-5 minutes, making sure to crumble the beef as it cooks; drain excess fat. Stir in soy sauce mixture and green onions until well combined, allowing to simmer until heated through, about 2 minutes.',
        'Serve immediately with rice.'
      ]
    },
    {
      id: 'chicken-caesar',
      title: 'Chicken Avocado Caesar Salad',
      groups: [2],
      serves: 4,
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      background: 'http://i2.wp.com/cafedelites.com/wp-content/uploads/2015/03/Chicken-and-Avocado-Caeser-Salad-411.jpg?w=600',
      ingredients: [
        {amount: '1/2 loaf', name: 'ciabatta', aisle: 'bread'},
        {amount: '2', name: 'Chicken Breast', aisle: 'meat'},
        {amount: '1 Tbsp', name: 'garlic powder'},
        {amount: '2 Tbsp', name: 'dried parsley flakes'},
        {amount: 'Pinch of', name: 'salt'},
        {amount: '7oz', name: 'bacon', aisle: 'cheese'},
        {amount: '2', name: 'eggs'},
        {amount: '2 heads', name: 'lettuce', aisle: 'produce'},
        {amount: '1', name: 'Avocado', aisle: 'produce'},
        {amount: '½ cup', name: 'parmesan cheese', aisle: 'cheese'},
        {name: 'Caesar Dressing', aisle: 'pasta'}
      ],
      instructions: [
        'Preheat the oven to grill/broil settings on medium - high heat. Place the bread slices onto an oven tray; drizzle with olive oil and bake in the oven (on middle shelf) until crispy. While bread is grilling, prepare chicken:',
        "Halve the chicken breast fillets and rub them with the garlic powder, parsley flakes and salt. Heat a non stick grilling pan/skillet with a drizzle of olive oil and fry chicken until golden on both sides. Remove the chicken and set aside onto a warm plate. Add the bacon strips to the same pan, and fry until golden and crispy. While the bacon is frying, boil your eggs to your liking (and don't forget to check your bread in the oven)!",
        "Combine lettuce with the chicken and bacon strips; eggs (halved); avocado slices; shaved parmesan cheese; and bread pieces (halved). Pour over the dressing; mix well to combine, and serve!"
      ]
    },
    {
      id: 'white-pizza',
      title: 'White Pizza with Chicken and Fresh Herbs',
      short: 'White Pizza w/ Chicken',
      groups: [2],
      prepTime: 30,
      cookTime: 15,
      serves: 6,
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      background: 'http://tarasmulticulturaltable.com/wp-content/uploads/2013/08/white-pizza-with-chicken-and-herbs-5-of-5.jpg',
      ingredients: [
        {section: 'dough'},
        {amount: '2 cups', name: 'warm water'},
        {amount: '2 packages', name: 'quick rise yeast', aisle: 'baking'},
        {amount: '1 teaspoon', name: 'sugar'},
        {amount: '1 teaspoon', name: 'salt'},
        {amount: '1 tablespoon', name: 'honey'},
        {amount: '5-5½ cups', name: 'all purpose flour'},
        {section: 'pizza'},
        {amount: '1-2 tsp', name: 'cornmeal'},
        {amount: '1 container', name: 'alfredo sauce', aisle: 'pasta'},
        // {amount: '1 Tbsp', name: 'unsalted butter'},
        // {amount: '3', name: 'garlic cloves, minced'},
        // {amount: '3 Tbsp', name: 'all purpose flour'},
        // {amount: '1/2 tsp', name: 'black pepper'},
        // {amount: '3/4 cup', name: 'milk'},
        // {amount: '1/2 cup', name: 'grated Parmesan cheese'},
        // {name: 'salt'},
        {amount: '1 cup', name: 'chicken breast', aisle: 'meat'},
        {amount: '1 cup', name: 'bacon', aisle: 'cheese'},
        {amount: '1/3 cup', name: 'red onion', aisle: 'produce'},
        {amount: '2/3 cup', name: 'mozzarella cheese', aisle: 'cheese'},
        {amount: '1 Tbsp', name: 'fresh oregano', aisle: 'produce'},
        {amount: '1 Tbsp', name: 'fresh chives', aisle: 'produce'},
        {amount: '1 Tbsp', name: 'fresh parsley', aisle: 'produce'},
        {name: 'salad ingredients', aisle: 'produce'}
      ],
      instructions: [
        "Dough:",
        "Add water, yeast, and sugar to a mixing bowl. Stir and then let proof for about 5 minutes.",
        "Add salt, honey, and about 2.5 cups of flour. Mix with a dough hook or by hand.",
        "Add remaining flour, ½ cup at a time, until dough doesn't stick to your hands.",
        "Form until a ball and knead several times (or use a dough hook for this part.)",
        "Place in an oiled boil, cover with plastic wrap, and let rise at least 30 minutes. The longer it rises, the better.",
        "Pizza:",
        "Preheat oven to 500 degrees F with pizza stone, if using. Sprinkle cornmeal over baker's peel or parchment.",
        "Roll pizza dough into a 14 inch circle, place on prepared baker's peel, and brush the edge with olive oil.",
        // "Add butter to a small saucepan and melt over medium heat. Once melted, add the garlic and cook until just fragrant, 30 seconds to 1 minute. Whisk in the flour and pepper and cook until golden. Continue whisking and slowly pour in the milk. Bring to a simmer and cook, stirring often, until thickened. Remove from heat and stir in Parmesan, salt, and pepper.",
        "Spread about 1/2 cup sauce over prepared pizza dough, enough for a thin layer. Sprinkle chicken and onions over the pizza. Cover with mozzarella.",
        "Transfer the pizza to pizza stone using baker's peel or parchment. Bake until crust is golden and cheese is bubbly, 10-12 minutes. Remove from oven and let cool about 5 minutes before topping with fresh herbs and slicing. Serve with remaining white sauce."
      ]
    },
    {
      id: 'chicken-tacos',
      title: 'Chicken Tacos',
      groups: [2],
      prepTime: 10,
      cookTime: 10,
      serves: 4,
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      background: 'http://www.clowns4kids.com/images/mariachibandtrumpet.jpeg',
      ingredients: [
        {amount: '1/2', name: 'onion', aisle: 'produce'},
        {amount: '2', name: 'lettuce', aisle: 'produce'},
        {amount: '1 Tbsp', name: 'tomato', aisle: 'produce'},
        {amount: '2 Tbsp', name: 'avocado', aisle: 'produce'},
        {name: 'small corn tortillas', aisle: 'postBread'},
        {amount: 'handfuls of', name: 'corn chips', aisle: 'postBread'},
        {name: 'chicken breast', aisle: 'meat'},
        {name: 'sour cream', aisle: 'cheese'},
        {name: 'salsa', aisle: 'cheese'},
        {name: 'refried beans', aisle: 'beans'}
      ],
      instructions: [
        'Make some tasty kickass tacos!'
      ]
    },
    {
      id: 'blt-salad',
      title: 'BLT Salad with Basil Garlic Bread',
      short: 'BLT Salad',
      groups: [5],
      thumb: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
      background: 'http://www.thelondoner.me/wp-content/uploads/2014/12/blt+salad+-+11874.jpg',
      ingredients: [
        {section: 'bread'},
        {amount: '2 ounces', name: 'Butter'},
        {amount: '2 Tbsp', name: 'Olive Oil'},
        {amount: '1 bunch', name: 'fresh basil', aisle: 'produce'},
        {amount: '1 bunch', name: 'fresh parsley', aisle: 'produce'},
        {amount: '2 cloves', name: 'Garlic'},
        {amount: '1 whole', name: 'Green Onion', aisle: 'produce'},
        {amount: '2 pinches', name: 'Salt'},
        {amount: '1 pinch', name: 'Pepper'},
        {amount: '1 loaf', name: 'Ciabatta bread', aisle: 'bread'},
        {amount: '2 cup', name: 'parmesan cheese', aisle: 'cheese'},
        {section: 'salad'},
        {amount: '2 hearts', name: 'Lettuce', aisle: 'produce'},
        {amount: '1 large', name: 'avocado', aisle: 'produce'},
        {amount: '2 handfuls of', name: 'cherry tomatoes', aisle: 'produce'},
        {amount: 'Half a', name: 'cucumber', aisle: 'produce'},
        {amount: 'Handful of', name: 'fresh cilantro', aisle: 'produce'},
        {amount: '4 rashers of', name: 'bacon', aisle: 'cheese'},
        {amount: 'Half a handful of', name: 'feta cheese', aisle: 'cheese'}
      ],
      instructions: [
        "Bread:",
        "Combine all the ingredients except the bread and cheese in a food processor, and process until smooth. Season with salt and pepper.",
        "Cut open the loaf of bread and spread both halves with the basil butter. Put the halves together and wrap in aluminum foil. Bake for in a 400ºF oven for 10 minutes.",
        "Remove the bread, separate the halves and load them up with Parmesan cheese. Return them to the oven and either crank up the heat to 500ºF or put them under the broiler.",
        "Cook until the cheese is melted, bubbly, and starting to get brown. Serve!",
        "Salad:",
        "Cook your bacon until it’s nice & crispy. While it’s sizzling away, chop everything else up into bite-sized squares. Throw it all in a bowl, followed by your bacon (chopped) when it’s done. Crumble your feta over the top.",
        "Pour about 2 shot glasses of good olive oil into a cup. Add a shot of balsamic vinegar, a tsp of mustard, the juice of a small lemon and a good sprinkle of salt.",
        "Drizzle over your salad."
      ]
    },
    {
      id: 'rigatoni',
      title: 'Rigatoni with Swiss Chard and Pork',
      groups: [5],
      prepTime: 15,
      cookTime: 20,
      serves: 4,
      thumb: 'http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2014/9/23/2/FNM_110114-Rigatoni-with-Swiss-Chard-and-Sausage-Recipe_s4x3.jpg.rend.sni18col.jpeg',
      background: 'http://foodnetwork.sndimg.com/content/dam/images/food/fullset/2014/9/23/2/FNM_110114-Rigatoni-with-Swiss-Chard-and-Sausage-Recipe_s4x3.jpg.rend.sni18col.jpeg',
      ingredients: [
        {amount: '12 ounces', name: 'rigatoni', aisle: 'pasta'},
        {amount: '2 Tbsp', name: 'olive oil'},
        {amount: '12 ounces', name: 'pork', aisle: 'meat'},
        {amount: '4 Tbsp', name: 'unsalted butter'},
        {amount: '6 cloves', name: 'garlic'},
        {amount: '1 bunch', name: 'swiss chard', aisle: 'produce'},
        {amount: '1 Tbsp plus 1 tsp', name: 'all-purpose flour'},
        {amount: '1 3/4', name: 'milk'},
        {amount: '1/2 cup', name: 'parmesan cheese', aisle: 'cheese'},
        {name: 'lemon juice', aisle: 'produce'}
      ],
      instructions: [
        "Bring a large pot of salted water to a boil. Add the pasta and cook as the label directs. Reserve 1/2 cup cooking water, then drain the pasta.",
        "Meanwhile, heat the olive oil in a large Dutch oven or wide skillet over medium-high heat. Add the pork and cook until browned, about 5 minutes. Transfer to a plate using a slotted spoon; set aside.",
        "Wipe the Dutch oven clean; add the butter and melt over medium heat. Add the garlic and cook, stirring, until slightly softened, 1 to 2 minutes. Add the chard and cook, stirring occasionally, until wilted, 3 to 4 minutes. Sprinkle in the flour and cook, stirring, until combined, 1 to 2 minutes.",
        "Add the milk to the chard mixture and bring to a boil; cook 1 minute. Stir in the pork, parmesan, lemon zest and a few grinds of pepper. Reduce the heat to medium low and simmer, stirring occasionally, until slightly thickened, about 6 minutes. Add the pasta to the pot and toss, adding enough of the reserved pasta water to loosen."
      ]
    },
    {
      id: 'chicken-wraps',
      title: 'Grilled Chicken Wraps w/ Spicy Garlic Sauce',
      short: 'Grilled Lemon Chicken Wraps',
      groups: [5],
      prepTime: 15,
      cookTime: 20,
      serves: 4,
      thumb: 'http://thecozyapron.com/wp-content/uploads/2015/03/lemon-chicken-flatbead-wraps_03-22-15_1_ca.jpg',
      background: 'http://thecozyapron.com/wp-content/uploads/2015/03/lemon-chicken-flatbead-wraps_03-22-15_1_ca.jpg',
      ingredients: [
        {amount: '1 pound', name: 'chicken breasts', aisle: 'meat'},
        {name: 'Olive oil'},
        {amount: '2 cloves', name: 'garlic'},
        {amount: '1 tablespoon', name: 'lemon juice', aisle: 'produce'},
        {amount: '1 teaspoon', name: 'salt'},
        {amount: 'Pinch or two', name: 'black pepper'},
        {amount: '½ teaspoon', name: 'dried oregano'},
        {amount: '½ teaspoon', name: 'ground cumin'},
        {amount: '¼ teaspoon', name: 'cilantro'},
        {amount: '¼ teaspoon', name: 'paprika'},
        {name: 'pita bread', aisle: 'bread'},
        {name: 'arugula', aisle: 'produce'},
        {name: 'tomatoes', aisle: 'produce'},
        {section: 'sauce'},
        {amount: '½ cup', name: 'mayonnaise'},
        {amount: '½ cup', name: 'plain greek yogurt', aisle: 'dairy'},
        {amount: '3 cloves', name: 'garlic'},
        {amount: '1 tablespoon', name: 'tahini', aisle: 'pasta'},
        {amount: '2-3 teaspoons', name: 'sriracha'},
        {amount: '1 teaspoon', name: 'salt'},
        {amount: 'Pinch', name: 'black pepper'},
        {amount: 'Pinch', name: 'cayenne pepper'},
        {amount: '½ teaspoon', name: 'lemon juice'},
      ],
      instructions: [
        "Wraps:",
        "Place the cubed chicken into a medium-size bowl, and drizzle in about 2 tablespoons of olive oil; add in the garlic, plus the remainder of the ingredients up to and including the paprika, and using your hands, toss all of the seasonings/spices very well to coat the chicken.",
        "Using 4 bamboo skewers, skewer the chicken so that there is equal portions of meat on each skewer, and allow the chicken to marinate for about 20 minutes, or even overnight, if making ahead.",
        "When ready to grill, place a grill pan over medium-high heat (you can certainly use your outdoor grill, as well), and drizzle in a little oil; once the oil gets hot, place the chicken skewers into the pan, and cook them for about 6-8 minutes, turning them occasionally so that they get a bit charred on all sides, or until cooked through; allow them to rest, lightly covered with foil, for about 5-10 minutes; then, remove the chicken cubes from the skewers and set aside.",
        "To assemble, add a little drizzle of the Spicy Garlic Sauce onto the flatbread, followed by the greens; then, add a couple of slices of tomato, and about one skewer-worth of the lemon chicken; drizzle over a generous amount of the Spicy Garlic Sauce, and fold the sides towards the middle to form a “wrap” (you can even use some parchment paper or foil to hold it all together, if you’d like).",
        "Garlic Sauce:",
        "-Add all ingredients to a medium-size bowl, and whisk together until completely smooth and creamy; use immediately, or keep in the fridge, covered. (I like to put mine in a plastic squeeze bottle, and keep any leftovers in the fridge to use for other sandwiches, or as a tasty condiment.)"
      ]
    },
    {
      id: 'chicken-noodle',
      title: 'Chicken Noodle Soup',
      groups: [5],
      prepTime: 10,
      cookTime: 30,
      serves: 6,
      thumb: 'http://pictureperfectmeals.com/wp-content/uploads/2014/01/chicken-noodle-soup-001.jpg',
      background: 'http://pictureperfectmeals.com/wp-content/uploads/2014/01/chicken-noodle-soup-001.jpg',
      ingredients: [
        {amount: '3 cups', name: 'chicken breast', aisle: 'meat'},
        {amount: '2 tablespoons', name: 'unsalted butter'},
        {amount: '2 tablespoons', name: 'olive oil '},
        {amount: '1', name: 'onion', aisle: 'produce'},
        {amount: '4', name: 'celery', aisle: 'produce'},
        {amount: '4', name: 'carrots', aisle: 'produce'},
        {amount: '1 teaspoon', name: 'minced garlic'},
        {amount: '2', name: 'bay leaves'},
        {name: 'Kosher salt and freshly ground black pepper'},
        {amount: '2 quarts', name: 'chicken broth', aisle: 'soup'},
        {amount: '2 cups', name: 'wide egg noodles', aisle: 'pasta'},
      ],
      instructions: [
        "Cook the chicken.",
        "In a large pot over medium, heat the butter and olive oil. Add the onion, celery, carrots, garlic and bay leaves. Season with salt and pepper. Cook until the vegetables soften, about 7 minutes, stirring occasionally.",
        "Add the stock and simmer for 10 minutes.",
        "Stir in the chicken and noodles and simmer until the noodles are cooked, about 10 minutes more. Discard the bay leaves. Season to taste and serve with a sprinkling of fresh, minced parsley, if desired."
      ]
    },
    {
      id: 'santa-fe-chicken',
      title: 'Crock Pot Santa Fe Chicken',
      groups: [5],
      prepTime: 15,
      cookTime: 480,
      serves: 8,
      background: 'https://lh5.ggpht.com/_BizpeaUzxq8/SaS8B-jZQaI/AAAAAAAAA5w/DShsZLVMhNA/s800/crock-pot-santa-fe-chicken.jpg',
      ingredients: [
        {amount: '24 oz', name: 'chicken breast', aisle: 'meat'},
        {amount: '14.4 oz', name:'diced tomatoes with mild green chilies', aisle: 'beans'},
        {amount: '15 oz', name: 'black beans', aisle: 'beans'},
        {amount: '8 oz', name: 'frozen corn', aisle: 'freezer'},
        {amount: '1/4 cup', name:'fresh cilantro', aisle: 'produce'},
        {amount: '14.4 oz', name:'chicken broth', aisle: 'soup'},
        {amount: '3', name: 'scallions', aisle: 'produce'},
        {amount: '1 tsp', name: 'garlic powder'},
        {amount: '1 tsp', name: 'onion powder'},
        {amount: '1 tsp', name: 'cumin'},
        {amount: '1 tsp', name: 'cayenne pepper'},
        {name: 'salt'},
      ],
      instructions: [
        "Combine chicken broth, beans (drained), corn, tomatoes, cilantro, scallions, garlic powder, onion powder, cumin, cayenne pepper and salt in the crock pot. Season chicken breast with salt and lay on top.",
        "Cook on low for 10 hours or on high for 6 hours. Half hour before serving, remove chicken and shred. Return chicken to slow cooker and stir in. Adjust salt and seasoning to taste. Serve over rice or tortillas and your favorite toppings.",
      ]
    },
    {
      id: 'chicken-casserole',
      title: 'Cheesy Chicken and Wild Rice Casserole',
      groups: [5],
      serves: 8,
      background: 'http://picky-palate.com/wp-content/uploads/2010/09/IMG_6634.jpg',
      ingredients: [
        {section: 'casserole'},
        {amount: '3 Tablespoons', name: 'olive oil'},
        {amount: '1 medium', name: 'onion', aisle: 'produce'},
        {amount: '3 stalks', name: 'celery', aisle: 'produce'},
        {amount: '3', name: 'carrots', aisle: 'produce'},
        {amount: '2 Tablespoons', name: 'garlic'},
        {amount: '2 Cups', name: 'chicken breast', aisle: 'meat'},
        {amount: '2 Cups', name: 'white rice', aisle: 'rice'},
        {amount: '16 oz', name: 'wild rice', aisle: 'rice'},
        {amount: '1 teaspoon', name: 'salt'},
        {amount: '1/2 teaspoon', name: 'black pepper'},
        {amount: '1/4 teaspoon', name: 'garlic salt'},
        {section: 'cheese sauce'},
        {amount: '4 Tablespoons', name: 'butter'},
        {amount: '1/4 Cup', name: 'all purpose flour'},
        {amount: '1/4 teaspoon', name: 'salt'},
        {amount: '1/4 teaspoon', name: 'black pepper'},
        {amount: '2 Cups', name: 'chicken broth', aisle: 'soup'},
        {amount: '2 Cups', name: 'cheddar cheese', aisle: 'cheese'},
        {amount: 'Top with 1 1/2 Cups shredded', name: 'cheddar cheese'},
      ],
      instructions: [
        "Cook the chicken and rice.",
        "Preheat oven to 350 degrees F.  Heat oil into a medium dutch oven or pot over medium heat.  Saute onion, celery and carrots until softened, about 10 minutes.  Stir in garlic and cook for 1 minute.  Stir in chicken, both rices, salt, pepper and garlic salt.  Reduce heat to low.",
        "To prepare cheese sauce melt butter into a medium saucepan over medium high heat.  Whisk in flour, salt and pepper then slowly pour in chicken broth whisking continuously.  Whisk until thick and nearly boiling then stir in cheese until melted.  Pour cheese sauce into cooked rice mixture then transfer to a 9×13 inch baking dish. Top with additional cheddar cheese and bake for 25-30 minutes or until cheese is melted through.  Serve.",
      ]
    },
    {
      id: 'fish-taco-bowl',
      title: 'Spicy Fish Taco Bowls',
      groups: [3],
      serves: 4,
      prepTime: 15,
      cookTime: 15,
      background: '/images/recipes/fish-taco-bowl-bg.jpg',
      ingredients: [
        {amount: '1 Tbsp', name: 'chili powder'},
        {amount: '1 Tbsp', name: 'cumin'},
        {amount: '½ teaspoon', name: 'cayenne pepper'},
        {amount: '3-4', name: 'tilapia filets', aisle: 'meat'},
        {amount: '1-2 cloves', name: 'garlic'},
        {amount: '1 cup', name: 'corn'},
        {amount: '1', name: 'red onion', aisle: 'produce'},
        {amount: '1', name: 'red pepper', aisle: 'produce'},
        {amount: '1 can', name: 'black beans', aisle: 'beans'},
        {amount: '2 cups', name: 'cooked brown rice'},
        {name: 'fresh cilantro, avocado, shredded cheese, sour cream, or pico de gallo for topping'}
      ],
      instructions: [
        'Start the rice',
        'Mix the spices together in a small bowl and sprinkle evenly over both sides of the fish filets. (I like to season my fish a LOT, but just sprinkle on however much looks good to you.) Add salt and pepper to taste.',
        'In a large nonstick skillet over medium high heat, heat a drizzle of olive oil. Add the garlic and saute for 1-2 minutes. Add the fish filets to the pan. Grill the fish on each side for several minutes, checking the middle for doneness (fish should be completely white and flake apart easily). Remove fish filets and set aside.',
        'Add corn, red peppers, and onions to the pan with no additional oil. Heat over high heat for several minutes WITHOUT stirring to get a brown/black roasted look on the outside. Repeat for several minutes (stir, wait, stir, wait) until the peppers and onions are tender-crisp. Add the black beans and heat through.',
        'Layer rice, corn/pepper mixture, and fish in a bowl - or mix everything together in the skillet. Top with any of the toppings listed above!',
      ]
    },
    {
      id: 'grilled-cheese-avocado',
      title: 'Grilled Cheese Avocado Sandwich',
      groups: [3],
      prepTime: 5,
      cookTime: 7,
      serves: 2,
      background: '/images/recipes/grilled-cheese-avocado.jpg',
      ingredients: [
        // {section: 'guacamole'}
        {amount: '2', name: 'avocados', aisle: 'produce'},
        // 1/2 small onion, minced
        // 1 clove garlic, minced
        // 1 small jalapeño, stems and seeds removed, minced
        // 2 tablespoons cilantro leaves, finely chopped
        // 1 tablespoon of fresh lime juice
        // 1/2 teaspoon coarse salt
        // A dash of freshly grated black pepper
        // 1 Roma tomato, chopped
        // {section: 'sandwich'},
        {amount: '4 slices', name: 'nice bread', aisle: 'bread'},
        {amount: '4 slices', name: 'Block of cheese', aisle: 'cheese'},
        {name: 'Butter'}
      ],
      instructions: [
        // 'To make the guacamole-cut avocados in half. Remove seed. Scoop out avacado from the peel, put in a large bowl. Using a fork, mash the avocado. Add the onion, garlic, jalapeño, cilantro, lime juice, salt and pepper. Stir until well combined. Add the chopped tomato and stir.',
        'Heat a pan or griddle to medium-high heat. Spread desired amount of guacamole on both slices of bread then top with cheese. Butter outer slices of bread and grill on one side for about 2 minutes or until golden and crispy. Flip the sandwich and grill until golden brown. Make the other sandwich the same way and serve warm.',
      ]
    },
    {
      id: 'slow-cooker-garlic-chicken',
      title: 'Slow Cooker Garlic and Brown Sugar Chicken',
      groups: [3],
      serves: 8,
      background: '/images/recipes/slow-cooker-garlic-chicken.jpg',
      ingredients: [
        {amount: '4-6', name: 'chicken breasts', aisle: 'meat'},
        {amount: '1 cup', name: 'packed brown sugar'},
        {amount: '2/3 cup', name: 'vinegar'},
        {amount: '1/4 cup', name: '7Up', aisle: 'postBread'},
        {amount: '2-3 Tablespoons', name: 'minced garlic'},
        {amount: '2 Tablespoons', name: 'soy sauce'},
        {amount: '1 teaspoon', name: 'fresh ground pepper'},
        {amount: '2 Tablespoons', name: 'corn starch'},
        {amount: '2 Tablespoons', name: 'water'},
        {name: 'Rice, cooked'},
        {name: 'Red pepper flakes (optional)'},
        {name: 'side vegetable', aisle: 'produce'}
      ],
      instructions: [
        'Spray slow cooker with non-stick cooking spray. Place chicken (I used frozen chicken, thawed chicken works great too) inside slow cooker. Mix together brown sugar, vinegar, soda, garlic, soy sauce, and pepper together. Pour over chicken. Cook on low for 6-8 hours or high for 4 hours. Take chicken pieces out of slow cooker (mine basically fell apart) and pour remaining sauce into saucepan. Place saucepan over high heat. Mix together corn starch and water, pour into saucepan, and mix well. Let sauce come to a boil and boil for 2-3 minutes, or until it starts to thicken and turns into a glaze. Remove from heat and let sit for a minute or two (it will continue to thicken as it cools down).',
        'Serve chicken over rice or noodles and top with glaze. Sprinkle red pepper flakes on top if desired.',
      ]
    },
    {
      id: 'crispy-sw-chicken-wrap',
      title: 'Crispy Southwest Chicken Wraps',
      groups: [3],
      serves: 6,
      background: '/images/recipes/crispy-sw-chicken-wrap.jpg',
      ingredients: [
        {amount: '1 cup cooked', name: 'rice'},
        {amount: '1 cup cooked, shredded', name: 'chicken breast', aisle: 'meat'},
        {amount: '1 can', name: 'black beans', aisle: 'beans'},
        {amount: '1', name: 'green onion', aisle: 'produce'},
        {amount: '1/2', name: 'red pepper', aisle: 'produce'},
        {amount: '1/4 cup', name: 'cilantro'},
        {amount: 'juice of 1', name: 'lime'},
        {amount: '1/2 tablespoon', name: 'chili powder'},
        {amount: '1 teaspoon', name: 'ground cumin'},
        {amount: '1/2 teaspoon', name: 'garlic salt'},
        {amount: '2 cups', name: 'montery jack shredded', aisle: 'cheese'},
        {name: 'Sour cream', aisle: 'cheese'},
        {amount: '6 burrito-sized', name: 'flour tortillas', aisle: 'postBread'},
      ],
      instructions: [
        'Cook the rice and chicken.',
        'Mix rice together with chili powder, cumin and garlic salt. Add remaining ingredients except for cheese and sour cream. Sprinkle cheese over tortillas, leaving 1/2-inch border around edges, then arrange chicken and rice mixture down the center of each tortilla. (Optional: I like to dollop little bits of sour cream over the cheese before arranging chicken and rice mixture down the center – it makes the wraps delightfully creamy.) Roll stuffed tortillas, leaving edges open and slightly flatten the wraps with the palm of your hand. Spray seam-side of the wrap lightly with cooking spray.',
        'Heat a large non-stick skillet (or griddle) over medium heat for 1 minute. Arrange wraps, seam-side down, in pan or griddle and cook until golden brown and crisp, about 2-3 minutes per side. Cooking them seam-side down first helps seal the long edge so they don’t fall apart. Transfer to a plate and repeat with remaining wraps. Serve warm.',
      ]
    },
    {
      id: 'turkey-burger',
      title: 'Turkey Black Bean Burgers',
      groups: [3],
      serves: 6,
      prepTime: 10,
      cookTime: 10,
      background: '/images/recipes/turkey-burger.jpg',
      ingredients: [
        {amount: '1 cup', name: 'black beans', aisle: 'beans'},
        {amount: '1 pound', name: 'ground turkey', aisle: 'meat'},
        {amount: '3/4 cup', name: 'parmesan cheese', aisle: 'cheese'},
        {amount: '1/2 cup', name: 'panko', aisle: 'soup'},
        {amount: '1', name: 'egg'},
        {amount: '1 (1 ounce) package', name: 'dry onion soup mix', aisle: 'soup'},
      ],
      instructions: [
        "Preheat an outdoor grill for medium-high heat and lightly oil the grate.",
        "Mix black beans, ground turkey, Parmesan cheese, bread crumbs, egg, and onion soup mix with your hands in a large bowl. Divide into 6 portions and shape into patties.",
        "Cook on preheated grill until no longer pink in the middle, 5 to 6 minutes per side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).",
      ]
    },
    {
      id: 'steak-salad',
      title: 'Steak Salad',
      groups: [3],
      serves: 4,
      background: '/images/recipes/steak-salad.jpg',
      ingredients: [
        {amount: '1 clove', name: 'garlic'},
        {amount: '2 Tbs.', name: 'lime juice'},
        {amount: '1 Tbs.', name: 'red-wine vinegar'},
        {amount: '1 tsp. toasted and lightly ground', name: 'cumin seed'},
        {amount: '1⁄2 tsp.', name: 'sweet paprika'},
        {name: 'Kosher salt'},
        {amount: '9 Tbs.', name: 'extra-virgin olive oil'},
        {amount: '1 thinly sliced', name: 'shallot'},
        {amount: '1⁄2 cup', name: 'pumpkin seeds'},
        {amount: 'One 1-1⁄4-lb. skirt', name:'steak', aisle: 'meat'},
        {name: 'Freshly ground black pepper'},
        {amount: '2 ripe', name: 'avocados'},
        {amount: '4 large handfuls assorted mild garden ', name: 'lettuce'},
        {amount: '2 medium-size', name: 'carrots'},
        {amount: '3', name: 'radishes'},
        {name: 'Aleppo pepper, for sprinkling (optional)'},
        {name: 'salad ingredients', aisle: 'produce'}
      ],
      instructions: [
        'To make the vinaigrette, combine the garlic, lime juice, vinegar, cumin, paprika, and a pinch of salt in a small bowl. Let sit for 5 to 10 minutes. Whisk in 6 Tbs. of the olive oil. Taste with a leaf of lettuce and adjust the vinaigrette with more lime juice, vinegar, or salt if necessary. Set aside.',
        'Put the shallot in a small bowl and cover with ice water. (The ice water crisps the shallot and helps remove some its hot and gassy flavor.) Set aside.',
        'Warm a small sauté pan over medium heat and add 1 Tbs. of the olive oil and the pumpkin seeds. Fry the seeds, tossing or stirring frequently, until golden, about 3 minutes. Transfer to a plate lined with a paper towel and season with salt.',
        'Cut the skirt steak into about 6-inch lengths and return it to the refrigerator until shortly before you are ready to cook it. (Because skirt steak is so thin, you want the beef cold to prevent it from overcooking before it browns.) Season the beef with salt and coarsely ground black pepper. Warm a large cast-iron skillet over high heat until very hot.',
        'Add the remaining 2 tablespoons olive oil and place the beef in the pan without overlapping the strips. Cook until the beef is nicely browned, 2 to 3 minutes. Turn and cook on the opposite side until medium rare, 1 to 2 minutes more; time will vary depending on the thickness of the meat. (If necessary, reduce the heat to medium high to finish cooking thicker sections of the meat.) Transfer to a plate and let rest for about 5 minutes.',
        'Cut the avocados in half lengthwise, remove the pits, and slice the flesh diagonally into about 1⁄4-inch slices. Set aside.',
        'Drain the shallot. Put the salad greens in a large work bowl; sprinkle the shallot, carrots, and radishes on top and season with salt and pepper. Gently toss the salad with just enough vinaigrette to lightly coat the greens. Taste and add more salt if necessary. Add about half of the pumpkins seeds and toss once more. With a delicate hand, transfer the salad to a platter or individual serving plates, evenly distributing the seeds, carrots, and radishes that may have fallen to the bottom of the bowl. Then, using a large spoon and starting at the very edge of the avocado (where skin meets flesh), scoop the flesh out of the avocado in one swoop. Separate the avocado slices and tuck them here and there among the greens. (At this point, I like to season the avocado, as best I can, with salt.) Thinly slice the meat against the grain. Arrange the skirt steak on the side or in the salad. Drizzle any remaining vinaigrette on and around the salad, focusing on the avocado and beef. Sprinkle the Aleppo pepper (if using) and the remaining pumpkin seeds on top. Serve immediately.',
      ]
    },
    {
      id: 'honey-salmon',
      title: 'Honey Salmon',
      groups: [3],
      serves: 4,
      prepTime: 10,
      cookTime: 15,
      background: '/images/recipes/honey-salmon.jpg',
      ingredients: [
        {amount: '1/4 cup', name: 'honey'},
        {amount: '3 cloves', name: 'garlic'},
        {amount: '1 tablespoon', name: 'olive oil'},
        {amount: '1 tablespoon', name: 'white wine vinegar'},
        {amount: '1 tablespoon', name: 'fresh thyme leaves'},
        {name: 'Kosher salt and freshly ground black pepper'},
        {amount: '2 pounds', name: 'salmon', aisle: 'meat'},
        {name: 'side vegetable', aisle: 'produce'}
      ],
      instructions: [
        'Preheat oven to 375 degrees F. Line a baking sheet with foil.',
        'In a small bowl, whisk together honey, garlic, olive oil, white wine vinegar, thyme, salt and pepper, to taste.',
        'Place salmon onto prepared baking sheet and fold up all 4 sides of the foil. Spoon the honey mixture over the salmon. Fold the sides of the foil over the salmon, covering completely and sealing the packet closed.',
        'Place into oven and bake until cooked through, about 15-20 minutes.',
        'Serve immediately.',
      ]
    },
    {
      id: 'chicken-avacado-burritos',
      title: 'Chicken Avacado Burritos',
      groups: [1],
      serves: 4,
      prepTime: 15,
      cookTime: 15,
      background: '/images/recipes/chicken-avacado-burritos.jpg',
      ingredients: [
        {amount: '2 cups cooked and shredded ', name: 'chicken breasts', aisle: 'meat'},
        {amount: '1 cup', name: 'shredded mozzarella', aisle: 'cheese'},
        {amount: '1', name: 'avocado', aisle: 'produce'},
        {amount: '2 Tablespoons', name: 'cilantro'},
        {amount: '4 large', name: 'tortillas', aisle: 'postBread'},
        {amount: '4 Tablespoon', name: 'sour cream', aisle: 'cheese'},
        {amount: '1 Tablespoon', name: 'oil'},
      ],
      instructions: [
        "Heat 1 tablespoon olive oil in a frying pan, place chicken breast sprinkled with salt and pepper and roast for about 5 minutes on each side. Spread 1 tablespoon mustard over the chicken, add about ¼ cup water add cook covered for a few more minutes.",
        "Cut cooked chicken into thin stings.",
        "Mix the chicken, cheese, cilantro, and the diced avocados.",
        "Spread 1 tablespoon sour cream on each tortilla, add ¼ of the mixture, form a roll.",
        "Heat 1 tablespoon oil into a pan and place all four tortillas on the pan, cook for 2 minutes on medium- high heat. Flip on the other side and cook for another minutes or until the the tortillas are golden",
        "Serve warm.",
      ]
    },
    {
      id: 'slow-cooker-french-dip',
      title: 'Slow Cooker French Dip Sandwiches',
      groups: [1],
      serves: 8,
      background: '/images/recipes/slow-cooker-french-dip.jpg',
      ingredients: [
        {amount: '2-3lb', name: 'chuck roast', aisle: 'meat'},
        {amount: '2 cans', name: 'beef broth', aisle: 'soup'},
        {name: 'Hoagies', aisle: 'bread'}
      ],
      instructions: [
        "Place the roast in the crock pot. Pour the Beef Consomme over the roast. Cook on low 8-11 hours or on high 5-7hrs. (Mine was nice and tender in 5.)",
        "When beef is cooked, take it out and shred. Place the shredded meat back in the juice. I let mine sit in there for about 10 minutes to soak up the last of the juices it could.",
        "Serve the beef on buns and with a side of fries or slaw. Use the remaining juice to dip the sandwiches. And heed my warning, one will not be enough! These are delicious!",
      ]
    },
    {
      id: 'baked-chicken-salad',
      title: 'Crispy Baked Chicken w/ Egg and Arugula Salad',
      groups: [1],
      serves: 3,
      prepTime: 10,
      cookTime: 25,
      background: '/images/recipes/baked-chicken-salad.jpg',
      ingredients: [
        {amount: '1', name: 'egg'},
        {amount: '½ cup', name: 'panko', aisle: 'soup'},
        {amount: '½ cup', name: 'breadcrumbs'},
        {amount: '2 Tbsp grated', name: 'Parmesan', aisle: 'cheese'},
        {amount: '¼ tsp', name: 'pepper and salt'},
        {amount: '¼ tsp', name: 'garlic powder'},
        {amount: '1 lb', name: 'chicken breasts', aisle: 'meat'},
        {amount: '1 Tbsp', name: 'olive oil'},
        {amount: '3', name: 'eggs'},
        {name: 'salad ingredients', aisle: 'produce'}
        // Arugula Salad:
        // 5 oz fresh arugula
        // 1 shallot, finely minced
        // 1 tsp Dijon mustard
        // 2 tsp red wine vinegar
        // ¼ cup extra-virgin olive oil
        // 1 tsp sugar
        // 1 tsp honey
        // ¼ tsp salt and freshly ground black pepper
      ],
      instructions: [
        "Preheat oven to 375 F. Fit a wire cooling rack over a baking sheet and mist with nonstick cooking spray; set aside.",
        "In one of two shallow bowls, whisk together the egg and 1 tablespoon water. In the second bowl, combine the panko, breadcrumbs, Parmesan, salt, pepper, and garlic powder. Working one at a time, dredge the chicken in the egg mixture and then in the breadcrumb mixture, coating both sides completely.",
        "Heat the olive oil in a large nonstick skillet over medium-high heat. Once hot, add the chicken and cook 2-3 minutes per side of until golden brown; transfer to the baking sheet. Bake for 20-25 minutes.",
        "Meanwhile, prepare the arugula salad. Whisk together the shallot, Dijon, vinegar, olive oil, sugar, honey, salt and pepper. Drizzle the dressing over the arugula and toss to combine.",
        "With 5 minutes left on the chicken cook time, wipe the skillet clean of any crumbs and return to medium-high heat. Cook the 3 eggs to your liking - over easy, medium, or hard.",
        "To assemble, plate each chicken breast and top with 1 egg and ⅓ of the salad mixture. Serve immediately.",
      ]
    },
    {
      id: 'chicken-asparagus-stir-fry',
      title: 'Chicken Asparagus Stir Fry',
      groups: [1],
      serves: 4,
      background: '/images/recipes/chicken-asparagus-stir-fry.jpg',
      ingredients: [
        {amount: '1 1/2 pounds cubed', name: 'chicken breast', aisle: 'meat'},
        {name: 'Kosher salt, to taste'},
        {amount: '1/2 cup', name: 'chicken broth', aisle: 'soup'},
        {amount: '2 tablespoons', name: 'soy sauce'},
        {amount: '2 teaspoons', name: 'cornstarch'},
        {amount: '2 tablespoons', name: 'water'},
        {amount: '1 tbsp', name: 'canola or grapeseed oil, divided'},
        {amount: '1 bunch', name: 'asparagus', aisle: 'produce'},
        {amount: '6 cloves', name: 'garlic'},
        {amount: '1 tbsp', name: 'fresh ginger'},
        {amount: '3 tablespoons fresh', name: 'lemon juice', aisle: 'produce'},
        {name: 'fresh black pepper, to taste'},
      ],
      instructions: [
        "Lightly season the chicken with salt. In a small bowl, combine chicken broth and soy sauce. In a second small bowl combine the cornstarch and water and mix well to combine.",
        "Heat a large non-stick wok over medium-high heat, when hot add 1 teaspoon of the oil, then add the asparagus and cook until tender-crisp, about 3 to 4 minutes.  Add the garlic and ginger and cook until golden, about 1 minute. Set aside.",
        "Increase the heat to high, then add 1 teaspoon of oil and half of the chicken and cook until browned and cooked through, about 4 minutes on each side. Remove and set aside and repeat with the remaining oil and chicken. Set aside.",
        "Add the soy sauce mixture; bring to a boil and cook about 1-1/2 minutes. Add lemon juice and cornstarch mixture and stir well, when it simmers return the chicken and asparagus to the wok and mix well, remove from heat and serve.",
      ]
    },
    {
      id: 'white-chicken-chili',
      title: 'White Chicken Chili and Cornbread',
      groups: [1],
      prepTime: 20,
      cookTime: 36,
      serves: 6,
      background: '/images/recipes/white-chicken-chili.jpg',
      ingredients: [
        {amount: '1 lb boneless skinless diced', name: 'chicken thighs', aisle: 'meat'},
        {amount: '1 small', name: 'onion', aisle: 'produce'},
        {amount: '1 tbsp', name: 'olive oil'},
        {amount: '2 cloves', name: 'garlic'},
        {amount: '2 (14.5 oz) cans', name: 'chicken broth', aisle: 'soup'},
        {amount: '1 (4 oz) can diced', name: 'green chilies', aisle: 'beans'},
        {amount: '1 1/2 tsp', name: 'cumin'},
        {amount: '3/4 tsp', name: 'paprika'},
        {amount: '1/2 tsp', name: 'dried oregano'},
        {amount: '1/2 tsp', name: 'ground coriander'},
        {amount: '1/4 tsp', name: 'cayenne pepper'},
        {name: 'salt and freshly ground black pepper, to taste'},
        {amount: '1 (8 oz) pkg', name: 'cream cheese', aisle: 'cheese'},
        {amount: '1 1/4 cup', name: 'fresh corn (frozen works too)', aisle: 'freezer'},
        {amount: '2 (15 oz) cans', name: 'cannellini beans', aisle: 'beans'},
        {amount: '1 Tbsp', name: 'fresh lime juice'},
        {name: 'chopped fresh cilantro, for serving'},
        {name: 'shredded Monterrey Jack cheese, for serving'},
        {name: 'cornbread'},
      ],
      instructions: [
        "Heat olive oil in a 6 quart enameled dutch oven over medium-high heat. Once oil is hot add chicken and diced onion and saute until chicken is no longer pink, about 6 minutes. Add garlic and saute 30 seconds longer. Add chicken broth, green chilies, cumin, paprika, oregano, coriander, cayenne pepper and season with salt and pepper to taste. Bring mixture just to a boil then reduce heat and simmer 15 minutes.",
        "Add Neufchatel cheese and stir until nearly melted (it will break down in little bits and will appear to look like separated cheese but it will eventually melt). Stir in corn, and 1 can of Cannellini beans, then process 3/4 of the remaining beans along with 1/4 cup broth from the soup in a food processor until pureed, add bean mixture to soup along with remaining 1/4 can of beans (you can skip the pureeing step and just add the beans directly to soup, the soup just won't be quite as creamy). Simmer about 15 minutes longer. Mix in fresh lime juice and serve with Monterrey Jack cheese, chopped cilantro and tortilla chips for dipping if desired.",
      ]
    },
    {
      id: 'ramen',
      title: 'Ramen',
      groups: [1],
      serves: 4,
      prepTime: 10,
      cookTime: 20,
      background: '/images/recipes/ramen.jpg',
      ingredients: [
        {amount: '1 tablespoon', name: 'sesame oil', aisle: 'baking'},
        {amount: '4 cloves', name: 'garlic', aisle: 'produce'},
        {amount: '1 tablespoon', name: 'freshly grated ginger'},
        {amount: '4 cups', name: 'chicken broth', aisle: 'soup'},
        {amount: '4 ounces', name: 'shiitake mushrooms', aisle: 'produce'},
        {amount: '1 tablespoon', name: 'soy sauce, or more, to taste'},
        {amount: '3 (5.6-ounce) packages refrigerated', name: 'Yaki-Soba', aisle: 'soup'},
        {amount: '3 cups', name: 'baby spinach', aisle: 'produce'},
        {amount: '1', name: 'carrot', aisle: 'produce'},
        {amount: '2 tablespoons chopped', name: 'chives', aisle: 'produce'}
      ],
      instructions: [
        "Heat 1 tablespoon sesame oil in a large stockpot or Dutch oven over medium heat. Add garlic and ginger, and cook, stirring frequently, until fragrant, about 1-2 minutes.",
        "Whisk in chicken broth, mushrooms, soy sauce and 3 cups water.",
        "Bring to a boil; reduce heat and simmer until mushrooms have softened, about 10 minutes. Stir in Yaki-Soba until loosened and cooked through, about 2-3 minutes.",
        "Stir in spinach, carrot and chives until the spinach begins to wilt, about 2 minutes.",
        "Serve immediately.",
      ]
    },
    {
      id: 'one-pot-mac',
      title: 'One Pot Creamy Mac and Cheese with Salad',
      serves: 8,
      prepTime: 5,
      cookTime: 20,
      background: '/images/recipes/one-pot-mac.jpg',
      ingredients: [
        {amount: '4 tbsp', name: 'unsalted butter'},
        {amount: '6 tbsp', name: 'flour'},
        {amount: '3 cups of', name: 'milk'},
        {amount: '2 cups of', name: 'water'},
        {amount: '1 tsp', name: 'salt'},
        {name: 'Black pepper'},
        {amount: '½lb / 250g / 3 cups of', name: 'macaroni', aisle: 'pasta'},
        {amount: '2 cups (150g / 5oz)', name: 'shredded cheddar', aisle: 'cheese'},
        {amount: '1 cup (75g / 2.5 oz)', name: 'shredded provolone', aisle: 'cheese'},
        {section: 'Topping'},
        {amount: '¼ cup', name: 'panko'},
        {amount: '¼ cup', name: 'parmesan', aisle: 'cheese'},
        {amount: '½ tbsp', name: 'fresh parsley', aisle: 'produce'},
        {name: 'salad ingredients', aisle: 'produce'}
      ],
      instructions: [
        "Preheat the oven to 180C/350F.",
        "Melt the butter in a deep fry pan or skillet (Note 4) over medium heat. (Note 5)",
        "Add the flour and stir until combined so a thick paste forms ('roux'). Cook, stirring constantly, for 1 minute.",
        "Add half the milk and use a whisk to dissolve the roux into the milk. It will thicken quickly, then add the remaining milk. Whisk in small circles, rotating around the pan, to dissolve all the roux into the milk.",
        "Add the water, salt and 5 grinds of pepper, then turn the heat up to medium high. Whisk leisurely so the bottom doesn't stick to the pan. When the white sauce starts to steam and thickens such that you can see it coating the edges of the pan (around 2 to 3 minutes), add the macaroni.",
        "Turn the heat down to medium and stir gently with a wooden spoon to mix the macaroni through and ensure the bottom doesn't stick. Cook it for 1 minute. Be sure not to cook it for longer than this after adding the macaroni - this really impacts the 'sauciness' of the dish and ensuring the macaroni isn't overcooked.",
        "Cover the fry pan (Note 5), then transfer it immediately to the oven on the middle shelf.",
        "Bake for 12 minutes, then remove from the oven. It will seem like there is too much sauce but it reduces and thickens in the next steps. The pasta should be just cooked (al dente). It will continue cooking from the residual heat.",
        "Turn the oven off and turn the grill/broiler on high.",
        "Stir through the cheese, just enough to disperse it through the macaroni. As you stir, this will melt the cheese and thicken the sauce. Don't stir too much because otherwise the sauce will thicken too much due to the evaporation.",
        "Sprinkle over the panko and parmesan cheese, then place under the grill/broiler for a few minutes to brown.",
        "Remove from the grill/broiler and let it rest for 5 minutes before serving."
      ]
    },
    {
      id: 'souvlaki-kabobs',
      title: 'Chicken Souvlaki Kabobs and Tabbouleh',
      serves: 8,
      background: '/images/recipes/souvlaki-kabobs.jpg',
      ingredients: [
        {amount: '1 lbs', name: 'chicken breast', aisle: 'meat'},
        {section: 'Marinade'},
        {amount: '4 tablespoons', name: 'olive oil'},
        {amount: '2 tablespoons', name: 'lemon juice'},
        {amount: '2 cloves', name: 'garlic, minced'},
        {amount: '1 teaspoon', name: 'dried oregano'},
        {amount: '½ teaspoon', name: 'fine grain sea salt'},
        {name: 'Ground black pepper to taste'},
        {section: 'Tzatziki sauce '},
        {amount: '1 container (6 oz)', name: 'plain Greek yogurt', aisle: 'dairy'},
        {amount: '1 small', name: 'cucumber', aisle: 'produce'},
        {amount: '3 tablespoons', name: 'lemon juice', aisle: 'produce'},
        {amount: '1 teaspoon', name: 'fine grain sea salt'},
        {amount: '1 tablespoon', name: 'fresh mint', aisle: 'produce'},
        {section: 'Tabbouleh'},
        {amount: '1 cup cooked', name: 'quinoa', aisle: 'pasta'},
        {amount: '1 can', name: 'garbanzo beans', aisle: 'beans'},
        {amount: '½ pound', name: 'cucumbers'},
        {amount: '2 cups', name: 'cherry tomatoes', aisle: 'produce'},
        {amount: '1 cup finely chopped', name: 'green onion,', aisle: 'produce'},
        {amount: '1 cup chopped', name: 'fresh Italian flat-leaf parsley leaves'},
        {amount: '1 cup chopped', name: 'mint leaves'},
        {amount: '⅓ cup fresh squeezed', name: 'lemon juice'},
        {amount: '⅓ cup', name: 'extra virgin olive oil'},
        {name: 'kosher salt and freshly ground black pepper'}
      ],
      instructions: [
        "In a small bowl stir olive oil, lemon juice, garlic, oregano, salt and black pepper.",
        "In a shallow sealable container or in a large Ziplock bag, combine chicken chunks and marinade. Cover or seal and marinate in the refrigerator for 1 to 2 hours (marinate overnight for fullest flavor.)",
        "In the meantime make tzatziki sauce by combining all ingredients in a small bowl. Set aside.",
        "Remove chicken chunks from the marinade and skewer onto bamboo sticks that have been soaked in water for 5 minutes. Discard unused marinade.",
        "Heat a grill or a grill pan to medium-high (if you’re using an outdoor grill lightly oil the grill grates.) ",
        "Grill the chicken kebabs, until cooked through and nicely browned on all sides and chicken is no longer pink in the center, about 8 minutes per side.",
        "Serve with tzatziki sauce.",
        "Tabbouleh:",
        "Place the cooked quinoa in a large bowl. Add the chickpeas, Persian cucumbers, cherry tomatoes, green onion, parsley and mint and toss. In a small bowl whisk the lemon juice with the olive oil and season with kosher salt and freshly ground black pepper. Pour over the ingredients in the large bowl and mix well. Season with more kosher salt and freshly ground pepper to taste. Serve immediately or put in the fridge for flavors to meld.",
      ]
    },
    {
      id: 'sausage-kale-soup',
      title: 'Sausage, White Bean, Kale Soup and Garlic Bread',
      serves: 8,
      background: '/images/recipes/sausage-kale-soup.jpg',
      ingredients: [
        {amount: '4', name: 'sausage links', aisle: 'produce'},
        {amount: '1 large', name: 'green bell pepper', aisle: 'produce'},
        {amount: '4 cups', name: 'chicken broth', aisle: 'soup'},
        {amount: '1 (14.5 oz) can', name: 'cannellini beans', aisle: 'beans'},
        {amount: '4 cups chopped', name: 'kale', aisle: 'produce'},
        {amount: 'juice from half a', name: 'lime', aisle: 'produce'},
        {name: 'coarse salt and freshly ground pepper, to taste'},
        {name: 'french bread', aisle: 'bread'}
      ],
      instructions: [
        "Take the sausages and pinch off little sections, rolling them into little balls. There’s just no other way around saying that.",
        "Add the balls to a large skillet and bring to a medium-high heat. Brown all over, roughly 7 minutes. Add the green bell pepper (and a tad bit of oil if needed), and sauté until slightly tender, 3 minutes.",
        "Add the stock, beans and kale. Bring to a boil, reduce heat and simmer for about 10 minutes. Add a nice pinch of salt and pepper, to taste.",
        "Now squeeze in that lime juice. Right? It’s nice. Taste it again. Done.",
        "Serve with crusty bread or crackers!",
      ]
    },
    {
      id: 'turkey-panini',
      title: 'Turkey and Tomato Panini with Salad',
      serves: 1,
      background: '/images/recipes/turkey-panini.jpg',
      ingredients: [
        {amount: '1/2 tbsp', name: 'mayo'},
        {amount: '1/2 tbsp', name: 'plain Greek yogurt', aisle: 'dairy'},
        {name: 'lemon juice', aisle: 'produce'},
        {amount: '1 tbsp chopped', name: 'fresh basil'},
        {amount: '1/2 tbsp', name: 'parmesan', aisle: 'cheese'},
        {name: 'salt & freshly-ground pepper'},
        {amount: '2 slices', name: 'fancy bread', aisle: 'bread'},
        {amount: '2 ounces oven-roasted', name: 'deli turkey', aisle: 'meat'},
        {amount: '1 roma', name: 'tomato', aisle: 'produce'},
      ],
      instructions: [
        "In a small bowl, mix together the mayo, yogurt, lemon juice, basil, and cheese. Season to taste with salt and pepper.",
        "Spread 1/2 of the mixture on each slice of bread. Arrange the tomato slices on one piece, and the turkey on the other. Close the sandwich.",
        "Press in a panini press for 3 minutes, until golden brown. (You could also do this in a pan just like a grilled cheese.)",
      ]
    },
    {
      id: 'grilled-steaks',
      title: 'Grilled Steaks with Marinade, Rice and Parmesan Roasted Cauliflower',
      serves: 4,
      background: '/images/recipes/grilled-steaks.jpeg',
      ingredients: [
        {name: 'Steak', aisle: 'meat'},
        {section: 'Marinade'},
        {amount: '1/3 cup', name: 'soy sauce'},
        {amount: '1/2 cup', name: 'olive oil'},
        {name: 'lemon juice', aisle: 'produce'},
        {amount: '1/4 cup', name: 'Worcestershire sauce'},
        {amount: '1 1/2 tablespoons', name: 'garlic powder'},
        {amount: '3 tablespoons', name: 'dried basil'},
        {amount: '1 1/2 tablespoons', name: 'dried parsley flakes'},
        {name: '1 teaspoon white pepper'},
        {amount: '1 teaspoon', name: 'red pepper flakes'},
        {amount: '2 cloves', name: 'garlic, minced'},
        {section: 'Cauliflower'},
        {amount: '8 oz', name: 'cauliflower', aisle: 'produce'},
        {amount: '2 tablespoons', name: 'melted butter'},
        {amount: '1 tablespoon', name: 'olive oil'},
        {name: 'Pinch of salt'},
        {amount: '3 light dashes of', name: 'ground black pepper'},
        {amount: '1/2 cup', name: 'parmesan', aisle: 'produce'},
        {amount: '1 teaspoon chopped', name: 'parsley leaves'},
      ],
      instructions: [
        "Marinade:",
        "Whisk all of the ingredients in a large bowl until thoroughly mixed.",
        "Marinate your steaks overnight for the most flavor.",
        "Cauliflower:",
        "Preheat oven to 400°.",
        "Toss the sliced cauliflower with the butter and olive oil. Season with salt and black pepper. Transfer the cauliflower to a baking sheet, in single layer, roast until almost tender about 20-30 minutes. Remove from the oven and sprinkle the grated Parmesan and chopped parsley leaves on top of the cauliflower, roast again until the cheese melts and slightly crusty, about 5 minutes. Remove from oven and serve immediately.",
      ]
    },
    {
      id: 'pulled-pork',
      title: 'Pulled Pork Sandwiches with Sweet Potato Fries',
      serves: 8,
      background: '/images/recipes/pulled-pork.jpg',
      ingredients: [
        {name: 'buns', aisle: 'bread'},
        {amount: '1 can', name: 'root beer', aisle: 'postBread'},
        {name: 'pork shoulder', aisle: 'meat'},
        {name: 'bbq sauce', aisle: 'pasta'},
        {name: 'frozen sweet potato fries', aisle: 'freezer'},
      ],
      instructions: [
        "Make it delicious.",
        "Put it in your belly."
      ]
    }
  ]
})

export default Recipe;


 //plans
 // get rid of the print button ~
 // main page and groups page will have a plus button
 // to add a new group, and also have a list button above it to go to the current list
 // you can add anything to that list and then you can add a group to the list too
 // this list will persist until you mark it as completed, and then it will still exist as
 // the 'last list' so you can reference it during the week for meals.

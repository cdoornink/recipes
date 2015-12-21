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
        {name: 'yellow onion', amount: '1 medium', aisle: 'produce'},
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
        {amount: '7oz', name: 'bacon', aisle: 'meat'},
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
        {amount: '1 cup', name: 'chicken breasts', aisle: 'meat'},
        {amount: '1 cup', name: 'bacon', aisle: 'cheese'},
        {amount: '1/3 cup', name: 'thinly sliced red onions', aisle: 'produce'},
        {amount: '2/3 cup', name: 'mozzarella cheese', aisle: 'dairy'},
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
        {amount: '1/2 loaf', name: 'onion', aisle: 'produce'},
        {amount: '2', name: 'lettuce', aisle: 'produce'},
        {amount: '1 Tbsp', name: 'tomato', aisle: 'produce'},
        {amount: '2 Tbsp', name: 'avocado', aisle: 'produce'},
        {amount: 'Pinch of', name: 'small corn tortillas', aisle: 'post-bread'},
        {amount: 'handfuls of', name: 'corn chips', aisle: 'post-bread'},
        {name: 'chicken breasts', aisle: 'meat'},
        {name: 'sour cream / yogurt', aisle: 'cheese'},
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
        {amount: '1 bunch', name: 'Basil Leaves', aisle: 'produce'},
        {amount: '1 bunch', name: 'Parsley', aisle: 'produce'},
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
        {amount: 'Handful of', name: 'coriander (cilantro)', aisle: 'produce'},
        {amount: '4 rashers of', name: 'bacon', aisle: 'meat'},
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
        {amount: '1 pound', name: 'chicken breasts', list: 'meat'},
        {name: 'Olive oil'},
        {amount: '2 cloves', name: 'garlic'},
        {amount: '1 tablespoon', name: 'lemon juice', list: 'produce'},
        {amount: '1 teaspoon', name: 'salt'},
        {amount: 'Pinch or two', name: 'black pepper'},
        {amount: '½ teaspoon', name: 'dried oregano'},
        {amount: '½ teaspoon', name: 'ground cumin'},
        {amount: '¼ teaspoon', name: 'coriander'},
        {amount: '¼ teaspoon', name: 'paprika'},
        {name: 'pita bread', list: 'bread'},
        {name: 'arugula', list: 'produce'},
        {name: 'tomatoes', list: 'produce'},
        {section: 'sauce'},
        {amount: '½ cup', name: 'mayonnaise'},
        {amount: '½ cup', name: 'plain greek yogurt', list: 'dairy'},
        {amount: '3 cloves', name: 'garlic'},
        {amount: '1 tablespoon', name: 'tahini', list: 'pasta'},
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
        {amount: '3 cups', name: 'chicken breast', list: 'meat'},
        {amount: '2 tablespoons', name: 'unsalted butter'},
        {amount: '2 tablespoons', name: 'olive oil '},
        {amount: '1', name: 'onion', list: 'produce'},
        {amount: '4', name: 'celery', list: 'produce'},
        {amount: '4', name: 'carrots', list: 'produce'},
        {amount: '1 teaspoon', name: 'minced garlic'},
        {amount: '2', name: 'bay leaves'},
        {name: 'Kosher salt and freshly ground black pepper'},
        {amount: '2 quarts', name: 'chicken broth', list: 'soup'},
        {amount: '2 cups', name: 'wide egg noodles', list: 'pasta'},
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
        {amount: '24 oz', name: 'chicken breast', list: 'meat'},
        {amount: '14.4 oz', name:'diced tomatoes with mild green chilies', list: 'beans'},
        {amount: '15 oz', name: 'black beans', list: 'beans'},
        {amount: '8 oz', name: 'frozen corn', list: 'freezer'},
        {amount: '1/4 cup', name:'fresh cilantro', list: 'produce'},
        {amount: '14.4 oz', name:'chicken broth', list: 'soup'},
        {amount: '3', name: 'scallions', list: 'produce'},
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
        {amount: '1 medium', name: 'onion', list: 'produce'},
        {amount: '3 stalks', name: 'celery', list: 'produce'},
        {amount: '3', name: 'carrots', list: 'produce'},
        {amount: '2 Tablespoons', name: 'garlic'},
        {amount: '2 Cups', name: 'chicken breast', list: 'meat'},
        {amount: '2 Cups', name: 'white rice', list: 'rice'},
        {amount: '16 oz', name: 'wild rice', list: 'rice'},
        {amount: '1 teaspoon', name: 'salt'},
        {amount: '1/2 teaspoon', name: 'black pepper'},
        {amount: '1/4 teaspoon', name: 'garlic salt'},
        {section: 'cheese sauce'},
        {amount: '4 Tablespoons', name: 'butter'},
        {amount: '1/4 Cup', name: 'all purpose flour'},
        {amount: '1/4 teaspoon', name: 'salt'},
        {amount: '1/4 teaspoon', name: 'black pepper'},
        {amount: '2 Cups', name: 'chicken broth', list: 'soup'},
        {amount: '2 Cups', name: 'cheddar cheese', list: 'cheese'},
        {amount: 'Top with 1 1/2 Cups shredded', name: 'cheddar cheese'},
      ],
      instructions: [
        "Cook the chicken and rice.",
        "Preheat oven to 350 degrees F.  Heat oil into a medium dutch oven or pot over medium heat.  Saute onion, celery and carrots until softened, about 10 minutes.  Stir in garlic and cook for 1 minute.  Stir in chicken, both rices, salt, pepper and garlic salt.  Reduce heat to low.",
        "To prepare cheese sauce melt butter into a medium saucepan over medium high heat.  Whisk in flour, salt and pepper then slowly pour in chicken broth whisking continuously.  Whisk until thick and nearly boiling then stir in cheese until melted.  Pour cheese sauce into cooked rice mixture then transfer to a 9×13 inch baking dish. Top with additional cheddar cheese and bake for 25-30 minutes or until cheese is melted through.  Serve.",
      ]
    },

  ]
})

export default Recipe;

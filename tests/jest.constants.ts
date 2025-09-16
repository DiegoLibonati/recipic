import fs from "fs";
import path from "path";

import { Meal } from "@src/entities/vite-env";

const INITIAL_HTML: string = fs.readFileSync(
  path.resolve(__dirname, "../index.html"),
  "utf8"
);

export const OFFICIAL_BODY = INITIAL_HTML.match(
  /<body[^>]*>([\s\S]*?)<\/body>/i
)![1];

export const mockMealsRequest: { meals: Meal[] } = {
  meals: [
    {
      idMeal: "52914",
      strMeal: "Boulangère Potatoes",
      strCategory: "Side",
      strArea: "French",
      strInstructions:
        "Heat oven to 200C/fan 180C/gas 6. Fry the onions and thyme sprigs in the oil until softened and lightly coloured (about 5 mins).\r\nSpread a layer of potatoes over the base of a 1.5-litre oiled gratin dish. Sprinkle over a few onions (see picture, above) and continue layering, finishing with a layer of potatoes. Pour over the stock and bake for 50-60 mins until the potatoes are cooked and the top is golden and crisp.",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/qywups1511796761.jpg",
      strTags: "SideDish",
      strYoutube: "https://www.youtube.com/watch?v=gcXPruv1Mjg",
      strIngredient1: "Onions",
      strIngredient2: "Thyme",
      strIngredient3: "Olive Oil",
      strIngredient4: "Potatoes",
      strIngredient5: "Vegetable Stock",
      strIngredient6: "",
      strIngredient7: "",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strIngredient16: "",
      strIngredient17: "",
      strIngredient18: "",
      strIngredient19: "",
      strIngredient20: "",
      strMeasure1: "2 finely chopped",
      strMeasure2: "sprigs of fresh",
      strMeasure3: "2 tbs",
      strMeasure4: "1.5kg",
      strMeasure5: "425g",
      strMeasure6: "",
      strMeasure7: "",
      strMeasure8: "",
      strMeasure9: "",
      strMeasure10: "",
      strMeasure11: "",
      strMeasure12: "",
      strMeasure13: "",
      strMeasure14: "",
      strMeasure15: "",
      strMeasure16: "",
      strMeasure17: "",
      strMeasure18: "",
      strMeasure19: "",
      strMeasure20: "",
      strSource: "https://www.bbcgoodfood.com/recipes/5056/boulangre-potatoes",
    },
  ],
};

export const mockMealRequestSearchByName: { meals: Meal[] } = {
  meals: [
    {
      idMeal: "52967",
      strMeal: "Home-made Mandazi",
      strCategory: "Breakfast",
      strArea: "Kenyan",
      strInstructions:
        "This is one recipe a lot of people have requested and I have tried to make it as simple as possible and I hope it will work for you. Make sure you use the right flour which is basically one with raising agents. Adjust the amount of sugar to your taste and try using different flavours to have variety whenever you have them.\r\nYou can use Coconut milk instead of regular milk, you can also add desiccated coconut to the dry flour or other spices like powdered cloves or cinnamon.\r\nFor “healthy looking” mandazis do not roll the dough too thin before frying and use the procedure I have indicated above.\r\n\r\n1. Mix the flour,cinnamon and sugar in a suitable bowl.\r\n2. In a separate bowl whisk the egg into the milk\r\n3. Make a well at the centre of the flour and add the milk and egg mixture and slowly mix to form a dough.\r\n4. Knead the dough for 3-4 minutes or until it stops sticking to the sides of the bowl and you have a smooth surface.\r\n5. Cover the dough with a damp cloth  and allow to rest for 15 minutes.\r\n6. Roll the dough on a lightly floured surface into a 1cm thick piece.\r\n7. Using a sharp small knife, cut the dough into the desired size setting aside ready for deep frying.\r\n8. Heat your oil in a suitable pot and gently dip the mandazi pieces to cook until light brown on the first side then turn to cook on the second side.\r\n9. Serve them warm or cold",
      strMealThumb:
        "https://www.themealdb.com/images/media/meals/thazgm1555350962.jpg",
      strTags: "Baking,Breakfast,Egg,Warm,Snack",
      strYoutube: "",
      strIngredient1: "Self-raising Flour",
      strIngredient2: "Sugar",
      strIngredient3: "Eggs",
      strIngredient4: "Milk",
      strIngredient5: "",
      strIngredient6: "",
      strIngredient7: "",
      strIngredient8: "",
      strIngredient9: "",
      strIngredient10: "",
      strIngredient11: "",
      strIngredient12: "",
      strIngredient13: "",
      strIngredient14: "",
      strIngredient15: "",
      strIngredient16: "",
      strIngredient17: "",
      strIngredient18: "",
      strIngredient19: "",
      strIngredient20: "",
      strMeasure1: "750g",
      strMeasure2: "6 tablespoons",
      strMeasure3: "2",
      strMeasure4: "1 cup ",
      strMeasure5: " ",
      strMeasure6: " ",
      strMeasure7: " ",
      strMeasure8: " ",
      strMeasure9: " ",
      strMeasure10: " ",
      strMeasure11: " ",
      strMeasure12: " ",
      strMeasure13: " ",
      strMeasure14: " ",
      strMeasure15: " ",
      strMeasure16: " ",
      strMeasure17: " ",
      strMeasure18: " ",
      strMeasure19: " ",
      strMeasure20: " ",
      strSource: "http://chef-raphael.com/home-made-mandazi-recipe/#more-106",
    },
  ],
};

export const mockMeal: Meal = mockMealsRequest.meals[0];
export const mockMealByName: Meal = mockMealRequestSearchByName.meals[0];

export const mocksLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
};

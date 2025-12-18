const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// --- 🏆 THE HACKATHON "CHEAT SHEET" ---
// These recipes are stored LOCALLY. They will ALWAYS work perfectly.
const localRecipes = [
    {
        idMeal: "local_1",
        strMeal: "Paneer Butter Masala",
        strMealThumb: "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Instant-Pot-Paneer-Butter-Masala-Recipe.jpg",
        strInstructions: "1. Fry paneer cubes until golden.\n2. Sauté onions, ginger, garlic paste.\n3. Add tomato puree and cook until oil separates.\n4. Add cashews, cream, and spices (garam masala, turmeric).\n5. Mix in paneer and simmer. Garnish with coriander.",
        strYoutube: "https://www.youtube.com/watch?v=R0Tf1jL36gQ", // Chef Ranveer Brar
        strIngredient1: "Paneer", strMeasure1: "200g",
        strIngredient2: "Tomato Puree", strMeasure2: "1 cup",
        strIngredient3: "Fresh Cream", strMeasure3: "1/2 cup",
        strIngredient4: "Butter", strMeasure4: "2 tbsp"
    },
    {
        idMeal: "local_2",
        strMeal: "Dal Tadka",
        strMealThumb: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/04/dal-tadka-recipe.jpg",
        strInstructions: "1. Boil Toor Dal with turmeric.\n2. In a pan, heat ghee. Add mustard seeds, cumin, garlic, and red chilies.\n3. Sauté onions and tomatoes.\n4. Pour this 'Tadka' over the boiled dal.\n5. Serve hot with Jeera Rice.",
        strYoutube: "https://www.youtube.com/watch?v=p79tS4i6DqM",
        strIngredient1: "Toor Dal", strMeasure1: "1 cup",
        strIngredient2: "Ghee", strMeasure2: "2 tbsp",
        strIngredient3: "Garlic", strMeasure3: "5 cloves",
        strIngredient4: "Dry Red Chilli", strMeasure4: "2 pcs"
    },
    {
        idMeal: "local_3",
        strMeal: "Chole Bhature",
        strMealThumb: "https://media.vogue.in/wp-content/uploads/2020/08/chole-bhature-recipe-1920x1080.jpg",
        strInstructions: "1. Soak chickpeas overnight and boil with tea bags (for color).\n2. Cook with onion-tomato masala and Chole Masala powder.\n3. For Bhature: Knead maida with yogurt and ferment for 2 hours.\n4. Deep fry the bhature until puffy.",
        strYoutube: "https://www.youtube.com/watch?v=uK48cK2kH24",
        strIngredient1: "Chickpeas (Chole)", strMeasure1: "2 cups",
        strIngredient2: "Maida", strMeasure2: "2 cups",
        strIngredient3: "Yogurt", strMeasure3: "1/2 cup",
        strIngredient4: "Chole Masala", strMeasure4: "2 tbsp"
    },
    {
        idMeal: "local_4",
        strMeal: "Chicken Biryani",
        strMealThumb: "https://www.licious.in/blog/wp-content/uploads/2020/12/Hyderabadi-Chicken-Biryani.jpg",
        strInstructions: "1. Marinate chicken with yogurt and spices.\n2. Cook Basmati rice until 70% done.\n3. Layer chicken and rice in a pot.\n4. Add saffron milk and fried onions.\n5. Cook on 'Dum' (low heat/sealed) for 20 mins.",
        strYoutube: "https://www.youtube.com/watch?v=95BCU1n268w",
        strIngredient1: "Chicken", strMeasure1: "1 kg",
        strIngredient2: "Basmati Rice", strMeasure2: "500g",
        strIngredient3: "Yogurt", strMeasure3: "1 cup",
        strIngredient4: "Saffron", strMeasure4: "Pinch"
    },
    {
        idMeal: "local_5",
        strMeal: "Masala Dosa",
        strMealThumb: "https://vismaifood.com/new-thumb/masala-dosa-recipe-how-to-make-perfect-masala-dosa-batter-at-home-mysore-masala-dosa.jpg",
        strInstructions: "1. Ferment rice and urad dal batter overnight.\n2. Make potato bhaji with mustard seeds and turmeric.\n3. Spread batter on hot tawa.\n4. Add butter and potato filling.\n5. Roll and serve with chutney.",
        strYoutube: "https://www.youtube.com/watch?v=CCab5oh0Zwc",
        strIngredient1: "Dosa Batter", strMeasure1: "1 bowl",
        strIngredient2: "Potato", strMeasure2: "3 boiled",
        strIngredient3: "Onion", strMeasure3: "2 chopped",
        strIngredient4: "Mustard Seeds", strMeasure4: "1 tsp"
    }
];

// --- SEARCH ROUTE ---
app.get('/recipes/:term', async (req, res) => {
    try {
        let term = req.params.term.toLowerCase().trim();

        // 1. CHECK LOCAL DATA FIRST (The Hybrid Fix)
        // If the user types "paneer", "dal", "chole", show our custom data
        const localMatches = localRecipes.filter(recipe => 
            recipe.strMeal.toLowerCase().includes(term) || 
            JSON.stringify(recipe).toLowerCase().includes(term)
        );

        // If we found local hits, send them immediately!
        if (localMatches.length > 0) {
            return res.json(localMatches);
        }

        // 2. DICTIONARY FIXES (For API fallback)
        const dictionary = {
            "murg": "chicken",
            "anda": "egg",
            "noodles": "pasta",
            "maggi": "pasta"
        };
        if (dictionary[term]) term = dictionary[term];

        // 3. ASK THE API (Fallback)
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${term}`);
        res.json(response.data.meals || []);

    } catch (error) {
        res.json([]);
    }
});

// --- DETAILS ROUTE ---
app.get('/details/:id', async (req, res) => {
    // 1. Check if it's a local ID (starts with "local_")
    if (req.params.id.startsWith("local_")) {
        const recipe = localRecipes.find(r => r.idMeal === req.params.id);
        return res.json(recipe);
    }

    // 2. Otherwise ask API
    try {
        const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${req.params.id}`);
        res.json(response.data.meals[0]);
    } catch (error) {
        res.status(500).json({ error: "Details not found" });
    }
});

// Keep other routes same...
app.get('/category/:name', async (req, res) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${req.params.name}`);
    res.json(response.data.meals || []);
});
app.get('/cuisine/:name', async (req, res) => {
    const response = await axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${req.params.name}`);
    res.json(response.data.meals || []);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
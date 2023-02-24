import { useEffect, useState } from "react";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Stack, Button, TextField } from "@mui/material";
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function App() {

    /*
    [
    {
        "id": 52950,
        "name": "Szechuan Beef",
        "ingredients": {
            "Sesame Seed Oil": "1 tsp ",
            "Salt": "1/2 tsp",
            "Egg White": "1",
            "Pepper": "1 pinch",
            "Beef": "1/2 lb"
        }
    }
]
    */
    const [matchingRecipes, setMatchingRecipes] = useState([])
    const [availableIngredients, setAvailableIngredients] = useState([])
    const [newIngredient, setNewIngredient] = useState("")

    useEffect(() => {
        // fetch("http://localhost:8080/find?i=Beef&i=Onion")
        //     .then(r => r.json())
        //     .then(json => setMatchingRecipes(json))
    }, [])

    return (
        <Box sx={{
            marginTop: 5,
            marginLeft: 5,
        }}>
            <Typography variant="h4">What u got?</Typography>
            <Box sx={{
                flex: 1,
                flexDirection: "column"
            }}>
                <Stack sx={{
                    maxWidth: 200
                }}>
                    {
                        availableIngredients.map((ingredient, idx) => {
                            return <Typography key={idx} variant="h5">{ingredient}</Typography>
                        })
                    }
                    <TextField
                        id="outlined-basic"
                        label="Ingredient"
                        variant="outlined"
                        value={newIngredient}
                        onChange={(e) => setNewIngredient(e.target.value)}
                    />
                </Stack>
            </Box>
            <Button variant="contained" onClick={handleClickAddIngredient}>Add ingredient</Button>
            <Button variant="contained" onClick={handleClickSeeRecipes}>See Recipes</Button>
            {matchingRecipes && matchingRecipes.map((recipe, idx) => {
                return <Box key={idx}>
                    <Typography variant="h5">{recipe.name}</Typography>
                </Box>
            })}
        </Box>
    );

    function handleClickAddIngredient() {
        setAvailableIngredients(prev => [...prev, newIngredient])
        setNewIngredient("")
    }

    function handleClickSeeRecipes() {
        const query = availableIngredients.map(ingr => {
            return `i=${ingr}`
        }).reduce((a, b) => `${a}&${b}`)
        fetch("http://localhost:8080/find?" + query, {
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        })
            .then(r => r.json())
            .then(json => setMatchingRecipes(json))
    }
}

export default App;

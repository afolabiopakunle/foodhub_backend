import express from "express";
import cors from "cors";
import { sample_foods, sample_tags } from './data';

const app = express();

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"],
}));

app.get('/api/foods', (req, res) => {
    res.send(sample_foods);
});

app.get('/api/foods/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm.toLowerCase();
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm));
    res.send(foods);
});

app.get('/api/foods/tags', (req, res) => {
    res.send(sample_tags);
});

app.get('/api/foods/tags/:tagName', (req, res) => {
    const tagName = req.params.tagName.toLowerCase();
    const foods = sample_foods.filter(food => food.tags.map((tag: string) => tag.toLowerCase()).includes(tagName));
    res.send(foods);
})

const PORT = 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`) )

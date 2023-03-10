import { Router } from "express";
import { sample_foods, sample_tags } from '../data';

const router = Router();

router.get('', (req, res) => {
    res.send(sample_foods);
});

router.get('/search/:searchTerm', (req, res) => {
    const searchTerm = req.params.searchTerm.toLowerCase();
    const foods = sample_foods.filter(food => food.name.toLowerCase().includes(searchTerm));
    res.send(foods);
});

router.get('/tags', (req, res) => {
    res.send(sample_tags);
});

router.get('/tags/:tagName', (req, res) => {
    const tagName = req.params.tagName.toLowerCase();
    const foods = sample_foods.filter(food => food.tags.map((tag: string) => tag.toLowerCase()).includes(tagName));
    res.send(foods);
});

router.get('/:foodId', (req, res) => {
    const foodId = req.params.foodId;
    const food = sample_foods.find(food => food.id == foodId);
    res.send(food);
});

export default router;

import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";

import { sample_users } from './data';
import foodRouter from './routers/foodRouter';

const app = express();

app.use(express.json());

app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"],
}));


app.use("/api/foods", foodRouter);

app.post('/api/users/login', (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password )

    if(user) {
        res.send(generateTokenResponse(user));
    } else {
        res.status(400).send('User is not valid')
    }
});

const generateTokenResponse = (user: any) => {
    const token = jwt.sign({
        email: user.email,
        isAdmin: user.isAdmin
    }, "SomeRandomText", {
        expiresIn: '30d',
    });

    user.token = token;
    return user;
}

const PORT = 3000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`) )

const bcrypt = require('bcrypt');

const usersRouter = require('express').Router();
const User = require('../models/user');

usersRouter.get('/', async (_request, response) => {
    const users = await User.find({}).populate('recipes', { title: 1, ingredients: 1, method: 1, cookingTime: 1 });
    response.json(users);
});

usersRouter.post('/', async (request, response) => {
    const { username, name, password } = request.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    if (!username || !password) {
        return response.status(400).json({ error: 'username and password are required' });
    }

    if (username.length < 3 || password.length < 3) {
        return response.status(400).json({ error: 'username and password must have at least 3 characters' });
    }

    const user = new User({
        username,
        name,
        passwordHash,
    });

    const savedUser = await user.save();

    response.status(201).json(savedUser);
});

module.exports = usersRouter;

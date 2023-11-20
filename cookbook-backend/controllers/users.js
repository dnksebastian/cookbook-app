const bcrypt = require('bcrypt');

const mongoose = require('mongoose');
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

usersRouter.delete('/:id', async (request, response) => {
    const id = request.params.id;
    const user = request.user;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return response.status(404).json({ error: 'Invalid user ID' });
    }

    const userToDelete = await User.findById(id);

    if (!userToDelete) {
        return response.status(410).end();
    }

    if (user && userToDelete.id.toString() === user.id.toString()) {
        await User.findByIdAndRemove(id);
        response.status(204).end();
    } else {
        response.status(401).json({ error: 'Deleting not possible - user unauthorized' });
    }
});

module.exports = usersRouter;

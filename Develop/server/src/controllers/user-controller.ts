import type { Request, Response } from 'express';
import User from '../models/User';
import { signToken } from '../services/auth';

// GET a single user by ID or username
export const getSingleUser = async (req: Request, res: Response) => {
  try {
    const userIdOrUsername = req.user?._id || req.params.id || req.params.username;
    const foundUser = await User.findOne({
      $or: [{ _id: userIdOrUsername }, { username: userIdOrUsername }],
    });

    if (!foundUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(foundUser);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Server error', error: err });
  }
};

// POST to create a new user
export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body);
    const token = signToken(user.username, user.email, user._id);

    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Could not create user', error: err });
  }
};

// POST to log in a user
export const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      $or: [{ username: req.body.username }, { email: req.body.email }],
    });

    if (!user) {
      return res.status(400).json({ message: "Can't find this user" });
    }

    const correctPw = await user.isCorrectPassword(req.body.password);
    if (!correctPw) {
      return res.status(400).json({ message: 'Wrong password!' });
    }

    const token = signToken(user.username, user.email, user._id);
    return res.json({ token, user });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'Login error', error: err });
  }
};

// PUT to save a book to user's savedBooks array
export const saveBook = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $addToSet: { savedBooks: req.body } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Error saving book', error: err });
  }
};

// DELETE a book from user's savedBooks array
export const deleteBook = async (req: Request, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.user._id },
      { $pull: { savedBooks: { bookId: req.params.bookId } } },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Couldn't find user with this id!" });
    }

    return res.json(updatedUser);
  } catch (err) {
    console.error(err);
    return res.status(400).json({ message: 'Error deleting book', error: err });
  }
};

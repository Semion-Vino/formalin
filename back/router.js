const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Form = require('./schemas/form')
const User = require('./schemas/users')
const bcrypt = require('bcryptjs');
//----------------------------------------------------------
router.get('/api/form/get-forms/:userId', async (req, res) => {
    let success, data;
    try {
        data = await mongoose.model('Form').find({ userId: req.params.userId });
        success = true;
    } catch (e) {
        success = false;
    }

    res.json({ success, data });
})
//----------------------------------------------------------
router.get('/api/form/get/:formId', async (req, res) => {
    let success, data;
    try {
        data = await mongoose.model('Form').findOne({ _id: req.params.formId });
        success = true;
    } catch (e) {
        success = false;
    }

    res.json({ success, data });
})
//----------------------------------------------------------
router.delete('/api/form/delete/:formId', async (req, res) => {
    let success, data;
    try {
        data = await mongoose.model('Form').deleteOne({ _id: req.params.formId });
        success = true;
    } catch (e) {
        success = false;
    }

    res.json({ success, data });
})
//----------------------------------------------------------

router.post('/api/form/add', async (req, res) => {
    const form = new Form(req.body);
    let success, error;
    try {
        success = await form.save();

    } catch (e) {
        success = false;
        error = e;
    }
    res.json({ form: success, error })
});
//----------------------------------------------------------

router.post('/api/form/submit/:formId', async (req, res) => {
    let success, error;
    try {
        success = await mongoose.model('Form').updateOne({ _id: req.params.formId }, { $push: { answers: req.body } });


    } catch (e) {
        success = false;
        error = e;
    }
    res.json({ success, error })
});
//----------------------------------------------------------
router.post('/api/user/login', async (req, res) => {
    const { email, password } = req.body
    let result = {
        success: false,
        message: 'no match',
        userData: {},
    };
    if (!email || !password) {
        result.message = 'all fields are mandatory';
        res.json(result);
        return;
    }
    let user = await mongoose.model('User').find({ email }).select('+password').lean();

    if (user.length === 0) {

        res.json(result);
        return;
    }
    user = user[0];

    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
        res.json(result);

        return;
    }
    delete user.password;
    result.success = true;
    result.message = 'success';
    result.userData = user;
    res.json(result);
})
//----------------------------------------------------------
router.post('/api/user/register', async (req, res) => {

    const saltRounds = 10;
    req.body.password = await bcrypt.hash(req.body.password, saltRounds);
    const user = new User(req.body);
    let success, error;
    try {
        success = await user.save();
    } catch (e) {
        success = false;
        error = e;
    }
    res.json({ user: success, error })
});
module.exports = router;

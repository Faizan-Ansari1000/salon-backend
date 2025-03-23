const express = require('express');
const NailCare = require('../models/nailCareModel');
const AppointMent = require('../models/appointmentModel');
const userNoti = require('../models/notificationModel');
const Doubt = require('../models/doubtModel');
const Image = require('../models/imageModel');
const userRoute = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });



// post
userRoute.post('/nailcare', async (req, res) => {
    const { name, price, image } = req.body;

    if (!name || !price || !image) {
        return res.status(400).json({ isSuccessfully: false, message: 'Validation error' });
    }

    try {
        const existingData = await NailCare.findOne({ name });
        if (existingData) {
            return res.status(400).json({ isSuccessfully: false, message: 'This service already exists' });
        }

        const newData = new NailCare({ name, price, image });
        await newData.save();

        return res.status(201).json({ isSuccessfully: true, message: 'Successfully posted data', data: newData });
    } catch (error) {
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message });
    }
});

// get
userRoute.get('/nailcare', async (req, res) => {
    try {
        const getData = await NailCare.find();

        if (getData.length === 0) {
            return res.status(404).json({ isSuccessfully: false, message: 'No data found' });
        }

        return res.status(200).json({ isSuccessfully: true, message: 'Successfully retrieved data', data: getData });
    } catch (error) {
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message });
    }
});

//appointment post
userRoute.post('/appointment', async (req, res) => {
    const { name, email, phoneNo, category, date_time, branch, payment } = req.body;
    if (!name || !email || !phoneNo || !category || !date_time || !branch || !payment) {
        return res.status(400).json({ isSuccessfully: false, message: 'Validation error' })
    }
    try {
        const result = await AppointMent.find();
        if (!result) {
            return res.status(404).json({ isSuccessfully: false, message: 'No Post data by user' })
        }
        else {
            const newAppointment = new AppointMent({ name, email, phoneNo, category, date_time, branch, payment });
            await newAppointment.save();
            res.status(201).json({ isSuccessfully: true, message: 'Successfully Posted data', data: newAppointment });
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message })
    }
})

//appointment get
userRoute.get('/appointment', async (req, res) => {
    try {
        const getData = await AppointMent.find()
        return res.status(200).json({ isSuccessfully: true, message: 'Successfully get data', data: getData });
    } catch (error) {
        console.log(error)
        res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message })
    }
})

// POST: Send Notification
userRoute.post('/notification', async (req, res) => {
    try {
        const { email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({ isSuccessfully: false, message: 'message are required' });
        }
        const newNotification = new userNoti({ email, message })
        await newNotification.save();

        return res.status(201).json({
            isSuccessfully: true,
            message: 'Notification sent successfully',
            data: newNotification
        });
    } catch (error) {
        console.error("Error in POST /notification:", error);
        return res.status(500).json({
            isSuccessfully: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

userRoute.get('/notification', async (req, res) => {
    try {
        const notifications = await userNoti.find();

        return res.status(200).json({
            isSuccessfully: true,
            message: 'Successfully fetched notifications',
            data: notifications
        });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).json({
            isSuccessfully: false,
            message: 'Internal Server Error',
            error: error.message
        });
    }
});

// post Doubt
userRoute.post('/askAdmin', async (req, res) => {
    const { name, email, branch, askAdmin } = req.body;
    try {
        const result = await Doubt.find();
        if (!result) {
            return res.status(400).json({ message: 'No Doubt' })
        }
        const newDoubt = new Doubt({
            name,
            email,
            branch,
            askAdmin
        })
        await newDoubt.save();
        return res.status(201).json({ isSuccessfully: true, message: 'Successfully Posted Doubt', data: newDoubt })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message })
    }
})


//get doubt
userRoute.get('/askAdmin', async (req, res) => {
    try {
        const result = await Doubt.find()
        if (result.length === 0) {
            return res.status(404).json({ isSuccessfully: false, message: 'No DOubts' })
        } else {
            return res.status(200).json({ isSuccessfully: true, messafe: 'Successfully Get DOubts', data: result })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message })
    }
})



//  Image Upload API
userRoute.post('/imageUpload', upload.single('image'), async (req, res) => {
    try {
        if (!req.file || !req.body.text || !req.body.email) {
            return res.status(400).json({ isSuccessfully: false, message: 'All fields are required' });
        }

        const newImage = new Image({
            imageUrl: req.file.buffer.toString('base64'),
            text: req.body.text,
            email: req.body.email
        });

        await newImage.save();
        res.status(201).json({ isSuccessfully: true, message: 'Image uploaded successfully', data: newImage });

    } catch (error) {
        console.error("Backend Error:", error);
        return res.status(500).json({ isSuccessfully: false, message: 'Internal server error', error: error.message });
    }
});

// get
userRoute.get('/imageUpload', async (req, res) => {
    try {
        const getData = await Image.find();
        return res.status(200).json({
            isSuccessfully: true,
            message: 'Successfully fetched images',
            data: getData
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            isSuccessfully: false,
            message: 'Internal server error',
            error: error.message
        });
    }
});



module.exports = userRoute;
const { User, Application, } = require('../models');

const createUser = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role, applicationId } = req.body;

        // check if user already exists
        const userE = await User.exists({ email });
        if (userE) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        // check if application exists
        const application = await Application.exists({ _id: applicationId });
        if (!application) {
            return res.status(400).json({
                message: 'Application does not exist',
            });
        }

        const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            role,
            applicationId,
        });

        res.status(201).json({
            status: true,
            message: 'User created successfully',
            user,
        });

    } catch (error) {
        next(error);
    }
}

const loginUsers = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        console.log(email, password)

        const user = await User.findOne({
            $and: [
                {
                    email,
                },
                {
                    password,
                }
            ]
        });

        if (!user) {
            return res.status(400).json({
                status: false,
                message: 'User does not exist',
            });
        }

        res.status(200).json({
            status: true,
            message: 'User logged in successfully',
            user,
        });


    } catch (error) {
        console.log(error)
        next(error);
    }
}


module.exports = {
    createUser,
    loginUsers,
}
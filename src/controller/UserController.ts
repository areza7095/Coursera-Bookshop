import { Request, Response } from 'express';
import bcrypt, { genSalt, hash } from 'bcrypt';
import prisma from '../prisma';


class UserController {
    static async CreateUser(req: Request, res: Response): Promise<void> {
        // Capturing Data in Body Request
        const { full_name, username, password } = req.body;

        // Send Respond if body undefined
        if (!full_name && !username && !password) {
            res.status(400).json({
                status: res.statusCode,
                message: "Please fill all Data !",
            });
        } else {
            // Checking Username If Exitst
            const usernameExist = await prisma.users.findUnique({
                where: {
                    username: username,
                },
            });
            if (usernameExist) {
                res.status(400).json({
                    status: res.statusCode,
                    message: "Username Already Used !",
                });
            } else {
                // Hash Password
                genSalt(10)
                    .then((salt) => hash(password, salt))
                    .then(async (hashPassword) => {
                        //Create User
                        try {
                            const SaveUser = await prisma.users.create({
                                data: {
                                    full_name: full_name,
                                    username: username,
                                    password: hashPassword
                                },
                            });
                            res.status(200).json({
                                status: res.statusCode,
                                message: "User Successfully Created !"
                            });
                        } catch (error: any) {
                            res.status(400).json({ msg: error.message });
                        }
                    })
            }
        }




    };

    static async LoginUser(req: Request, res: Response): Promise<void> {
        // Capturing Data in Body Request
        const { username, password } = req.body;

        // Send Respond if body undefined
        if (!username && !password) {
            res.status(400).json({
                status: res.statusCode,
                message: "Please fill all Data !",
            });
        } else {
            // Checking Username If Exitst
            const usernameExist = await prisma.users.findUnique({
                where: {
                    username: username,
                },
            });
            if (!usernameExist) {
                res.status(400).json({
                    status: res.statusCode,
                    message: "Username Not Found !"
                });
            } else {
                // Check Password
                bcrypt.compare(password, usernameExist['password']).then(function (result) {
                    if (result) {
                        res.status(200).json({
                            status: res.statusCode,
                            message: "OK",
                            data: usernameExist
                        });
                    } else {
                        res.status(400).json({
                            status: res.statusCode,
                            message: "Wrong Password !"
                        });
                    }
                });

            }
        }
    };
}



export default UserController;

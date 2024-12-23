import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import {v2 as cloudinary} from "cloudinary";
import nodemailer from "nodemailer";

export const getAllUsers = async(req, res) => {
    try {
        const users = await User.find().select("-password");
        if(!users) {
            return res.status(404).json({message: "No users found"});
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}
export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        res.status(200).json(cake);
    } catch (error) {
        console.log("Error in get user controller", error.message);
        res.status(500).json({ error: "Something went wrong" });
    }
  };
export const updateUser = async (req, res) => {
  const { bio } = req.body;
  const userId = req.params.id;

  try {
    let user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.bio = bio || user.bio;
    
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    console.error("Error in updateUser controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
export const getAllCart = async(req, res) => {
    try {
        // get user cart then populate it based on id
        const user = await User.findById(req.user._id).populate("cart").select("-password");
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteAllCart = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        user.cart = [];
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const addToCart = async(req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user) {
            return res.status(404).json({message: "User not found"});
        }
        // check if the cake is already in the cart
        if(user.cart.includes(req.params.id)) {
            return res.status(400).json({message: "Cake is already in the cart"});
        }
        user.cart.push(req.params.id);
        await user.save();
        res.status(200).json(user.cart);
    } catch (error) {
        res.status(404).json({message: error.message});
    }
}

export const deleteCart = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user._id;
        const userToModify = await User.findById(userId );

        if(!userToModify) {
            return res.status(404).json({ message: "User not found" });
        }

        const isAlreadyInCart = userToModify.cart.includes(id);

        if(!isAlreadyInCart) {
            return res.status(404).json({ message: "Item not in cart" });
        }

        await User.findByIdAndUpdate(userId, { $pull: { cart: id } });

        res.status(200).json({ message: "Item removed from cart successfully" });

    } catch(error) {
        console.log("Error in deleteCart: ", error.message)
        res.status(500).json({error: error.message})
    }
}

export const sendPaymentDetails = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        const cakes = req.body.cakes;
        const info = req.body.info;

        if(!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if(!cakes) {
            return res.status(404).json({ message: "No items in cart" });
        }

        const email = req.user.email;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL,
                pass: process.env.PASSWORD,
            },
        });

        const mailOptions = {
            from: "anvnh",
            to: email,
            subject: "Payment Details",
            html: `
                <h2>
                    Dear ${user.fullName},
                    Thank you for your recent purchase at AAP! We have received your order and are now processing it.
                </h2>
                <h3> 
                    Here are the details of your order:
                </h3>
                <h3> Order details </h3>
                <ul>
                    <li> Order ID: ${info.orderId}</li>
                    <li> Order Date: ${new Date().toLocaleDateString()}</li>
                    <li> Ship to: ${info.address}</li>
                    <li> Ship fee: 
                        ${Math.round(info.shippingCost)}$
                    </li>
                    <li> Payment method: ${info.paymentMethod} </li>
                    <li> Payment result: ${info.paymentResult} </li>
                    <li> Phone number: ${info.phone} </li>
                    ${info.state ? `
                        <li> Card number: ${info.state.number} </li>
                        <li> Card holder: ${info.state.name} </li>
                        <li> Expiry date: ${info.state.expiry} </li>
                        <li> CVC: ${info.state.cvc} </li>
                    ` : ""}
                </ul>
                <h3> Payment details </h3>
                <table>
                      <tr>
                        <th> Brand + Model </th>
                        <th> Quantity </th>
                        <th> Price </th>
                      </tr>
                      ${cakes.map(item => `
                        <tr>
                          <td>${item.brand}${item.model}</td>
                          <td>${item.quantity}</td>
                          <td>${item.price}</td>
                        </tr>
                      `).join('')}
                      <tr>
                        <td colspan="2"><b>
                            Total Price:
                        </b></td>
                        <td><b>
                            $${((cakes.reduce((total, item) => total + item.total, 0)) + Math.round(info.shippingCost)).toLocaleString()}
                        </b></td>
                      </tr>
                </table>
            `,
        };

        await transporter.sendMail(mailOptions);

        // Send payment details to the user
        res.status(200).json({cakes, info});
        // res.status(200).json(mailOptions);
    }
    catch(error) {
        console.log("Error in sendPaymentDetails: ", error.message)
        res.status(500).json({error: error.message})
    }
}


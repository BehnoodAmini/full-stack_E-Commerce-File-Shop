const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const User = require("../models/User");
const Product = require("../models/Product");
const Post = require("../models/Post");
const Payment = require("../models/Payment");
const Comment = require("../models/Comment");

const getAllUsers = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalUsers = await User.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          username: 1,
          displayname: 1,
          email: 1,
          viewed: 1,
          userIsActive: 1,
          createdAt: 1,
        });
      const AllUsersNum = await (await User.find()).length;
      res.status(200).json({ GoalUsers, AllUsersNum });
    } else {
      const AllUsers = await User.find()
        .sort({ _id: -1 })
        .select({ password: false });
      res.status(200).json(AllUsers);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getAllUsers = getAllUsers;

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      // CHECK PASSWORD AND CONFIRM PASSWORD
      if (req.body.password == req.body.rePassword) {
        const emailExist = await User.find({ email: req.body.email });
        // CHECK EMAIL EXIST
        if (emailExist.length < 1) {
          const usernameExist = await User.find({
            username: req.body.username,
          });
          // CHECK USERNAME EXIST
          if (usernameExist.length < 1) {
            // MAKING USER
            const data = req.body;
            data.username = req.body.username
              .replace(/\s+/g, "_")
              .toLowerCase();
            data.displayname = req.body.displayname
              .replace(/\s+/g, "_")
              .toLowerCase();
            data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
            data.password = req.body.password.replace(/\s+/g, "").toLowerCase();
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const userActivateCode = Math.floor(
              Math.random() * 90000000 + 10000000
            );
            const newUser = new User({
              username: data.username,
              displayname: data.displayname,
              email: data.email,
              password: hashedPassword,
              favoriteProducts: [],
              userProducts: [],
              comments: [],
              payments: [],
              cart: [],
              viewed: false,
              activateCode: userActivateCode,
              userIsActive: false,
              emailSend: true,
              createdAt: new Date().toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
              updatedAt: new Date().toLocaleDateString("fa-IR", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            });
            newUser
              .save()
              .then((d) => {
                // MAKING AUTH COOKIE
                const token = jwt.sign(
                  { _id: newUser._id, username: newUser.username },
                  process.env.TOKEN_SECRET
                );

                // EMAIL TO USER
                const MAIL_HOST = process.env.MAIL_HOST;
                const MAIL_PORT = process.env.MAIL_PORT;
                const MAIL_USER = process.env.MAIL_USER;
                const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
                const MAIL_MAIN_ADDRESS = process.env.MAIL_MAIN_ADDRESS;
                const transporter = nodemailer.createTransport({
                  host: MAIL_HOST,
                  port: MAIL_PORT,
                  tls: true,
                  auth: {
                    user: MAIL_USER,
                    pass: MAIL_PASSWORD,
                  },
                });
                transporter
                  .sendMail({
                    from: MAIL_MAIN_ADDRESS,
                    to: newUser.email,
                    subject: "احراز هویت pdshop.ir",
                    html: `<html><head><style>strong{color: rgb(0, 121, 222);}h1{font-size: large;}</style></head><body><h1>احراز هویت pdshop.ir</h1><div>کد احراز هویت: <strong>${userActivateCode}</strong></div></body></html>`,
                  })
                  .then((d) => {
                    res
                      .status(200)
                      .json({ msg: "ثبت نام موفقیت آمیز بود.", auth: token });
                  })
                  .catch((err) => {
                    console.log(err);
                    res
                      .status(400)
                      .json({ msg: "خطا در ثبت نام!", errorMessage: err });
                  });
              })
              .catch((err) => {
                console.log(err);
                res.status(400).json(err);
              });
          } else {
            res.status(422).json({ msg: "لطفا نام کاربری دیگری وارد کنید!" });
          }
        } else {
          res.status(422).json({ msg: "لطفا ایمیل دیگری وارد کنید!" });
        }
      } else {
        res.status(422).json({ msg: "تکرار رمز عبور اشتباه است!" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.registerUser = registerUser;

// SEND USER ACTIVATION CODE AGAIN
const reActivateUserCode = async (req, res) => {
  try {
    const userData = await User.findById(req.user._id);

    // CHECK IF 30 DAYS PASSED
    const now = new Date();
    const lastReset = userData.activateCodeCounterLastReset || new Date(0);
    const diffInDays = (now - lastReset) / (1000 * 60 * 60 * 24);

    if (diffInDays >= 30) {
      // RESET THE COUNTER
      userData.activateCodeCounter = 3; //DEFAULT IS 3
      userData.activateCodeCounterLastReset = now;
      await userData.save();
    }

    if (userData.activateCodeCounter > 0) {
      const newData = {
        activateCodeCounter: userData.activateCodeCounter - 1,
      };
      await User.findByIdAndUpdate(req.user._id, newData, { new: true });

      // EMAIL TO USER
      const MAIL_HOST = process.env.MAIL_HOST;
      const MAIL_PORT = process.env.MAIL_PORT;
      const MAIL_USER = process.env.MAIL_USER;
      const MAIL_PASSWORD = process.env.MAIL_PASSWORD;
      const MAIL_MAIN_ADDRESS = process.env.MAIL_MAIN_ADDRESS;
      const transporter = nodemailer.createTransport({
        host: MAIL_HOST,
        port: MAIL_PORT,
        tls: true,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASSWORD,
        },
      });
      transporter
        .sendMail({
          from: MAIL_MAIN_ADDRESS,
          to: userData.email,
          subject: "ایمیل دوباره جهت احراز هویت pdshop.ir",
          html: `<html><head><style>strong{color: rgb(0, 121, 222);}h1{font-size: large;}</style></head><body><h1>ایمیل دوباره جهت احراز هویت pdshop.ir</h1><div>کد احراز هویت: <strong>${userData.activateCode}</strong></div></body></html>`,
        })
        .then((d) => {
          res.status(200).json({ msg: "ایمیل دوباره ارسال شد." });
        })
        .catch((err) => {
          console.log(err);
          res
            .status(400)
            .json({ msg: "خطا در ارسال دوباره ایمیل!", errorMessage: err });
        });
    } else {
      res.status(401).json({ msg: "شما امکان ارسال دوباره ایمیل را ندارید!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.reActivateUserCode = reActivateUserCode;

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      // CHECK EMAIL EXIST
      const emailExist = await User.find({ email: req.body.email });
      if (emailExist.length > 0) {
        const theUser = emailExist[0];
        const data = req.body;
        data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
        data.password = req.body.password.replace(/\s+/g, "").toLowerCase();
        const validPassword = await bcrypt.compare(
          data.password,
          theUser.password
        );
        if (validPassword == false) {
          res.status(422).json({ msg: "ایمیل یا رمز عبور اشتباه است!" });
        } else {
          // MAKING AUTH COOKIE
          const token = jwt.sign(
            { _id: theUser._id, username: theUser.username },
            process.env.TOKEN_SECRET
          );
          res
            .status(200)
            .json({ msg: "با موفقیت وارد حساب کاربری شدید.", auth: token });
        }
      } else {
        res.status(422).json({ msg: "لطفا ابتدا ثبت نام کنید!" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.loginUser = loginUser;

const updateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const data = req.body;
      data.username = req.body.username.replace(/\s+/g, "_").toLowerCase();
      data.displayname = req.body.displayname
        .replace(/\s+/g, "_")
        .toLowerCase();
      data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
      await User.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      res.status(200).json({ msg: "کاربر با موفقیت به روز رسانی شد." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.updateUser = updateUser;

const miniUpdateUser = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      if (
        req.body.username ||
        req.body.email ||
        req.body.payments ||
        req.body.userProducts ||
        req.body.viewed ||
        req.body.activateCode ||
        req.body.userIsActive
      ) {
        res.status(400).json({ msg: "خطا در اطلاعات فرستاده شده!" });
      } else {
        if (req.body.password == req.body.rePassword) {
          const data = req.body;
          data.displayname = req.body.displayname
            .replace(/\s+/g, "_")
            .toLowerCase();
          const newPass = req.body.password.replace(/\s+/g, "").toLowerCase();
          data.password = await bcrypt.hash(newPass, 10);
          (data.updatedAt = new Date().toLocaleDateString("fa-IR", {
            hour: "2-digit",
            minute: "2-digit",
          })),
            await User.findByIdAndUpdate(req.params.id, data, {
              new: true,
            });
          res.status(200).json({ msg: "کاربر با موفقیت به روز رسانی شد." });
        } else {
          res.status(422).json({ msg: "تکرار رمز عبور اشتباه است!" });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.miniUpdateUser = miniUpdateUser;

const emailSenderChanger = async (req, res) => {
  try {
    const newUser = {
      updatedAt: new Date().toLocaleDateString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      emailSend: req.body.emailSend,
    };
    await User.findByIdAndUpdate(req.user._id, newUser, {
      new: true,
    });
    res.status(200).json({ msg: "وضعیت ارسال ایمیل تغییر کرد." });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.emailSenderChanger = emailSenderChanger;

const confirmEmail = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (theUser.activateCode == req.body.activateCode) {
      const newUser = {
        updatedAt: new Date().toLocaleDateString("fa-IR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        userIsActive: true,
      };
      await User.findByIdAndUpdate(req.user._id, newUser, {
        new: true,
      });
      res.status(200).json({ msg: "حساب کاربری با موفقیت فعال شد." });
    } else {
      res.status(401).json({ msg: "کد تایید اشتباه است." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.confirmEmail = confirmEmail;

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "کاربر با موفقیت حذف شد." });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.deleteUser = deleteUser;

const getOneUserById = async (req, res) => {
  try {
    const goalUser = await User.findById(req.params.id).select({
      password: false,
    });

    // FOR ADDING FAV PRODUCTS TO GOALUSER
    const goalUserFavProduct = await Product.find({
      _id: { $in: goalUser.favoriteProducts },
    }).select({ title: 1, slug: 1 });
    goalUser.favoriteProducts = goalUserFavProduct;

    // FOR ADDING CART PRODUCTS TO GOALUSER
    const goalUserCartProduct = await Product.find({
      _id: { $in: goalUser.cart },
    }).select({ title: 1, slug: 1 });
    goalUser.cart = goalUserCartProduct;

    // FOR ADDING PURCHASED PRODUCTS TO GOALUSER
    const goalUserProducts = await Product.find({
      _id: { $in: goalUser.userProducts },
    }).select({ title: 1, slug: 1 });
    goalUser.userProducts = goalUserProducts;

    // FOR ADDING PAYMENTS TO GOALUSER
    const goalUserPayments = await Payment.find({
      email: goalUser.email,
    }).select({ amount: 1, payed: 1, createdAt: 1 });
    goalUser.payments = goalUserPayments;

    // FOR ADDING COMMENTS TO GOALUSER
    const goalUserComments = await Comment.find({
      email: goalUser.email,
    }).select({ message: 1, typeOfModel: 1, createdAt: 1 });
    goalUser.comments = goalUserComments;

    res.status(200).json(goalUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getOneUserById = getOneUserById;

// FOR LOGIN REGISTER AND ACCOUNT REDIRECT
const getUserDataAccount = async (req, res) => {
  try {
    const goalUser = await User.findById(req.user._id).select({ _id: 1 });
    res.status(200).json(goalUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getUserDataAccount = getUserDataAccount;

// FOR ADMIN REDIRECT
const getUserAdminData = async (req, res) => {
  try {
    const goalUser = await User.findById(req.user._id).select({ _id: 1 });
    res.status(200).json(goalUser);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getUserAdminData = getUserAdminData;

// ACCOUNT AND CART PAGE
const getPartOfUserData = async (req, res) => {
  try {
    const theSlug = req.params.slug;
    if (theSlug == "info") {
      const goalUser = await User.findById(req.user._id).select({
        username: 1,
        displayname: 1,
        email: 1,
        createdAt: 1,
        updatedAt: 1,
        emailSend: 1,
        userIsActive: 1,
        activateCodeCounter: 1,
      });
      res.status(200).json(goalUser);
    } else if (theSlug == "favourites") {
      const goalUser = await User.findById(req.user._id).select({
        favoriteProducts: 1,
      });
      const goalProducts = await Product.find({
        _id: { $in: goalUser.favoriteProducts },
      }).select({
        title: 1,
        slug: 1,
        image: 1,
        price: 1,
        shortDesc: 1,
        typeOfProduct: 1,
        features: 1,
        buyNumber: 1,
      });
      res.status(200).json(goalProducts);
    } else if (theSlug == "purchased") {
      const goalUser = await User.findById(req.user._id).select({
        userProducts: 1,
      });
      const goalProducts = [];
      for (let i = goalUser.userProducts.length; i >= 0; i--) {
        const goalProduct = await Product.findById(
          goalUser.userProducts[i]
        ).select({
          title: 1,
          slug: 1,
          image: 1,
          imageAlt: 1,
          mainFile: 1,
        });
        if (goalProduct) {
          goalProducts.push(goalProduct);
        }
      }

      res.status(200).json(goalProducts);
    } else if (theSlug == "comments") {
      const goalUser = await User.findById(req.user._id);
      const userComments = await Comment.find({ email: goalUser.email })
        .sort({ _id: -1 })
        .select({
          createdAt: 1,
          published: 1,
          typeOfModel: 1,
          src_id: 1,
          message: 1,
        });

      const fullDataUserComments = [];
      // ADDING SOURCE PRODUCTS OR POSTS TO THE COMMENT
      for (let i = 0; i < userComments.length; i++) {
        let theSrc = {};
        if (userComments[i].typeOfModel == "post") {
          const postSrc = await Post.findById(userComments[i].src_id).select({
            title: 1,
            slug: 1,
          });
          theSrc = postSrc;
        } else {
          const productSrc = await Product.findById(
            userComments[i].src_id
          ).select({
            title: 1,
            slug: 1,
          });
          theSrc = productSrc;
        }
        const newCommentData = {
          createdAt: userComments[i].createdAt,
          published: userComments[i].published,
          typeOfModel: userComments[i].typeOfModel,
          src_id: userComments[i].src_id,
          message: userComments[i].message,
          src: theSrc,
        };
        fullDataUserComments.push(newCommentData);
      }

      res.status(200).json(fullDataUserComments);
    } else if (theSlug == "payments") {
      const goalUser = await User.findById(req.user._id).select({
        payments: 1,
      });
      const goalPayments = await Payment.find({
        _id: { $in: goalUser.payments },
      })
        .select({
          amount: 1,
          payed: 1,
          createdAt: 1,
          products: 1,
          resnumber: 1,
        })
        .sort({ _id: -1 });

      for (let i = 0; i < goalPayments.length; i++) {
        // FINDING PRODUCTS OF EACH PAYMENT
        const goalProducts = await Product.find({
          _id: { $in: goalPayments[i].products },
        }).select({
          title: 1,
          slug: 1,
          image: 1,
          imageAlt: 1,
          price: 1,
          typeOfProduct: 1,
          pageView: 1,
          buyNumber: 1,
          categories: 1,
          features: 1,
          shortDesc: 1,
          tags: 1,
        });
        // SETTING PRODUCTS OF EACH PAYMENT
        goalPayments[i].products = goalProducts;
      }

      res.status(200).json(goalPayments);
    } else if (theSlug == "cart") {
      const goalUser = await User.findById(req.user._id).select({
        cart: 1,
      });
      const goalProducts = await Product.find({
        _id: { $in: goalUser.cart },
      }).select({
        title: 1,
        slug: 1,
        image: 1,
        price: 1,
        shortDesc: 1,
        typeOfProduct: 1,
        features: 1,
        buyNumber: 1,
      });
      res.status(200).json(goalProducts);
    } else {
      res.status(200).json({ msg: "عدم تعیین بخش مورد نظر..." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getPartOfUserData = getPartOfUserData;

const SearchUsers = async (req, res) => {
  try {
    const theUser = await User.find({ email: req.body.email }).select({
      _id: true,
    });
    if (theUser.length > 0) {
      res.status(200).json({ userData: theUser[0] });
    } else {
      res.status(200).json({ userData: 0 });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.SearchUsers = SearchUsers;

const favouriteProductsMan = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (theUser.userIsActive == true) {
      if (req.body.method == "push") {
        const newUserFavProducts = [
          ...theUser.favoriteProducts,
          req.body.newFavProduct,
        ];
        // CHECK FOR DUPLICATION FAVOURITE PRODUCTS
        let userHaveProduct = 0;
        for (let i = 0; i < theUser.favoriteProducts.length; i++) {
          if (req.body.newFavProduct == theUser.favoriteProducts[i]) {
            userHaveProduct = 1;
            break;
          }
        }
        if (userHaveProduct == 0) {
          const newUser = {
            favoriteProducts: newUserFavProducts,
          };
          await User.findByIdAndUpdate(req.user._id, newUser, {
            new: true,
          });
          res.status(200).json({ msg: "به محصولات مورد علاقه افزوده شد!" });
        } else {
          res
            .status(401)
            .json({ msg: "قبلا به محصولات مورد علاقه اضافه شده است!" });
        }
      } else if (req.body.method == "remove") {
        const oldFavProducts = theUser.favoriteProducts;
        for (let i = 0; i < oldFavProducts.length; i++) {
          if (oldFavProducts[i] == req.body.goalFavProductId) {
            let updatedUserFav = oldFavProducts;
            if (i > -1) {
              updatedUserFav.splice(i, 1);
            }
            const updatedFavProduct = { favoriteProducts: updatedUserFav };
            await User.findByIdAndUpdate(req.user._id, updatedFavProduct, {
              new: true,
            });
          }
        }
        res.status(200).json({ msg: "از محصولات مورد علاقه حذف شد!" });
      } else {
        res
          .status(401)
          .json({ msg: "خطا در ارسال اطلاعات محصولات مورد علاقه!" });
      }
    } else {
      res.status(401).json({ msg: "لطفا ابتدا ایمبل خود را تایید کنید!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.favouriteProductsMan = favouriteProductsMan;

const cartMan = async (req, res) => {
  try {
    const theUser = await User.findById(req.user._id);
    if (theUser.userIsActive == true) {
      if (req.body.method == "push") {
        const newUserCartProducts = [...theUser.cart, req.body.newCartProduct];
        // CHECK FOR DUPLICATION FAVOURITE PRODUCTS
        let userHaveProduct = 0;
        for (let i = 0; i < theUser.cart.length; i++) {
          if (req.body.newCartProduct == theUser.cart[i]) {
            userHaveProduct = 1;
            break;
          }
        }
        if (userHaveProduct == 0) {
          const newUser = {
            cart: newUserCartProducts,
          };
          await User.findByIdAndUpdate(req.user._id, newUser, {
            new: true,
          });
          res.status(200).json({ msg: "به سبد خرید افزوده شد!" });
        } else {
          res.status(401).json({ msg: "قبلا به سبد خرید اضافه شده است!" });
        }
      } else if (req.body.method == "remove") {
        const oldCartProducts = theUser.cart;
        for (let i = 0; i < oldCartProducts.length; i++) {
          if (oldCartProducts[i] == req.body.goalCartProductId) {
            let updatedUserCart = oldCartProducts;
            if (i > -1) {
              updatedUserCart.splice(i, 1);
            }
            const updatedCartProduct = { cart: updatedUserCart };
            await User.findByIdAndUpdate(req.user._id, updatedCartProduct, {
              new: true,
            });
          }
        }
        res.status(200).json({ msg: "از سبد خرید حذف شد!" });
      } else {
        res.status(401).json({ msg: "خطا در ارسال اطلاعات محصولات سبد خرید!" });
      }
    } else {
      res.status(401).json({ msg: "لطفا ابتدا ایمبل خود را تایید کنید!" });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.cartMan = cartMan;

// HEADER CART NUMBER
const cartNumber = async (req, res) => {
  try {
    let token = req.cookies.auth_cookie;
    if (!token) {
      token = req.headers.auth_cookie;
    }

    if (!token) {
      res.status(200).json({ number: 0 });
    } else {
      try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const goalUser = await User.findById(verified._id).select({ cart: 1 });
        res.status(200).json({ number: goalUser.cart.length });
      } catch (err) {
        console.log(err);
        res.status(200).json({ number: 0 });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.cartNumber = cartNumber;

const uncheckPayment = async (req, res) => {
  try {
    const newPaymentData = {
      viewed: false,
    };
    await Payment.findByIdAndUpdate(req.params.id, newPaymentData, {
      new: true,
    });
    res.status(200).json({ msg: "سفارش به بخش سفارش‌های جدید افزوده شد." });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.uncheckPayment = uncheckPayment;

const uncheckComment = async (req, res) => {
  try {
    const newCommentData = {
      viewed: false,
    };
    await Comment.findByIdAndUpdate(req.params.id, newCommentData, {
      new: true,
    });
    res.status(200).json({ msg: "دیدگاه به بخش دیدگاه‌های جدید افزوده شد." });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.uncheckComment = uncheckComment;

const getNewEvents = async (req, res) => {
  try {
    const newUser = await User.find({ viewed: false });
    const newPayment = await Payment.find({ viewed: false });
    const newComment = await Comment.find({ viewed: false });
    const sendingData = {
      newUsersNum: newUser.length,
      newPaymentsNum: newPayment.length,
      newCommentsNum: newComment.length,
    };

    res.status(200).json(sendingData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getNewEvents = getNewEvents;

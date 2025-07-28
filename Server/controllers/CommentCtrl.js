const { validationResult } = require("express-validator");

const User = require("../models/User");
const Product = require("../models/Product");
const Post = require("../models/Post");
const Comment = require("../models/Comment");

const getAllComments = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalComments = await Comment.find()
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          email: 1,
          parentId: 1,
          published: 1,
          viewed: 1,
          createdAt: 1,
        });
      const AllCommentsNum = await (await Comment.find()).length;
      res.status(200).json({ GoalComments, AllCommentsNum });
    } else {
      const AllComments = await Comment.find()
        .sort({ _id: -1 })
        .select({ resnumber: false });
      res.status(200).json(AllComments);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getAllComments = getAllComments;

const getAllNotViewedComments = async (req, res) => {
  try {
    if (req.query.pn && req.query.pgn) {
      const paginate = req.query.pgn;
      const pageNumber = req.query.pn;
      const GoalComments = await Comment.find({ viewed: false })
        .sort({ _id: -1 })
        .skip((pageNumber - 1) * paginate)
        .limit(paginate)
        .select({
          email: 1,
          parentId: 1,
          published: 1,
          viewed: 1,
          createdAt: 1,
        });
      const AllCommentsNum = await (
        await Comment.find({ viewed: false })
      ).length;
      res.status(200).json({ GoalComments, AllCommentsNum });
    } else {
      const AllComments = await Comment.find()
        .sort({ _id: -1 })
        .select({ resnumber: false });
      res.status(200).json(AllComments);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getAllNotViewedComments = getAllNotViewedComments;

const newComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const theUser = await User.findById(req.user._id);
      if (!theUser) {
        res.status(401).json({ msg: "کاربر یافت نشد!" });
      } else {
        if (theUser.userIsActive == false) {
          res.status(401).json({ msg: "لطفا ابتدا ایمیل خود را تایید کنید!" });
        } else {
          const commentData = {
            message: req.body.message,
            email: theUser.email,
            displayname: theUser.displayname,
            src_id: req.body.src_id,
            parentId: req.body.parentId,
            typeOfModel: req.body.typeOfModel,
            published: false,
            viewed: false,
            createdAt: new Date().toLocaleDateString("fa-IR", {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };

          await Comment.create(commentData);
          res
            .status(200)
            .json({ msg: "دیدگاه شما پس از بررسی منتشر خواهد شد!" });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.newComment = newComment;

const updateComment = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ msg: errors.errors[0].msg });
    } else {
      const data = req.body;
      data.displayname = req.body.displayname
        .replace(/\s+/g, "_")
        .toLowerCase();
      data.email = req.body.email.replace(/\s+/g, "_").toLowerCase();
      await Comment.findByIdAndUpdate(req.params.id, data, {
        new: true,
      });
      res.status(200).json({ msg: "دیدگاه با موفقیت به روز رسانی شد." });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.updateComment = updateComment;

const deleteComment = async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "دیدگاه با موفقیت حذف شد." });
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.deleteComment = deleteComment;

const getOneCommentById = async (req, res) => {
  try {
    const goalComment = await Comment.findById(req.params.id);

    // ADDING SOURCE PRODUCTS OR POSTS TO THE COMMENT
    let theSrc = {};
    if (goalComment.typeOfModel == "post") {
      const postSrc = await Post.findById(goalComment.src_id).select({
        title: 1,
        slug: 1,
      });
      theSrc = postSrc;
    } else {
      const productSrc = await Product.findById(goalComment.src_id).select({
        title: 1,
        slug: 1,
      });
      theSrc = productSrc;
    }

    // ADDING PARENT COMMENT
    let theParentCom = {};
    if (goalComment.parentId != "null") {
      const thePar = await Comment.findById(goalComment.parentId).select({
        message: 1,
        email: 1,
        displayname: 1,
        createdAt: 1,
      });
      theParentCom = thePar;
    }

    const sendingData = {
      _id: goalComment._id,
      message: goalComment.message,
      email: goalComment.email,
      displayname: goalComment.displayname,
      src_id: goalComment.src_id,
      parentId: goalComment.parentId,
      typeOfModel: goalComment.typeOfModel,
      published: goalComment.published,
      viewed: goalComment.viewed,
      createdAt: goalComment.createdAt,
      src: theSrc,
      parent: theParentCom,
    };

    res.status(200).json(sendingData);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getOneCommentById = getOneCommentById;

const getModelComments = async (req, res) => {
  try {
    const goalModelComments = await Comment.find({
      src_id: req.body._id,
      published: true,
      parentId: "null",
    })
      .sort({ _id: -1 })
      .select({
        _id: 1,
        createdAt: 1,
        displayname: 1,
        message: 1,
        parentId: 1,
      });
    res.status(200).json(goalModelComments);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getModelComments = getModelComments;

const getCommentChildrens = async (req, res) => {
  try {
    const goalReplyComments = await Comment.find({
      published: true,
      parentId: req.params.id,
    })
      .sort({ _id: -1 })
      .select({
        _id: 1,
        createdAt: 1,
        displayname: 1,
        message: 1,
        parentId: 1,
      });
    res.status(200).json(goalReplyComments);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getCommentChildrens = getCommentChildrens;

const publishComment = async (req, res) => {
  try {
    const theUser = await User.find({ email: req.body.email });
    if (!theUser) {
      res.status(401).json({ msg: "کاربر یافت نشد!" });
    } else {
      // UPDATING THE COMMENT'S PUBLISH STATUS
      const newCommentData = {
        published: true,
      };
      await Comment.findByIdAndUpdate(req.body.goalId, newCommentData, {
        new: true,
      });

      // EMAIL TO PARENT COMMENT USER
      if (req.body.parentId == "null") {
        res.status(200).json({ msg: "دیدگاه شما با موفقیت منتشر شد!" });
      } else {
        const theParentComment = await Comment.findById(req.body.parentId);
        if (theParentComment.email == process.env.ADMIN_EMAIL) {
          res.status(200).json({ msg: "دیدگاه شما با موفقیت منتشر شد!" });
        } else {
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
              to: theParentComment.email,
              subject: "پاسخ جدید برای شما در فروشگاه pdshop.ir",
              html: `<html><head><style>strong{color: rgb(0, 121, 222);}h1{font-size: large;}</style></head><body><h1>پاسخ جدید برای شما در فروشگاه pdshop.ir</h1><div>برای دیدگاه شما در فروشگاه فایل پاسخ جدیدی ثبت شده است.</div></body></html>`,
            })
            .then((d) => {
              res.status(200).json({
                msg: "انتشار دیدگاه و ارسال ایمیل با موفقیت انجام شد",
              });
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({
                msg: "خطا در ارسال ایمیل به کاربر سوال کننده!",
                errorMessage: err,
              });
            });
        }
      }
    }
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.publishComment = publishComment;

const getModelCommentsNumber = async (req, res) => {
  try {
    const goalModelComments = await Comment.find({
      src_id: req.params.id,
      published: true,
      parentId: "null",
    });
    const number = {
      number: goalModelComments.length,
    };
    res.status(200).json(number);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};
module.exports.getModelCommentsNumber = getModelCommentsNumber;

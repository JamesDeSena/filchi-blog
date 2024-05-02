const mongoose = require("mongoose");
const BlogModel = require("../models/BlogModel");
const DriveService = require("../utils/DriveService");
const requireAuth = require('../utils/authToken');

const GetAllBlog = async (req, res) => {
  try {
    const result = await BlogModel.find({});

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const GetSpecificBlog = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json("No such blog");
    }

    const result = await BlogModel.findById(id);

    res.status(200).json(result);
  } catch (err) {
    res.send(err.message);
  }
};

const CreateBlog = async (req, res) => {
  try{
    const {body, file} = req;
    const blog = JSON.parse(body.blog);

    let blogThumbnail = {};

    if (file) {
      const { id, name } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_THUMBNAIL
      );
      Object.assign(blogThumbnail, {
        id: id,
        name: name,
        link: `https://drive.google.com/thumbnail?id=${id}&sz=w1000`,
      });
    }

    const result = await BlogModel.create({
      thumbnail: blogThumbnail,
      title: blog.title,
      content: blog.content,
      author: blog.author,
      dateCreated: new Date(),
      dateUpdated: null,
    });
    res.status(201).json(result);

  }catch(err){
    res.status(500).json({message: err.message});
  }
};

const EditBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { body, file } = req;
    const blog = JSON.parse(body.blog);

    let blogThumbnail = {};

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (file) {
      const { id: fileID, name: fileName } = await DriveService.UploadFiles(
        file,
        process.env.FOLDER_ID_THUMBNAIL      
      );
      Object.assign(blogThumbnail, {
        id: fileID,
        name: fileName,
        link: `https://drive.google.com/thumbnail?id=${fileID}&sz=w1000`,
      });

      if(blog.thumbnail && blog.thumbnail.id) {
        await DriveService.DeleteFiles(blog.thumbnail.id);
      }
    }

    const result = await BlogModel.findByIdAndUpdate(
      blog._id,
      {
        $set: {
          thumbnail: blogThumbnail.hasOwnProperty("id")
            ? blogThumbnail
            : blog.thumbnail,
          title: blog.title,
          content: blog.content,
          dateUpdated: new Date(),
        }
      },
      { new: true }
    );
    res.status(201).json(result);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

const DeleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json("No blog listed");
    }
  
    const blog = await BlogModel.findById(id);
  
    if (!blog) {
      return res.status(404).json({ message: "User not found" });
    }

    if (blog.thumbnail && blog.thumbnail.id) {
      await DriveService.DeleteFiles(blog.thumbnail.id);
    }

    if (blog.thumbnail && Array.isArray(blog.thumbnail)) {
      for (const image of blog.thumbnail) {
        if (image.id) { // Ensure there's an id to work with
          await DriveService.DeleteFiles(image.id);
        }
      }
    }

    const result = await BlogModel.findByIdAndDelete(id);
  
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
  
};

const CreateBlogWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await CreateBlog(req, res);
  });
};
const EditBlogWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await EditBlog(req, res);
  });
};
const DeleteBlogWithAuth = (req, res) => {
  requireAuth(req, res, async () => {
    await DeleteBlog(req, res);
  });
};

module.exports = {
  GetAllBlog,
  GetSpecificBlog,
  CreateBlogWithAuth,
  EditBlogWithAuth,
  DeleteBlogWithAuth
};
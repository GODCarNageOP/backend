const asyncHandler = require("../middleware/asyncHandler.js");
const News = require("../models/News.js");
const cloudinary = require("cloudinary");
const ErrorHandler = require("../utils/Errorhandler.js");
const ApiFeatures = require("../utils/apiFeature.js");

const createNews = asyncHandler(async (req, res) => {
  const { title, description, location, category } = req.body;

  if (!title || !description || !location || !category) {
    return res.status(400).json({
      success: false,
      error: "Please fill all fields",
    });
  }

  let images = [...req.body.images];
  const uploadedImages = [];
  for (const img of images) {
    const uploadedImage = await cloudinary.uploader.upload(img, {
      folder: "news",
    }); // Upload each image to Cloudinary
    uploadedImages.push({
      public_id: uploadedImage.public_id,
      url: uploadedImage.secure_url,
    });
  }

  const image = uploadedImages[0];
  const news = await News.create({
    image,
    title,
    description,
    location,
    category,
    images: uploadedImages,
  });

  res.status(201).json({
    success: true,
    data: news,
  });
});

// Get all Newss
const getAllNewss = asyncHandler(async (req, res) => {
  const resultPerPage = 50;
  const newsCount = await News.countDocuments();

  console.log("count", newsCount);
  const apiFeature = new ApiFeatures(News.find(), req.query).search().filter();

  let news = await apiFeature.query.clone();

  let filteredNewsCount = news.length;

  apiFeature.pagination(resultPerPage);

  news = await apiFeature.query;

  filteredNewsCount = news.length; // Update the filteredProductsCount after pagination

  res.status(200).json({
    success: true,
    news,
    newsCount,
    resultPerPage,
    filteredNewsCount,
  });
});

// Get a single News by ID
const getNewsById = asyncHandler(async (req, res) => {
  const news = await News.findById(req.params.id);
  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  res.status(200).json({ success: true, data: news });
});

// Update a News by ID
const updateNewsById = asyncHandler(async (req, res, next) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return next(new ErrorHandler('News not found', 404));
    }

    let imagesLinks = [];

    if (req.body.images && req.body.images.length > 0) {
      // Deleting old images from Cloudinary
      for (const image of news.images) {
        await cloudinary.uploader.destroy(image.public_id);
      }

      // Uploading new images to Cloudinary
      for (const image of req.body.images) {
        const result = await cloudinary.uploader.upload(image, {
          folder: 'news',
        });

        imagesLinks.push({
          public_id: result.public_id,
          url: result.secure_url,
        });
      }
    } else {
      // No new images provided, retain the existing images
      imagesLinks = news.images;
    }

    // Update news with the provided data
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { ...req.body, images: imagesLinks },
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );

    res.status(200).json({
      success: true,
      news: updatedNews,
    });
  } catch (error) {
    console.error('Error updating news:', error);
    next(new ErrorHandler('News update failed', 500));
  }
});








// Delete a News by ID
const deleteNewsById = asyncHandler(async (req, res) => {
  const news = await News.findByIdAndRemove(req.params.id);

  if (!news) {
    return res.status(404).json({ success: false, message: "News not found" });
  }
  res.status(204).json({ success: true });
});

module.exports = {
  createNews,
  getAllNewss,
  getNewsById,
  updateNewsById,
  deleteNewsById,
};

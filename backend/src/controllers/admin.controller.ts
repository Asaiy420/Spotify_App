import express, { NextFunction, Request, Response } from "express";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

// helper function to upload files to Cloudinary

const uploadToCloudinary = async (file: any) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto", // Automatically detect the resource type (image, video, etc.)
    });
    return result.secure_url; // Return the secure URL of the uploaded file
  } catch (error: any) {
    console.error("Error uploading to Cloudinary:", error.message);
    throw new Error("Failed to upload file to Cloudinary"); 
  }
};

export const createSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      return res.status(400).json({ error: "All files are required" });
    }

    const { title, artist, albumId, duration } = req.body;
    const audioFile = req.files.audioFile;
    const imageFile = req.files.imageFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = new Song({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId || null,
    });
    await song.save();

    // If an albumId is provided, update the album to include the new song
    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    return res.status(201).json(song);
  } catch (error: any) {
    console.error("Error creating song:", error.message);
    next(error); // Pass the error to the next middleware
  }
};

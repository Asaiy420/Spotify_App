import express, { NextFunction, Request, Response } from "express";
import { Song } from "../models/song.model.js";
import { Album } from "../models/album.model.js";
import cloudinary from "../lib/cloudinary.js";

export const checkAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    return res.status(200).json({ Admin: true });
  } catch (error: any) {
    console.error("Error checking admin:", error.message);
    next(error);
  }
};

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
        $push: { songs: song._id }, // Add the song ID to the album's songs array
      });
    }

    return res.status(201).json(song);
  } catch (error: any) {
    console.error("Error creating song:", error.message);
    next(error); // Pass the error to the next middleware
  }
};

export const deleteSong = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    const song = await Song.findById(id);

    // check if song belongs to an album

    if (song?.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id }, // Remove the song ID from the album's songs array
      });
    }
    await Song.findByIdAndDelete(id);

    return res.status(200).json({ message: "Song deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting song:", error.message);
    next(error);
  }
};

export const createAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    if (!req.files || !req.files.imageFile) {
      return res.status(400).json({ error: "Image file is required" });
    }

    const { title, artist, releaseYear } = req.body;

    const { imageFile } = req.files;
    const imageUrl = await uploadToCloudinary(imageFile);

    const album = new Album({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    await album.save();
    return res.status(201).json(album);
  } catch (error: any) {
    console.error("Error creating album:", error.message);
    next(error);
  }
};

export const deleteAlbum = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { id } = req.params;

    const album = await Album.findById(id);

    if (!album) {
      return res.status(404).json({ error: "Album not found" });
    }

    // delete all songs associated with the album
    if (album.songs.length > 0) {
      await Song.deleteMany({ _id: { $in: album.songs } });
    }
    await Album.findByIdAndDelete(id);

    return res.status(200).json({ message: "Album deleted successfully" });
  } catch (error: any) {
    console.error("Error deleting album:", error.message);
    next(error);
  }
};

import express, { Request, Response, NextFunction } from "express";
import { Album } from "../models/album.model.js";

export const getAllAlbums = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const albums = await Album.find();

    if (!albums) {
      return res.status(404).json({ message: "No albums found" });
    }

    return res.status(200).json(albums);
  } catch (error: any) {
    console.error("Error fetching albums:", error.message);
    next(error);
  }
};

export const getAlbumById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const { albumId } = req.params;
    // populate the songs array with the song details
    const album = await Album.findById(albumId).populate("songs");

    if (!album) {
      return res.status(404).json({ message: "Album not found" });
    }

    return res.status(200).json(album);
  } catch (error: any) {
    console.error("Error fetching album:", error.message);
    next(error);
  }
};

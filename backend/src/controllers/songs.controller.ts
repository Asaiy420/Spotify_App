import express, { Request, Response, NextFunction } from "express";
import { Song } from "../models/song.model.js";

export const getAllSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // sort by createdAt in descending order that is newest song => oldest song
    const songs = await Song.find().sort({ createdAt: -1 });

    if (!songs) {
      return res.status(404).json({
        message: "No songs found",
      });
    }
    return res.status(200).json(songs);
  } catch (error: any) {
    console.error("Error in getAllSongs controller", error.message);
    next(error);
  }
};

export const getFeaturedSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    // get 6 random songs
    const songs = await Song.aggregate([
      {
        $sample: { size: 6 },
      },
      {
        $project: {
          // only get these fields 1 => means include it in the response
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json(songs);
  } catch (error: any) {
    console.error("Error in getFeaturedSongs controller", error.message);
    next(error);
  }
};

export const getMadeForYouSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 4 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json(songs);
  } catch (error: any) {
    console.error("Error in getMadeForYouSongs controller", error.message);
    next(error);
  }
};

export const getTrendingSongs = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const songs = await Song.aggregate([
      {
        $sample: { size: 5 },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          artist: 1,
          imageUrl: 1,
          audioUrl: 1,
        },
      },
    ]);

    return res.status(200).json(songs);
  } catch (error: any) {
    console.error("Error in getTrendingSongs controller", error.message);
    next(error);
  }
};

import express, { Request, Response, NextFunction } from "express";
import { Song } from "../models/song.model.js";
import { User } from "../models/user.model.js";
import { Album } from "../models/album.model.js";

export const getStats = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  try {
    const [totalSongs, totalAlbums, totalUsers, uniqueArtists] =
      await Promise.all([
        Song.countDocuments(),
        Album.countDocuments(),
        User.countDocuments(),

        Song.aggregate([
          {
            $unionWith: {
              coll: "albums",
              pipeline: [],
            },
          },
          {
            $group: {
              _id: "$artist",
            },
          },
          {
            $count: "count",
          },
        ]),
      ]);
    res.status(200).json({
      totalAlbums,
      totalSongs,
      totalUsers,
      uniqueArtists,
    });
  } catch (error: any) {
    console.error("Error fetching stats:", error.message);
    next(error);
  }
};

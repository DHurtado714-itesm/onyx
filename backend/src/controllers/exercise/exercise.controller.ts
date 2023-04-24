// import { Request, Response } from "express";
// import { uuid } from "uuidv4";
import Exercise from "../../models/Exercise/exercise.model";
import pool from "../../db/connection";
import { IauxExercise } from "../../interfaces/Exercises.interface";
import { exec } from "child_process";
// import { IExercise } from "../../interfaces/Exercises.interface";

export const newExercise = async (req, res) => {
	try {
		const { name, description, imageSrc } = req.body;
		const newExercise = new Exercise(name, description, "");
		const imageId = await newExercise.createImage(imageSrc);
		if (imageId === null) {
			res
				.status(400)
				.json({ msg: "Error creating image", auth: true, data: {} });
			return;
		}
		newExercise.imageId = imageId;
		const createdExercise = await newExercise.newExercise();
		res.json({ msg: "", data: {}, auth: true });
	} catch (error) {
		console.log(error);
		res.status(500).json({ msg: "Error del servidor", auth: true, data: {} });
	}
};

export const getAll = async (req: any, res: any) => {
	try {
		const { filtro } = req.query;

		const rowsExercises = await Exercise.fetch(filtro);

		const exercises: {
			[key: string]: IauxExercise;
		} = {};

		for (let i = 0; i < rowsExercises.length; i++) {
			const e = rowsExercises[i];

			exercises[e.id] = {
				...e,
			};
		}

		return res.json({
			msg: "",
			data: {
				data: Object.values(exercises),
			},
			auth: true,
		});
	} catch (error) {
		console.log(error);
		return res.json({
			msg: "Error del servidor",
			data: {
				data: [],
			},
			auth: true,
		});
	}
};
import pool from '../../db/connection';
import type { IDiet } from '../../interfaces/Diet.interface';

export default class Diet {
    constructor () { }

    static async findAll(clientId: string, {
        calories,
        ingredient
    }: {
        calories: number | undefined;
        ingredient: string | undefined;
    }):Promise<IDiet[]> {
        const myArray = [clientId];

        if(calories !== undefined) {
            myArray.push(`${JSON.stringify(calories).slice(1, JSON.stringify(calories).length - 1)}`);
        } else{
            myArray.push('%');
        }
        
        if(ingredient !== undefined) {
            myArray.push(`${JSON.stringify(ingredient).slice(1, JSON.stringify(ingredient).length - 1)}%`);
        } else {
            myArray.push('%');
        }

        const [rows] = await pool.execute(`
            SELECT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros,
                IF(cd.clientId = ? AND cd.dietId = d.id, true, false) AS liked
            FROM diet d, ingredient i, clientDiet cd
            WHERE d.id = i.dietId
            AND d.calories LIKE ?
            AND i.name LIKE ?`, myArray);

        return rows;
    }

    static async findAllFavs(clientId: string):Promise<IDiet[]> {
        const [rows] = await pool.execute(`
            SELECT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros
            FROM clientDiet cd, diet d
            WHERE cd.dietId = d.id
            AND cd.clientId = ?`, [clientId]);
        return rows;
    }

    static async fetchTop3(clientId: string):Promise<IDiet[]> {
        const [rows] = await pool.execute(`
            SELECT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros
            FROM clientDiet cd, diet d
            WHERE cd.dietId = d.id
            AND cd.clientId = ?
            LIMIT 3`, [clientId]);
        return rows;
    }

    static async findCalories():Promise<IDiet[]> {
        const [rows] = await pool.execute(`
            SELECT DISTINCT calories
            FROM diet;`);
        return rows;
    }

    static async findInfo(clientId: string, dietId: string): Promise<IDiet[]> {

        const [rows] = await pool.execute(`
            SELECT d.id AS id, d.name AS name, d.calories AS calories, d.macros AS macros, d.micros AS micros, i.name AS ingredient, i.quantity AS quantity, i.unit AS unit,
                IF(cd.clientId = ? AND cd.dietId = d.id, true, false) AS liked
            FROM diet d, ingredient i, clientDiet cd
            WHERE d.id = i.dietId
                AND d.id = ?
            GROUP BY ingredient`, [clientId, dietId]);
        return rows;
    }
}
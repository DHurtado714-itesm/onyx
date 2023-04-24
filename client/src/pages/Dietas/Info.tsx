import React from "react";
import Dashboard from "../../layouts/Dashboard/Dashboard";
import styles from "./Info_styles/Info.module.css";
import { useSearchParams } from "react-router-dom";
import { getDiet, setDietStatus } from "../../routes/diets/diet.routes";
import { useNavigate } from "react-router";
import { MessagesContext } from "../../layouts/Messages/Messages";
import { useEffect, useState, useContext } from "react";
import notFavicon from "./images/notFavico.svg";
import favicon from "./images/favicon.svg";
import trash from "./images/trash.png";
import edit from "./images/pencil.png";
import { AppContext } from "../../App";
import { EditarDieta } from "./EditarDieta";

export const Info = () => {
    const navigate = useNavigate();
    const { addStaticMsg } = useContext(MessagesContext);
    const { user } = useContext(AppContext);
    const [searchParams] = useSearchParams();

    const [diet, setDiet] = useState<any>({});
    const [isFab, setIsFab] = useState<any>(-1);
    const [isOpenEditar, setIsOpenEditar] = useState<any>(false);

	const setDietStatusController = (dietId: string): void => {
		const doFetch = async (): Promise<void> => {
			if (isFab !== -1) {
				await setDietStatus(false, dietId);
			} else {
				await setDietStatus(true, dietId);
			}

			getDietController();
		};

		void doFetch();
	};

	const getDietController = (): void => {
		const doFetch = async (): Promise<void> => {
			const resData = await getDiet(searchParams.get("dietId"));

			if (resData === null) {
				addStaticMsg("Error al obtener la dieta", "danger");
				return;
			}

			if (resData.msg !== "") {
				addStaticMsg(resData.msg, "danger");
				return;
			}

			const data = resData.data;

			if (data === null) {
				return;
			}

			setDiet(data.diet);
			setIsFab(data.liked);
		};
		void doFetch();
	};

    useEffect(() => {
        getDietController();
    }, [isFab]);
    
	return (
		<Dashboard>
			<div className={styles.layout}>
				<div className={styles.titulo}>
					<a href="#" onClick={(e) => navigate("/dietas")}>&larr;</a>
					<h1>Dieta {diet.name}</h1>
					<div>
						{user?.role === "Administrador" && (
							<>
								<img src={edit} onClick={(e) => {setIsOpenEditar(true)}}/>
								<img src={trash}/>
								<EditarDieta isOpen={isOpenEditar} setIsOpen={setIsOpenEditar} dietId={searchParams.get('dietId') || ""}></EditarDieta>
							</>
						)}
						<img src={isFab !== -1? favicon:notFavicon} onClick={(e) => setDietStatusController(searchParams.get('dietId') || "")} alt="Icono favoritos"/>
					</div>
				</div>

				<div className={styles.diet_info}>
					{diet.macros && (
						<div className={styles.macros}>
							<h1>Macronutrientes</h1>

							<table className={styles.info}>
								<thead>
									<tr>
										<th>Meta</th>
										<th>Proteínas (g)</th>
										<th>Carbs (g)</th>
										<th>Grasas (g)</th>
										<th>Calorías</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Total</td>
										<td>{JSON.parse(diet.macros).proteina}</td>
										<td>{JSON.parse(diet.macros).carbohidratos}</td>
										<td>{JSON.parse(diet.macros).grasas}</td>
										<td>{diet.calories}</td>
									</tr>
								</tbody>
							</table>
						</div>
					)}

					<div className={styles.alimentos}>
						<h1>Alimentos</h1>

						<table className={styles.info}>
							<thead>
								<tr>
									<th>Alimento</th>
									<th>Cantidad</th>
									<th>Medida</th>
								</tr>
				
							</thead>
							<tbody>
								{diet.ingredients &&
									diet.ingredients.map((element: any, key: number) => {
										return (
											<tr key={key}>
												<td>{JSON.parse(element).name}</td>
												<td>{JSON.parse(element).quantity}</td>
												<td>{JSON.parse(element).unit}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>

					<div className={styles.micros}>
						<h1>Micronutrientes</h1>

						{diet.micros && (
							<table className={styles.alter_info}>
								<thead>
									<tr>
										<th>Nutriente</th>
										<th>Cantidad real(µg)</th>
										<th>Cantidad recomendada(µg)</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Ac. fólico</td>
										<td>{JSON.parse(diet.micros)["Ácido fólico"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Ac. Grasos mono-in</td>
										<td>{JSON.parse(diet.micros)["Ac grasos mono-in"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Ac. Grasos poli</td>
										<td>{JSON.parse(diet.micros)["Ac grasos poli"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Ac. Grasos saturados</td>
										<td>{JSON.parse(diet.micros)["Ac grasos saturados"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Calcio</td>
										<td>{JSON.parse(diet.micros)["Calcio"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Ceniza</td>
										<td>{JSON.parse(diet.micros)["Ceniza"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Colesterol</td>
										<td>{JSON.parse(diet.micros)["Colesterol"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Fibra</td>
										<td>{JSON.parse(diet.micros)["Fibra"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Folato Eq.</td>
										<td>{JSON.parse(diet.micros)["Folato Eq."]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Fósforo</td>
										<td>{JSON.parse(diet.micros)["Fósforo"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Hierro</td>
										<td>{JSON.parse(diet.micros)["Hierro"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Magnesio</td>
										<td>{JSON.parse(diet.micros)["Magnesio"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Niacina</td>
										<td>{JSON.parse(diet.micros)["Niacina"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Potasio</td>
										<td>{JSON.parse(diet.micros)["Potasio"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Riboflavina</td>
										<td>{JSON.parse(diet.micros)["Riboflavina"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Sodio</td>
										<td>{JSON.parse(diet.micros)["Sodio"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Tiamina</td>
										<td>{JSON.parse(diet.micros)["Tiamina"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Vitamina A</td>
										<td>{JSON.parse(diet.micros)["Vitamina A"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Vitamina B12</td>
										<td>{JSON.parse(diet.micros)["Vitamina B12"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Vitamina B6</td>
										<td>{JSON.parse(diet.micros)["Vitamina B6"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Vitamina C</td>
										<td>{JSON.parse(diet.micros)["Vitamina C"]}</td>
										<td>testValue</td>
									</tr>
									<tr>
										<td>Zinc</td>
										<td>{JSON.parse(diet.micros)["Zinc"]}</td>
										<td>testValue</td>
									</tr>
								</tbody>
							</table>
						)}
					</div>
				</div>
			</div>
		</Dashboard>
	);
};
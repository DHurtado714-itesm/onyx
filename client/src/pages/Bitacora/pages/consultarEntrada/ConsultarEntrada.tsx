import styles from "./ConsultarEntrada.module.css";
import leftArrow from "../../icons/left-arrow.png";
import deleteIcon from "../../icons/trash.png";
import download from "../../icons/download.png";
import { Link, useParams } from "react-router-dom";
import {
	getEntry,
} from "../../../../routes/bitacora/bitacora.routes";
import { useState, useEffect, useContext } from "react";
import { MessagesContext } from "../../../../layouts/Messages/Messages";

function AgregarEntrada() {
	const { addStaticMsg } = useContext(MessagesContext);
	const params = useParams();

	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");
	const [date, setDate] = useState<any>(new Date());

	// A React no le gusta llamar funciones asincroncas directamente del
	// html... por eso cree una sin async, que dentro de ella
	// llama a una funcion asincrona
	useEffect(() => {
		const fetchEntry = async () => {
			try {
				const resData = await getEntry(params.id || "");

				if (resData === null) {
					addStaticMsg("Error al obtener la entrada", "danger");
					return;
				}

				if (resData.msg !== "") {
					addStaticMsg(resData.msg, "danger");
					return;
				}

				const data = resData.data;

				setTitle(data[0].title);
				setContent(data[0].content);
				setDate(new Date(data[0].aDate));
			} catch (error) {
				console.log(error);
			}
		};
		fetchEntry();
	}, []);

	return (
		<div className={styles.page}>
			<div className={styles.header}>
				<div className={styles.regresar}>
					<Link className={styles.link} to="/bitacora">
						<img className={styles.icon} src={leftArrow} />
					</Link>
					<Link className={styles.link} to="/bitacora">
						<p className={styles.close}>Regresar</p>
					</Link>
				</div>
				<input
					className={styles.title_input}
					type="text"
					name="title"
					id="my-input"
					value={title}
					onChange={(event) => {
						// event es la variable que tiene como valor
						// el input

						// para acceder al valor actual de input
						// lo accedemos de event.target.value
						setTitle(event.target.value);
					}}
					placeholder="Untitled"
				/>
				<div className={styles.right}>
					{/* <img className={styles.icon} src={create} /> */}
					<img className={styles.icon} src={deleteIcon} />
					<img className={styles.icon} src={download} />
				</div>
			</div>
			<div className={styles.info_row}>
				<div className={styles.date_input}>

					{date.getMonth() + 1}/{date.getDate()}/{date.getFullYear()}
				</div>
			</div>

			<div className={styles.content}>
				<textarea
					name="content"
					placeholder="Agrega comentarios..."
					value={content}
					onChange={(event) => {
						// event es la variable que tiene como valor
						// el input

						// para acceder al valor actual de input
						// lo accedemos de event.target.value
						setContent(event.target.value);
					}}
				/>
			</div>
			{/* <button onClick={onSubmit} className={styles.botonEntrada}>Guardar</button> */}
		</div>
	);
}

export default AgregarEntrada;
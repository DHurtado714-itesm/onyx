import styles from "./ConsultarEntrada.module.css";
import create from "../../icons/writing.png";
import leftArrow from "../../icons/left-arrow.png";
import deleteIcon from "../../icons/trash.png";
import download from "../../icons/download.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
	createEntry,
	getEntry,
} from "../../../../routes/bitacora/bitacora.routes";
import { useState, useEffect } from "react";

function AgregarEntrada() {
	const navigation = useNavigate();

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
				const data:any = await getEntry(params.id || "");
				console.log(data);
				setTitle(data[0].title);
				setContent(data[0].content);
				setDate(new Date(data[0].aDate));
				console.log(new Date(data[0].aDate))
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

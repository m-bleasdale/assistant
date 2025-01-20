import Image from "next/image";
import styles from "./styles/page.module.css";
import MessageInput from "@/components/Input/MessageInput";
import Chat from "@/components/Chat/Chat";

export default function Home() {
	return (
		<div className={styles.page}>
			<div className={styles.sidebar} id={styles.left}>

			</div>
			<div className={styles.main}>
				<Chat />
				<MessageInput />
			</div>
			<div className={styles.sidebar} id={styles.right}>
				
			</div>
		</div>
		
	);
}

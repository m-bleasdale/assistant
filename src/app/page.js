import Image from "next/image";
import styles from "./styles/page.module.css";
import MessageInput from "@/components/Input/MessageInput";
import Chat from "@/components/Chat/Chat";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function Home() {
	return (
		<div className={styles.page}>
			<Sidebar title="Assistant"/>
			<div className={styles.main}>
				<Chat />
				<MessageInput />
			</div>
			<Sidebar title="Your Calender"/>
		</div>
		
	);
}

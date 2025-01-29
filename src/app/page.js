import Image from "next/image";
import styles from "./styles/page.module.css";
import MessageInput from "@/components/Input/MessageInput";
import Chat from "@/components/Chat/Chat";
import SidebarLeft from "@/components/Sidebar/SidebarLeft";
import SidebarRight from "@/components/Sidebar/SidebarRight";

export default function Home() {
	return (
		<div className={styles.page}>
			<SidebarLeft />
			<div className={styles.main}>
				<Chat />
				<MessageInput />
			</div>
			<SidebarRight />
		</div>
		
	);
}

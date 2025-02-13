'use client';
import { useUser } from '@auth0/nextjs-auth0/client';

import styles from "./styles/page.module.css";

import MessageInput from "@/components/Input/MessageInput";
import Chat from "@/components/Chat/Chat";
import SidebarLeft from "@/components/Sidebar/SidebarLeft";
import SidebarRight from "@/components/Sidebar/SidebarRight";
import LoadingPage from '@/components/LoadingPage/LoadingPage';

export default function Home() {
    const { user, error, isLoading } = useUser();
	if(!user && !isLoading) window.location.href = "/api/auth/login"; //redirect to login
	if(error) console.error(error); 

	if(isLoading) return (
		<LoadingPage />
	)
	
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

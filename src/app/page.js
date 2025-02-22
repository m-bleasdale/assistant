'use client';
import { useSession } from 'next-auth/react';

import { Suspense } from 'react';

import styles from "./styles/page.module.css";

import MessageInput from "@/components/Input/MessageInput";
import Chat from "@/components/Chat/Chat";
import SidebarLeft from "@/components/Sidebar/SidebarLeft";
import SidebarRight from "@/components/Sidebar/SidebarRight";
import LoadingPage from '@/components/LoadingPage/LoadingPage';
import Login from '@/components/Login/Login';

export default function Home() {
	const { data: session, status } = useSession();
	if(status === "loading") return <LoadingPage />
	if(!session || status === "unauthenticated") return <Login />
	
	return (
		<Suspense fallback={<LoadingPage />}>
			<div className={styles.page}>
				<SidebarLeft />
				<div className={styles.main}>
					<Chat />
					<MessageInput />
				</div>
				<SidebarRight />
			</div>
		</Suspense>
	);
}

// "use client"; // This is a client component 👈🏽
import Email from "./Email.client"
import { listInbox } from '@email-app/email'
import dataConnect from "@/data-connect";

export default async function Home() {
	// Change the uid value to see emails from different users
	// Stay tuned for an update that will combine Data Connect with
	// Firebase Auth!
	// uids from the data seed: user_david, user_tyler, user_bleigh, user_jeanine
	const uid = "user_jeanine"
	// This is the URL needed to configure the reverse proxy so that all requests
	// are sent through the Vite dev server and we can avoid CORS issues from the local
	// Data Connect emulator server. If this code is being executed on the
	// server we only need localhost.
	const host = process.env.WEB_HOST!
	const dc = dataConnect('localhost');
	const { data } = await listInbox(dc, { uid })
	return (
		<Email 
			initialEmails={data.emails}
			uid={uid}
			host={host}
		 />
	);
}
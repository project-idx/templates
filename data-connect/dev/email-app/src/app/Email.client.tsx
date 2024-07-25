/*
  Copyright 2024 Google LLC
  
  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.  
  
  You may obtain a copy of the License at
  
   https://www.apache.org/licenses/LICENSE-2.0
  
  Unless required by applicable law or agreed to in writing, software
  distributed  
  under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing  
  permissions and
  limitations under the License.
*/
"use client"; // This is a client component 👈🏽

import Sidebar from "./Sidebar.client";
import ComposeModal from "./ComposeModal.client";
import { useEffect, useState } from "react";
import { ListInboxResponse, listInbox, deleteEmail } from '@email-app/email'
import dataConnect from "@/data-connect";

interface Props {
	uid: string;
	initialEmails: ListInboxResponse['emails'];
	host: string;
}

export default function Email({initialEmails, uid, host}: Props) {
	const [selectedEmail, setSelectedEmail] = useState(initialEmails[0]); // Default to the first email
	const [isComposeOpen, setIsComposeOpen] = useState(false);
	const [emails, setEmails] = useState<ListInboxResponse['emails']>([]);
	const dc = dataConnect(host);

  useEffect(() => {
    listInbox(dc, { uid })
      .then(res => {
        setEmails(res.data.emails);
      })
  }, [emails, isComposeOpen]);

	return (
		<>
			{/* Sidebar */}
			<Sidebar
				emails={emails}
				selectedEmail={selectedEmail}
				setSelectedEmail={setSelectedEmail}
				setIsComposeOpen={setIsComposeOpen}
			/>

			{/* Main pane */}
			<main className="col-span-2 border-l flex flex-col">
				{/* Actions */}

				<header className="header-bar justify-end pr-4">
					<button className="button" aria-label="Delete"
            onClick={async () => {
              await deleteEmail(dc, { uid: "user_david", emailId: selectedEmail.id })
              setEmails([...emails.filter(email => email.id !== selectedEmail.id)]);
            }}>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 -960 960 960"
							className="w-5"
						>
							<path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
						</svg>
					</button>
				</header>
				{/* Email details */}
				<div className="relative flex flex-col flex-grow p-8 pb-0 overflow-y-auto h-[400px]">
					<div className="flex flex-col border-b pb-4">
						{/* Metadata */}
						<div className="flex items-baseline gap-2 justify-between mb-3">
							{/* Sender */}
							<div className="flex gap-2 items-baseline">
								<span className="font-medium">{selectedEmail.sender.name}</span>
								<span className="text-sm text-gray-700">
									{selectedEmail.sender.email}
								</span>{" "}
							</div>

							{/* Time */}
							<time className="text-sm">{selectedEmail.date}</time>
						</div>

						{/* Subject */}
						<p className="font-medium text-2xl font-display">
							{selectedEmail.subject}
						</p>
					</div>

					<article className="py-4">
            {selectedEmail.content}
          </article>
				</div>
			</main>

			<ComposeModal 
				uid={uid} 
				isOpen={isComposeOpen} 
				onClose={() => setIsComposeOpen(false)} 
				dc={dc} />
		</>
	);
}

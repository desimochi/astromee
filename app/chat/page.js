// app/chat/page.tsx or page.jsx
'use client'; // If you're using the app directory and need client-only behavior

import dynamic from 'next/dynamic';

const ChatComponent = dynamic(() => import('@/componenet/ChatClient'), {
  ssr: false,
});

export default function ChatPage() {
  return <ChatComponent />;
}

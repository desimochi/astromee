"use client";
import { useEffect, useRef, useState } from "react";
import AgoraChat from "agora-chat";

const APP_KEY = "611341527#1546390"; // Replace with your actual AppKey

export default function ChatClient() {
  const chatClient = useRef(null);
  const [userId, setUserId] = useState("");
  const [token, setToken] = useState("");
  const [peerId, setPeerId] = useState("");
  const [message, setMessage] = useState("");
  const [logs, setLogs] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const addLog = (log) => {
    setLogs((prev) => [...prev, log]);
  };

  const handleLogin = () => {
    if (!userId || !token) return addLog("Enter User ID and Token");
    chatClient.current.open({
      user: userId,
      accessToken: token,
    });
  };

  const handleLogout = () => {
    chatClient.current.close();
    setIsLoggedIn(false);
    setUserId("");
    setToken("");
    setPeerId("");
    addLog("Logged out");
  };

  const handleSendMessage = async () => {
    if (!message || !peerId) return addLog("Enter recipient and message");
    const msg = AgoraChat.message.create({
      type: "txt",
      chatType: "singleChat",
      to: peerId,
      msg: message,
    });

    try {
      await chatClient.current.send(msg);
      addLog(`You: ${message}`);
      setMessage("");
    } catch (e) {
      addLog(`Send error: ${e.message}`);
    }
  };

  useEffect(() => {
    const conn = new AgoraChat.connection({ appKey: APP_KEY });
    chatClient.current = conn;

    conn.addEventHandler("main", {
      onConnected: () => {
        setIsLoggedIn(true);
        addLog("Connected to Agora Chat");
      },
      onDisconnected: () => {
        setIsLoggedIn(false);
        addLog("Disconnected");
      },
      onTextMessage: (msg) => {
        addLog(`${msg.from}: ${msg.msg}`);
      },
      onTokenWillExpire: () => addLog("Token expiring soon"),
      onTokenExpired: () => addLog("Token expired"),
    });
  }, []);

  return (
    <div style={{ maxWidth: 500, margin: "auto", padding: 120 }}>
      <h2>Agora Chat</h2>
      {!isLoggedIn ? (
        <>
          <input placeholder="User ID" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <input placeholder="Token" value={token} onChange={(e) => setToken(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
        </>
      ) : (
        <>
          <div>Logged in as: {userId}</div>
          <input placeholder="Send to user" value={peerId} onChange={(e) => setPeerId(e.target.value)} />
          <input placeholder="Your message" value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={handleSendMessage}>Send</button>
          <button onClick={handleLogout}>Logout</button>
        </>
      )}
      <div style={{ marginTop: 20, height: 200, overflowY: "scroll", border: "1px solid gray", padding: 10 }}>
        {logs.map((log, idx) => (
          <div key={idx}>{log}</div>
        ))}
      </div>
    </div>
  );
}

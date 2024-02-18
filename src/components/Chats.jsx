import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ChatEngine } from "react-chat-engine";
import { auth } from "../firebase";
import { useAuth } from "../contexts/AuthContext";

export default function Chats() {
  const didMountRef = useRef(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const history = useNavigate();

  const handleLogout = async () => {
    await auth.signOut();
    history("/");
  };

  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();
    return new File([data], "userPhoto.jpg", { type: "image/jpeg" });
  };

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        history("/");
        return;
      }

      try {
        const res = await axios.get("https://api.chatengine.io/users/me", {
          headers: {
            "project-id": 'a1a0901c-e6e5-4590-9580-5c6181a8f7ca',
            "user-name": user.email,
            "user-secret": user.uid,
          },
        });
        setLoading(false);
        console.log("Response", res);
      } catch (error) {
        console.error(error);
        const formdata = new FormData();
        formdata.append("email", user.email);
        formdata.append("username", user.email);
        formdata.append("secret", user.uid);

        const avatar = await getFile(user.photoURL);

        formdata.append("avatar", avatar, avatar.name);

        try {
          await axios.post("https://api.chatengine.io/users", formdata, {
            headers: {
              "private-key": '60ae2cfd-5c79-4af3-a612-08ec471e3853',
            },
          });
          setLoading(false);
          console.log("success here");
        } catch (error) {
          console.error("Error:", error);

          if (error.response) {
            console.error("Response data:", error.response.data);
            console.error("Response status:", error.response.status);
            console.error("Response headers:", error.response.headers);
          }
        }
      }
    };

    if (!didMountRef.current) {
      didMountRef.current = true;
      loadData();
    }
  }, [user, history]);

  if (!user || loading) return "Loading...";

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">ChatterHub</div>
        <div onClick={handleLogout} className="logout-tab">
          Logout
        </div>
      </div>

      <ChatEngine
        height="calc(100vh - 66px)"
        projectID='a1a0901c-e6e5-4590-9580-5c6181a8f7ca'
        userName={user.email}
        userSecret={user.uid}
      />
    </div>
  );
}

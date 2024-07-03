/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";

const APP_KEY = "1f0911e639526f5b11b8";
const APP_CLUSTER = "eu";

const token = "6|UN5rhKQzGARwyCg0FotBjkxzIqXaGWe8yqUs5jCNe90d9a50";
const userId = "9c5edc2c-28b3-4441-a4e7-8a9178eb4361";

const headers = {
  Authorization: `Bearer ${token}`,
};

export default function ProductPublished() {
  const [data, setData] = useState();

  useEffect(() => {
    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER,
      forceTLS: false, // Disable TLS for local HTTP
      authEndpoint: "http://localhost:8000/broadcasting/auth", // Ensure this points to your Laravel server
      auth: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    pusher.connection.bind("error", (err: any) => {
      console.log("push err", err);
    });

    pusher.connection.bind("connected", () => {
      console.log("connected!");
    });

    const channel = pusher.subscribe(`private-users.${userId}`);

   //  channel.bind_global((data: any) => {
   //    console.log("here global");

   //    console.log(data);
   //  });

    channel.bind("product-published", (data: any) => {
      console.log("here");
      console.log(data);
    });

    // Cleanup
    return () => {
      pusher.unsubscribe(`private-users.${userId}`);
    };
  }, [data]);

  async function triggerEventHandler() {
    try {
      const res = await axios.get("/api/users/test", { headers });
      console.log("me", res.data);
      setData(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  return (
    <div>
      <button onClick={triggerEventHandler}>click me</button>
    </div>
  );
}

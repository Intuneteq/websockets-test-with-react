import React, { useEffect, useState } from "react";
import Pusher from "pusher-js";
import axios from "axios";

// Define your types
interface NotificationData {
  user_id: string;
  order_id: string;
  quantity: number;
  total_amount: number;
  product_title: string;
}

const APP_KEY = "1f0911e639526f5b11b8";
const APP_CLUSTER = "eu";
const token = "12|2j6ZZwCvf8OlaXWbbS5jV9ToM5J0aTRQaBlai0R066c8b9eb";
const userId = "9c386ff7-8a81-432c-a190-9620f7ef4fa4";

const PusherComponent: React.FC = () => {
  const [newOrder, setNewOrder] = useState<boolean>(false);
  const [count, setCount] = useState(0);

  const headers = {
    Authorization: "Bearer 1|mWhrSvIZf3dk1sALBszA1ps0isvaJEZqCUTJXgQH8a0958e5",
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get("/api/orders/unseen", { headers });
        console.log("me", res.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();

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

    channel.bind("order-created", (data: NotificationData) => {
      console.log("here");
      console.log(data);
      setNewOrder(true);
    });

    // Cleanup
    return () => {
      // pusher.unsubscribe(`private-users.${userId}`);
    };
  }, []);

  return <div>PusherComponent {count}</div>;
};

export default PusherComponent;

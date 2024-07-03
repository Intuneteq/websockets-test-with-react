import { useEffect, useState } from "react";
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
const token = "1|mWhrSvIZf3dk1sALBszA1ps0isvaJEZqCUTJXgQH8a0958e5";
const userId = "9c386ff7-8a81-432c-a190-9620f7ef4fa4";

export default function PusherEvent() {
  const [newOrder, setNewOrder] = useState<NotificationData>();
  const [count, setCount] = useState(0);

  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchUnseenCount = async () => {
      try {
        const res = await axios.get("/api/orders/unseen", { headers });
        console.log("me", res.data);
      //   setCount(res.data.data.count);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUnseenCount();

    const pusher = new Pusher(APP_KEY, {
      cluster: APP_CLUSTER,
      forceTLS: false, // Disable TLS for local HTTP
      authEndpoint: "http://localhost:8000/broadcasting/auth", 
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

    const channel = pusher.subscribe(`private-order-created.${userId}`);

    channel.bind("order-created", (data: NotificationData) => {
      console.log("here");
      console.log(data);

      setCount((prev) => prev + 1);
      setNewOrder(data);
    });

    // Cleanup
    return () => {
      pusher.unsubscribe(`private-order-created.${userId}`);
    };
  });

  return (
    <div>
      <h1>Pusher component</h1>
      <h1>{count}</h1>
      <div>{JSON.stringify(newOrder)}</div>
    </div>
  );
}

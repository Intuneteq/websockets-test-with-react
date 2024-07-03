import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Redirect from "./Redirect";
import PusherComponent from "./PusherComponent";
import PusherEvent from "./PusherEvent";
import FirstProductCreated from "./FirstProductCreated";
import ProductPublished from "./ProductPublished";
import PayoutCardAdded from "./PayoutCardAdded";

const router = createBrowserRouter([
   {
      path: "/",
      element: <App />,
   },
   {
      path: "/auth/redirect",
      element: <Redirect />,
   },
   {
      path: '/pusher',
      element: <PusherComponent />
   },
   {
      path: '/pusher-event',
      element: <PusherEvent />
   },
   {
      path: '/first-product-created',
      element: <FirstProductCreated />
   },
   {
      path: '/product-published',
      element: <ProductPublished />
   },
   {
      path: '/payout-card-added',
      element: <PayoutCardAdded />
   },
]);

export default router;
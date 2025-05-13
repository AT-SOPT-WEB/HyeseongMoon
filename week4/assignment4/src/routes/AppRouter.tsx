import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import MyInfo from "@/pages/MyInfo";
import MemberSearch from "@/pages/MemberSearch";

const routes = [
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/mypage",
    element: <MyInfo />,
  },
  {
    path: "/search",
    element: <MemberSearch />,
  },
];

export default routes;

import { createBrowserHistory } from "history";
import { Router, Switch } from "react-router-dom";
import HomeTemplate from "./templates/HomeTemplate/HomeTemplate";
import Home from "./pages/Home/Home";
import DrawerHOC from "./HOC/DrawerHOC/DrawerHOC";
import ModalHOC from "./HOC/ModalHOC/ModalHOC";
import UserTemplate from "./templates/UserTemplate/UserTemplate";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Detail from "./pages/Detail/Detail";
import ScrollToTop from "./util/scrollToTop/ScrollToTop";
import Loading from "./components/Loading/Loading";
import CheckOutTemplate from "./templates/CheckOutTemplate/CheckOutTemplate";
import CheckOut from "./pages/CheckOut/CheckOut";
import Profile from "./pages/Profile/Profile";
import AdminTemplate from "./templates/AdminTemplate/AdminTemplate";
import UserManagement from "./pages/UserManagement/UserManagement";
import FilmManagement from "./pages/FilmManagement/FilmManagement";
import CinemaManagement from "./pages/CinemaManagement/CinemaManagement";
import Statistics from "./pages/Statistics/Statistics";
import UserAdd from "./pages/UserManagement/UserAdd";
import FilmAdd from "./pages/FilmManagement/FilmAdd";
import FilmEdit from "./pages/FilmManagement/FilmEdit";
import CinemaDetail from "./pages/CinemaManagement/CinemaDetail";
import CinemaTaoLichChieu from "./pages/CinemaManagement/CinemaTaoLichChieu";
import CinemaShowtime from "./pages/CinemaManagement/CinemaShowtime";

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <DrawerHOC />
      <ModalHOC />
      <Loading />
      <Switch>
        <HomeTemplate exact path="/" Component={Home} />
        <HomeTemplate exact path="/home" Component={Home} />
        <HomeTemplate exact path="/detail/:id" Component={Detail} />
        <HomeTemplate exact path="/profile" Component={Profile} />
        <UserTemplate exact path="/login" Component={Login} />
        <UserTemplate exact path="/signup" Component={Signup} />
        <CheckOutTemplate exact path="/checkout/:id" Component={CheckOut} />
        <AdminTemplate exact path="/admin/statistics" Component={Statistics} />
        <AdminTemplate
          exact
          path="/admin/user/management"
          Component={UserManagement}
        />
        <AdminTemplate exact path="/admin/user/add" Component={UserAdd} />
        <AdminTemplate
          exact
          path="/admin/film/management"
          Component={FilmManagement}
        />
        <AdminTemplate exact path="/admin/film/add" Component={FilmAdd} />
        <AdminTemplate
          exact
          path="/admin/film/edit/:id/:tenPhim"
          Component={FilmEdit}
        />
        <AdminTemplate
          exact
          path="/admin/cinema/management"
          Component={CinemaManagement}
        />
        <AdminTemplate
          exact
          path="/admin/cinema/detail/:maHeThongRap/:maCumRap"
          Component={CinemaDetail}
        />
        <AdminTemplate
          exact
          path="/admin/cinema/createShowtime"
          Component={CinemaTaoLichChieu}
        />
        <AdminTemplate
          exact
          path="/admin/cinema/showtime/:maHeThongRap"
          Component={CinemaShowtime}
        />
      </Switch>
      <ScrollToTop />
    </Router>
  );
}

export default App;

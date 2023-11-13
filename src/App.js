import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/layout/Header';
import Home from './pages/Home';
import FindClothingBox from './pages/FindClothingBox';
import Init from './components/findClothingBox/Init';
import NoData from './components/findClothingBox/NoData';
import CreatePost from './pages/CreatePost';
import MyPostList from './pages/MyPostList';
import SideBar from './components/layout/SideBar';
import NanumList from './pages/NanumList';
import NanumDetail from './pages/NanumDetail';

const App = () => {
	return (
		<Routes>
			<Route element={<Header />}>
				<Route path="/" element={<Home />} />
				<Route path="sign-in" element={<SignIn />} />
				<Route path="sign-up" element={<SignUp />} />
				<Route path="nanum/create-post" element={<CreatePost />} />

				<Route path="tip-clothing-recycle" element={<NoData />} />
				<Route path="find-clothing-box" element={<FindClothingBox />}>
					<Route path="" element={<Init />} />
					<Route path="no-data" element={<NoData />} />
				</Route>
				<Route path="nanum">
					<Route path="list" element={<NanumList />} />
					<Route path="detail" element={<NanumDetail />} />
				</Route>
				<Route path="my-page/:userId">
					<Route element={<SideBar />}>
						<Route path="edit" element={<NoData />} />
						<Route path="post-list" element={<MyPostList />} />
						<Route path="comment-list" element={<NoData />} />
					</Route>
				</Route>
			</Route>
		</Routes>
	);
};

export default App;

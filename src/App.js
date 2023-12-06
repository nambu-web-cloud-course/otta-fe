import { Route, Routes } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Header from './components/layout/Header';
import Home from './pages/Home';
import FindClothingBox from './pages/FindClothingBox';
import CreatePost from './pages/CreatePost';
import MyPostList from './pages/MyPostList';
import SideBar from './components/layout/SideBar';
import NanumList from './pages/NanumList';
import NanumDetail from './pages/NanumDetail';
import MyCommentList from './pages/MyCommentList';
import CreateComment from './pages/CreateComment';
import NotFound from './pages/NotFound';
import MyInfo from './pages/MyInfo';
import TipForClothes from './pages/TipForClothes';

const App = () => {
	return (
		<Routes>
			<Route element={<Header />}>
				<Route path="/" element={<Home />} />
				<Route path="sign-in" element={<SignIn />} />
				<Route path="sign-up" element={<SignUp />} />

				<Route path="tip-clothing-recycle" element={<TipForClothes />} />
				<Route path="find-clothing-box" element={<FindClothingBox />} />
				<Route path="nanum">
					<Route path="list" element={<NanumList />} />
					<Route path="detail" element={<NanumDetail />} />
					<Route path="create-post" element={<CreatePost />} />
					<Route path=":postId/comment" element={<CreateComment />} />
				</Route>
				<Route path="nanum/:postId" element={<CreateComment />} />
				<Route path="my-page/:userId">
					<Route element={<SideBar />}>
						<Route path="edit" element={<MyInfo />} />
						<Route path="post-list" element={<MyPostList />} />
						<Route path="comment-list" element={<MyCommentList />} />
					</Route>
				</Route>
				<Route path="*" element={<NotFound />} />
			</Route>
		</Routes>
	);
};

export default App;

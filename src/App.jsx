import {BrowserRouter, Route, Routes} from "react-router-dom"
import Readblog from './pages/ReadBlog';
import CreateBlog from './pages/CreateBlog';
import UpdateBlog from './pages/UpdateBlog';
import ListTable from './components/read/ListTable';
import SingleBlogPost from './components/SingleBlog';

const App = () => {
    return (
        
        <>
        {<BrowserRouter>
        <Routes>
          <Route path="/" element={<Readblog/>}></Route>
          <Route path="/create" element={<CreateBlog/>}></Route>
         <Route path="/update/:id" element={<UpdateBlog/>}></Route>
         <Route path="/" element={<ListTable/>}/>
        <Route path="/blog/:blogId" element={<SingleBlogPost/>}></Route> 
        </Routes>
        </BrowserRouter>}
        </>
    );
};

export default App;
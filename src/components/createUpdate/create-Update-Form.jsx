import { useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import Swal from "sweetalert2"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateUpdateForm = () => {
  let { id } = useParams();
  let [FormValue, setFormValue] = useState({
    title:"",
    content:"",
    author:"",
  });
  let navigate = useNavigate();

  useEffect(() => {
    console.log("Fetching data for id:", id);

    (async () => {
      try {
        const res = await axios.get(`https://blog-api-c6ab.onrender.com/api/v1/get-blog/${id}`);
        console.log("API response:", res.data);

        if (res.data && res.data.data ) {
          const fetchedData = res.data["data"];
          setFormValue(fetchedData);
        }
      } catch (error) {
        console.error("API error:", error);
      }
    })();
  }, [id]);

  const inputOnChange = (inputName, inputValue) => {
    setFormValue({ ...FormValue, [inputName]: inputValue });
  };

  const onSubmit = async () => {
    if (FormValue.title === "") {
      toast.error('Title can\'t be empty !', {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (FormValue.content === "") {
      toast.error('Content can\'t be empty !', {
        position: toast.POSITION.TOP_CENTER
      });
    } else if (FormValue.author === "") {
      toast.error('Author Name can\'t be empty !', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      let url = "https://blog-api-c6ab.onrender.com/api/v1/create-blog";
      if (id) {
        url = "https://blog-api-c6ab.onrender.com/api/v1/update-blog/" + id;
      }
      let res = await axios.post(url, FormValue);
      if (res.status === 200) {
        Swal.fire("Saved Successfully");
        navigate("/");
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10 p-2">
          <label>Blog Title</label>
          <input value={FormValue['title']} onChange={(e)=>{inputOnChange("title", e.target.value)}} type="text" className="form-control form-control-sm" placeholder='Blog Title'/>
            
        </div>
        <div className="col-md-10 p-2">
          <label>Content</label>
          <textarea
            value={FormValue.content}
            onChange={(e)=>{inputOnChange("content", e.target.value)}}
            className="form-control form-control-sm"
            rows="5" 
            placeholder='Content'
          />
        </div>
        <div className="col-md-10 p-2">
          <label>Author Name</label>
          <input value={FormValue.author} onChange={(e)=>{inputOnChange("author", e.target.value)}}type="text" className="form-control" placeholder='Author Name' />

        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-md-4 p-2">
          <button onClick={onSubmit} className="btn btn-primary w-100">Save</button>
          <ToastContainer />

        </div>

      </div>

    </div>
  );
};

export default CreateUpdateForm;
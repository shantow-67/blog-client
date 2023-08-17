import { useEffect, useState } from 'react';
import { default as axios } from 'axios';
import { NavLink } from 'react-router-dom';

const ListTable = () => {

    const [data, setData] = useState([]);
    const [id, setId] = useState(0);

    useEffect(() => {
        (async () => {
            const res = await axios.get("https://blog-api-c6ab.onrender.com/api/v1/all-blogs");
            setData(res.data['data']);
        })();
    }, [id]);

    const onDelete = async (id) => {
        let URL = "https://blog-api-c6ab.onrender.com/api/v1/delete-blog/" + id;
        await axios.delete(URL);
        setId(id);
    };

    const renderBlogCards = () => {
        const cards = [];
        for (let i = 0; i < data.length; i += 3) {
            const row = (
                <div key={i} className="row mb-4">
                    {data.slice(i, i + 3).map((item, index) => (
                        <div key={index} className="col-md-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">Title: {item["title"]}</h5>
                                    {item["content"].length > 30 ? (
                                    <div>
                                        <p className="card-text">
                                            Content: {item["content"].substring(0, 30)}...
                                            <NavLink to={"/blog/" + item["_id"]} className="btn btn-link">
                                                See More
                                            </NavLink>
                                        </p>
                                    </div>
                                ) : (
                                    <p className="card-text">Content: {item["content"]}</p>
                                )}
                                    <p className="card-text">Author: {item["author"]}</p>
                                    <NavLink to={"/blog/" + item["_id"]} className="btn btn-primary m-2">Details</NavLink>
                                    <NavLink to={"/update/" + item["_id"]} className="btn btn-success">Edit</NavLink>
                                    <button onClick={() => { onDelete(item["_id"]); }} className="btn btn-danger m-2">Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            );
            cards.push(row);
        }
        return cards;
    };

    return (
        <div className="container">
            {renderBlogCards()}
        </div>
    );
};

export default ListTable;
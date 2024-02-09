import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'
function Dashboard() {
    const [data, setData] = useState({
        subtitle: "",
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:3000/blog', data);
            setData({
                subtitle: '',
                title: '',
                description: ''
            });
            alert('Blog added successfully!');
        } catch (error) {
            console.error('Error adding blog:', error);
            alert('Error adding blog. Please try again.');
        }
    };

    const [showCreateForm, setShowCreateForm] = useState(false);
    const toggleCreateForm = () => {
        setShowCreateForm(prevState => !prevState);
    };

    const [data1, setData1] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost:3000/getBlogs")
            .then((res) => {
                if (res.data.Status === "Success") {
                    setData1(res.data.Result);
                } else {
                    alert("Error");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3000/deleteblog/${id}`)
            .then((res) => {
                if (res.data.Status === "Success") {
                    alert("Blog Deleted");
                } else {
                    alert("Error Deleting Blog, Try again");
                }
            })
            .catch((err) => {
                console.error("Error deleting blog:", err);
                alert("Error Deleting Blog, Try again");
            });
    };

    const [updateFormData, setUpdateFormData] = useState({
        id: null,
        title: '',
        subtitle: '',
        description: ''
    });

    const handleUpdate = (blog) => {
        setUpdateFormData({
            id: blog.id,
            title: blog.title,
            subtitle: blog.subtitle,
            description: blog.description
        });
    };

    const handleSubmitUpdate = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:3000/updateblog/${updateFormData.id}`, updateFormData)
            .then((res) => {
                if (res.data.Status === "Success") {
                    alert("Blog Updated");
                    setUpdateFormData({
                        id: null,
                        title: '',
                        subtitle: '',
                        description: ''
                    });
                } else {
                    alert("Error Updating Blog, Try again");
                }
            })
            .catch((err) => {
                console.error("Error updating blog:", err);
                alert("Error Updating Blog, Try again");
            });
    };

    const navigate = useNavigate()
    const handleLogout = () => {
        axios.get("http://localhost:3000/logout")
          .then((res) => {
            if (res.data.Status === "Success") {
              navigate("/");
            } else {
              console.error("Logout failed");
            }
          })
          .catch((err) => {
            console.error("Logout failed:", err);
          });
      };
    return (
        <div>
            <div className='head-dashboard'>
                <ul>
                    <li className='hig'>Blog</li>
                    <li>Profile</li>
                    <li onClick={handleLogout}>Logout</li>
                </ul>
            </div>
            <div className='content-dash'>
                <h1>Blogify</h1>
                <hr />
                <p>"Explore the world of technology and innovation through our insightful blog posts. Stay updated on the latest gadgets, software updates, and tech news that shape our digital landscape."</p>
            </div>
            {showCreateForm && (
                <div className='blog-form'>
                    <img src='/assets/cancel.webp' className='remove-im' onClick={toggleCreateForm} alt="Cancel" />
                    <h1>Add your blogs with subtitle and descriptions</h1>
                    <form className='form-container' onSubmit={handleSubmit}>
                        <input placeholder='ADD title' type='text' className='input-2' name='subtitle' required
                            onChange={handleChange} value={data.subtitle}
                        />
                        <input placeholder='ADD Subtitle' type='text' className='input-2' name='title' required
                            onChange={handleChange} value={data.title}
                        />
                        <input placeholder='ADD Description' type='text' className='input-1' name='description' required
                            onChange={handleChange} value={data.description}
                        />
                        <button type='submit' className='form-button'>ADD !</button>
                    </form>
                </div>
            )}
            <div className='entire'>
                <div className='blog'>
                    <div className='blog-border'>
                        <div className='blog-img'>
                            <img src="/assets/blog.jpg" className='blog-img-up' />
                        </div>
                        <div className='blog-content'>
                            <h2>Create Blog</h2>
                            <p>you can enjoy adding your blogs here...</p>
                            <button onClick={toggleCreateForm}>Add Blogs</button>
                        </div>
                    </div>
                </div>
                <div className='blog1'>
                    <p>Discover the latest trends in fashion and beauty with our weekly blog updates. </p>
                </div>
            </div>
            <div className='blog-display'>
                {data1.map((blog, index) => (
                    <div key={index} className='blog-item'>
                        <h1>{blog.title}</h1>
                        <h2>{blog.subtitle}</h2>
                        <p>{blog.description}</p>
                        <button onClick={() => handleDelete(blog.id)}>Remove</button>
                        <button onClick={() => handleUpdate(blog)} className='up-log'>Update</button>
                        {updateFormData.id === blog.id && (
                            <div className='blog-form'>
                                <img src='/assets/cancel.webp' className='remove-im' alt="Cancel" />
                                <h1>Update your blogs with subtitle and descriptions</h1>
                                <form className='form-container' onSubmit={handleSubmitUpdate}>
                                    <input placeholder='ADD title' type='text' className='input-2' name='subtitle' required value={updateFormData.subtitle} onChange={(e) => setUpdateFormData({ ...updateFormData, subtitle: e.target.value })} />
                                    <input placeholder='ADD Subtitle' type='text' className='input-2' name='title' required value={updateFormData.title} onChange={(e) => setUpdateFormData({ ...updateFormData, title: e.target.value })} />
                                    <input placeholder='ADD Description' type='text' className='input-1' name='description' required value={updateFormData.description} onChange={(e) => setUpdateFormData({ ...updateFormData, description: e.target.value })} />
                                    <button type='submit' className='form-button'>Update</button>
                                </form>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Dashboard;

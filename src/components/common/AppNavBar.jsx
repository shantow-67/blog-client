import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { NavLink } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

const AppNavbar = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    try {
        const response = await axios.get(`http://localhost:8000/api/v1/search/:keyword`, {
            params: {
                keyword: searchQuery.toString() // Convert Query to String For REgEx
            }
        });
        setSearchResults(response.data.data);
    } catch (error) {
        console.error(error);
    }
};
const handleInputChange = (e) => {
  const keyword = e.target.value;
  setSearchQuery(keyword);
  handleSearch(keyword);
};

    return (
        
        <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand>BLOGS</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <Nav.Link ><NavLink to="/" activeClassName="active-link">Blog List</NavLink></Nav.Link>
              <Nav.Link ><NavLink to="/create" activeClassName="active-link">Create Blog</NavLink></Nav.Link>
            </Nav>
            <Form inline>
    <Row>
        <Col xs="auto">
            <Form.Control
                type="text"
                placeholder="Search Blog"
                className=" m-sm-1"
                value={searchQuery}
                onChange={handleInputChange}
            />
        </Col>
        <Col xs="auto">
            
        </Col>
    </Row>
</Form>
<Dropdown className="ml-auto">
        <Dropdown.Toggle variant="light" id="search-results-dropdown">
          {searchResults.length > 0 && 'Search Results'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {searchResults.map((blog) => (
            <Dropdown.Item
              key={blog._id}
              as={NavLink}
              to={`/blog/${blog._id}`}
              activeClassName="active-link"
            >
              {blog.title}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
};

export default AppNavbar;
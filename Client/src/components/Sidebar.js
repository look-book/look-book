import SidebarItem from "./SidebarItem";

import items from "./sidebar.json";
//import Nav from 'react-bootstrap/Nav';

export default function Sidebar() {
  //const user=false;
  return (
    <div className="sidebar">
      {/*
          {user ? (
        <h4>Welcome, {user.firstName}</h4>
      ) : (
        
        <Nav.Link className="link" to='/Login'>
           Please Login
        </Nav.Link>
      )}*/}
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
}

import SidebarItem from "./SidebarItem";
import items from "./sidebar.json";
//import Nav from 'react-bootstrap/Nav';

export default function Sidebar() {
  //const user=false;
  return (
    <div className="sidebar">
      {items.map((item, index) => (
        <SidebarItem key={index} item={item} />
      ))}
    </div>
  );
}

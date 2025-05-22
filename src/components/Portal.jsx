import { Link } from "react-router-dom";

function Portal(){
  return (
    <ul>
      <li><button><Link to='en'>English</Link></button></li>
      <li><button><Link to='pt'>Portuguese</Link></button></li>
    </ul>
  )
}

export default Portal
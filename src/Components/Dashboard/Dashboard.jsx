// import React from 'react'
// import Style from './Dashboard.module.css'
// export default function Dashboard() {
//   return <>
//     <iframe src="http://localhost:3001/admin/default" width="100%" height="100%" style="border:none;"></iframe>
//   </>
// }

import React from "react";

function Dashboard() {
  return (
    <div>
      <iframe
        src="http://localhost:3001/admin/default"
        width="100%"
        height="700px"
        style={{ border: "none" }}
        title="Dashboard"
      />
    </div>
  );
}

export default Dashboard;

import { Outlet } from "react-router-dom";
import App from "../../App";
import Header from "./layouts/Header";
import MainContent from "./layouts/MainContent";
import LeftNavBar from "./layouts/LeftNavBar";

const Dashboard = () => {
    
    return (
        <div id='defaultLayout'>

            <LeftNavBar/>

            <div className='content'>
                <header>
                    <Header/>
                </header>

                <main>
                    {
                        /* loading && 
                        <h4 style={{ marginBottom:'10px',marginTop:'5px','textAlign':'center' }}>Loading...</h4> */
                    }
                    <h4>Dashborard</h4>
                
                </main>
            </div>
        
        </div>
    );
};

export default Dashboard;
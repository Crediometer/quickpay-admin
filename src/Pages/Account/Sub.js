import Paginations from '../../Components/Pagination/Pagination';
import SubTable from '../../Components/Table/SubTable';
import './Sub.css'
const Sub = () => {
    return ( 
        <div className="sub-con">
            <div className="sub-top">
                <p>Showing 0 - 1 Sub Account</p>
            </div>
            <div className="settings-body">
                <SubTable/>
            </div>
            <Paginations/>
        </div>
    );
}
 
export default Sub;
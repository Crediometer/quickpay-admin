import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import MultiStepProgressbar from '../../Components/Multiformbar/MultiStepProgressbar';
import styles from './Activate.module.css'
import Personal from '../../Components/Multiformbar/Personal';
import Business from '../../Components/Multiformbar/Business';
import Verification from '../../Components/Multiformbar/Verification';
import Payout from '../../Components/Multiformbar/Payout';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { fetchgetprofile } from '../../Redux/Getprofile/GetprofileAction';
const Activate = ({personal, fetchgetprofile}) => {
    let initialCount;
    if (!personal) {
      initialCount = 1;
    }
    // } else {
    //   initialCount = 2;
    // }
    const [index, setIndex] = useState(initialCount)
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => {
      setSidebar((prevState) => !prevState);
    };
    const nextButton = () => {
        window.scrollTo(0, 0);
        if (index < 4){
            setIndex(prevIndex => prevIndex + 1)
        } 
    }
    useEffect(()=>{
        fetchgetprofile()
    },[])
    return (
        <div className="test">
            <div className="left">
                <Sidebar Sidebar={sidebar} closeSidebar={toggleSidebar} toggle={toggleSidebar}/>
            </div>
            <div className="right">
                <Navbar toggle={toggleSidebar} mode={sidebar}/>
                <div className="content">
                    <div className={styles.activate}>
                        <p className={styles.activateHead}>Activate Your Business</p>
                        <p className={styles.activateBody}>To activate your business to start sending and receiving money<br></br> you would nedd to prove the following document needed  </p>
                        <div className={styles.activateProgress}>
                            <MultiStepProgressbar step={index}/>
                        </div>
                        <div className={styles.activateFormOuter}>
                            <div className={styles.activateForm}>
                                {index===1 && (<Personal next={nextButton}/>)}
                                {index===2 && (<Business next={nextButton}/>)}
                                {/* {index===3 && (<Verification/>)} */}
                                {index===3 && (<Payout/>)}
                            </div>
                            {/* <button onClick={nextButton} className={styles.activateButton}>Save</button> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
const mapStoreToProps = (state) => {
    return {
        personal: state?.getprofile?.data?.businessInformation,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        fetchgetprofile: () => dispatch(fetchgetprofile()),
    };
};
export default connect(mapStoreToProps, mapDispatchToProps)(Activate);
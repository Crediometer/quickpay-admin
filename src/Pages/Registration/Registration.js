import React, { useState } from 'react'
import styles from './Registration.module.css';
import styles2 from '../../Components/Formfield/style.module.css'
import Inputfield from '../../Components/Formfield/Inputfield';
import Selectfield from '../../Components/Formfield/Selectfield';
import Textfield from '../../Components/Formfield/Textfield';
import { Link } from 'react-router-dom';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';

const options = [{name:'name'},{name:'games'}];


const Registration = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => {
      setSidebar((prevState) => !prevState);
    };
    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };
    return (
        <div className="test">
            <div className="left">
                <Sidebar Sidebar={sidebar} closeSidebar={toggleSidebar} toggle={toggleSidebar}/>
            </div>
            <div className="right">
                <Navbar toggle={toggleSidebar} mode={sidebar}/>
                <div className="content">
                    <div className={styles.registration}>
                        <div className={styles.registrationheader}>
                            <h1>You are almost done</h1>
                            <p>Please take a moment to introduce your self and your business</p>
                        </div>
                        <div className={styles.registrationform}>
                            <form>
                                <div className={styles.formforyou}>
                                    <h2 className={styles.formhead}>About You</h2>
                                    <div className={styles.forminner}>
                                        <div className={styles.form1}>
                                            <div>
                                                <Inputfield
                                                label="First name"
                                                type="text"
                                                placeholder="First name" 
                                                />
                                            </div>
                                            <div>
                                                <Inputfield
                                                    label="Last name"
                                                    type="text"
                                                    placeholder="Last name" 
                                                />
                                            </div>
                                        </div>
                                        <div className={styles.form2}>
                                            <Inputfield
                                                label="Phone"
                                                type="text"
                                                placeholder="Enter phone number" 
                                            />
                                        </div>
                                        <div className={styles.form2}>
                                            <Inputfield
                                                label="What’s your role at Test Ventures Business"
                                                type="text"
                                                placeholder="Enter role" 
                                            />
                                        </div>
                                        <div className={styles.form3}>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="yes"
                                                    name='boolean'
                                                />
                                                Yes, i am
                                            </label>
                                            <label>
                                                <input
                                                    type="radio"
                                                    value="yes"
                                                    name='boolean'
                                                />
                                                No, I’m not
                                            </label>
                                        </div>

                                    </div>
                            
                                </div>
                                <div className={styles.formforyou}>
                                    <h2 className={styles.formhead}>About Your Business</h2>
                                    <div className={styles.forminner}>
                                        <div className={styles.form2}>
                                            <Selectfield
                                                label="What industry does your business operate ?"
                                                options={options}
                                            />
                                        </div>
                                        <div className={styles.form2}>
                                            <label className={styles2.fieldlabel}>Registration status of your business</label>
                                            <div className={styles.formSelect}>
                                                <div className={`${styles.form4} ${selectedOption === 'Option 1' ? styles.selected : ''}`} onClick={() => handleOptionClick('Option 1')}>
                                                    <p className={styles.register}>Registered Business</p>
                                                    <p className={styles.registerbody}>Choose this if your business is registered using<br></br> RC number,CAC Document, BVN, Mermat.</p>
                                                </div>
                                                <div className={`${styles.form4} ${selectedOption === 'Option 2' ? styles.selected : ''}`} onClick={() => handleOptionClick('Option 2')}>
                                                    <p className={styles.starter}>Starter Business</p>
                                                    <p className={styles.registerbody}>Choose this if your business is not yet registered </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className={styles.form2}>
                                            <Selectfield
                                                label="How Many workers are in Test Ventures"
                                                options={options}
                                            />
                                        </div>
                                        <div className={styles.form2}>
                                            <Textfield
                                                label="Description Of business"
                                                placeholder="Enter a short detail of what you business do" 
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.submitbutton}>
                                    <Link to='/dashboard'><button>Continue</button></Link>
                                </div>
                            </form>
                        </div>
                    </div>
                    </div>
          </div>
        </div>
    );
}
 
export default Registration;
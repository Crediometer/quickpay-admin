import { useEffect, useRef, useState } from "react";
import Sidebar from "../../../Components/Sidebar/Sidebar";
import Navbar from "../../../Components/Navbar/Navbar";


const Password = () => {
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => {
      setSidebar((prevState) => !prevState);
    };
    const [pin, setPin] = useState("");
    const atmpin = useRef(null);
    useEffect(() => {
        if (pin.length === 1) {
        atmpin1.current.focus();
        }
    }, [pin.length]);
    const onChangepin1 = (e) => {
        const value = e.target.value
        setPin(value)
    };
    const [pin1, setPin1] = useState("");
    const atmpin1 = useRef(null);
    useEffect(() => {
        if (pin1.length === 1) {
        atmpin2.current.focus();
        }
    }, [pin1.length]);
    const onChangepin2 = (e) => {
        const value = e.target.value
        setPin1(value)
    };
    const [pin2, setPin2] = useState("");
    const atmpin2 = useRef(null);
    useEffect(() => {
        if (pin2.length === 1) {
        atmpin3.current.focus();
        }
    }, [pin2.length]);
    const onChangepin3 = (e) => {
        const value = e.target.value
        setPin2(value)
    };
    const [pin3, setPin3] = useState("");
    const atmpin3 = useRef(null);
    const onChangepin4 = (e) => {
        const value = e.target.value
        setPin3(value)
        const pins = `${pin}${pin1}${pin2}${value}`
        console.log(pins)
        // var encrypt = new JSEncrypt();
        // encrypt.setPublicKey(`${consts.pub_key}`);
        // var encrypted = encrypt.encrypt(pins);
        // console.log(encrypted)
        // setCombinedpin(encrypted);
    };
    return ( 
        <div className="test">
            <div className="left">
                <Sidebar Sidebar={sidebar} closeSidebar={toggleSidebar} toggle={toggleSidebar}/>
            </div>
            <div className="right">
                <Navbar toggle={toggleSidebar} mode={sidebar}/>
                <div className="content">
                    <div className="password setpin">
                        <div className="phone-header">
                            <p className="phone-header-head">Set New Password</p>
                            <p className="phone-header-text">Please Enter your new Phone Number</p>
                        </div>
                        <div className="phone-body">
                            <form>
                                <div className="setpin-container">
                                    <div className="field-1">
                                        <div className="pinfield">
                                            <input
                                            type="text"
                                            maxlength="1"
                                            onChange={onChangepin1}
                                            ref={atmpin}
                                            autoFocus
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="field-1">
                                        <div className="pinfield">
                                            <input
                                            type="text"
                                            maxlength="1"
                                            onChange={onChangepin2}
                                            ref={atmpin1}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="field-1">
                                        <div className="pinfield">
                                            <input
                                            type="text"
                                            maxlength="1"
                                            onChange={onChangepin3}
                                            ref={atmpin2}
                                            ></input>
                                        </div>
                                    </div>
                                    <div className="field-1">
                                        <div className="pinfield">
                                            <input
                                            type="text"
                                            maxlength="1"
                                            onBlur={onChangepin4}
                                            ref={atmpin3}
                                            ></input>
                                        </div>
                                    </div>
                                </div>
                                <div className="setpin-button">
                                    <button className='transfer-button'>Submit</button>
                                </div>
                            </form>
                        </div>
                    </div>
                 </div>
             </div>
         </div>
    );
}
 
export default Password;
import { useEffect, useRef, useState } from 'react';
import { connect } from "react-redux";
import JSEncrypt from 'jsencrypt';
import consts from "../../Pages/keys/const"
import './Pinconfirm.css'
import { useSelector, useDispatch } from 'react-redux';
// import { fetchbankname, postTransfer, reqData } from '../../Redux/Transfer/BankAction';
import { fetchBank, postData, reqData } from '../../Redux/Bank/BankAction';
import { depositData } from '../../Redux/Deposit/DepositAction';
import SuccessModal from './SuccessModal';
import Errormodal from './Errormodal';
import LottieAnimation from '../../Lotties';
import loader from "../../Assets/loading.json"
import SuccessModal2 from './SuccessModal2';
import { FaTimes } from 'react-icons/fa';
import { FormattedNumber, IntlProvider } from 'react-intl';
const Pinconfirm = ({nameData, deposit, depositData,loading, message, togglemodal, errormessage,vault}) => {
    const dispatch = useDispatch();
    const [combinedpin, setCombinedpin] = useState('');
    const [successmodal, setSuccessModal] = useState(false);
    const [modal, setModal] = useState(false);
    const [randomString, setRandomString] = useState('');
    const depositState = useSelector((state) => state.bankname.transferData);

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
       
        var encrypt = new JSEncrypt();
        encrypt.setPublicKey(`${consts.pub_key}`);
        var encrypted = encrypt.encrypt(pins);
        
        setCombinedpin(encrypted);
    };

    const handleModal = ()=>{
        setModal(!modal)
    }

    const handleModal2 = ()=>{
        setSuccessModal(!SuccessModal)
    }
    useEffect(() => {
        // HANDLE FOR PAYMENTREFERENCE
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setRandomString(result);
    }, []);
    // const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    // let result = "";
    // for (let i = 0; i < 8; i++) {
    //   result += characters.charAt(Math.floor(Math.random() * characters.length));
    // }
    // setReference(result);
    const handleSubmit = async (e) => {
      e.preventDefault();
      let transfer = {
        nameEnquiryReference: nameData.bankname.transferData.nameEnquiryReference,
        debitAccountNumber: nameData.bankname.transferData.debitAccountNumber,
        beneficiaryAccountNumber: nameData.bankname.transferData.beneficiaryAccountNumber,
        beneficiaryBankCode: nameData.bankname.transferData.beneficiaryBankCode,
        beneficiaryAccountName: nameData.bankname.transferData.beneficiaryAccountName,
        narration: nameData.bankname.transferData.narration,
        amount:nameData.bankname.transferData.amount,
        saveBeneficiary: nameData.bankname.transferData.saveBeneficiary,
        saveBeneficiaryForUs:nameData.bankname.transferData.saveBeneficiaryForUs,
        pin:combinedpin,
        paymentReference: randomString
      }
      dispatch({ type: 'TRANSFER_DATA_REQUEST', payload: transfer});
    //   reqData({
    //     nameEnquiryReference: nameData.bankname.transferData.nameEnquiryReference,
    //     debitAccountNumber: nameData.bankname.transferData.debitAccountNumber,
    //     beneficiaryAccountNumber: nameData.bankname.transferData.beneficiaryAccountNumber,
    //     beneficiaryBankCode: nameData.bankname.transferData.beneficiaryBankCode,
    //     beneficiaryAccountName: nameData.bankname.transferData.beneficiaryAccountName,
    //     narration: nameData.bankname.transferData.narration,
    //     amount:nameData.bankname.transferData.amount,
    //     saveBeneficiary: nameData.bankname.transferData.saveBeneficiary,
    //     saveBeneficiaryForUs:nameData.bankname.transferData.saveBeneficiaryForUs,
    //     pin:combinedpin,
    //     paymentReference: randomString
    //   });

        try{
            await depositData(transfer, () => {
                setSuccessModal(true);
            }, () => {
                setModal(true);
            });
        }catch(error){
            // setPending(false);
        }
      
    }
    return ( 
        <div className="modal-background">
            
            <div className="modal pin-modal">
                <div className='modalClose' onClick={togglemodal}>
                    <FaTimes/>
                </div>
                <div className="receiver-details">
                    <div className="preview-1 preview-upper">
                    <div className="preview-left">
                        <p className="receipt-head">Bank Name</p>
                        {/* <p className="receipt-body-2">{getName()}</p> */}<p className="receipt-body-2">{nameData.bankname.transferData.selectBank}</p>
                    </div>
                    <div className="preview-right">
                        <p className="receipt-head">Amount</p>
                        <IntlProvider>
                            {" "}
                            <p className="receipt-body-2">
                            <FormattedNumber
                                value={
                                    nameData.bankname.transferData.amount
                                }
                                style="currency"
                                currency="NGN"
                            />
                            </p>
                        </IntlProvider>
                    </div>
                    </div>
                    <div className="preview-1">
                    <div className="preview-left">
                        <p className="receipt-head">Account Number</p>
                        <p className="receipt-body-2">
                            {nameData.bankname.transferData.beneficiaryAccountNumber}
                        </p>
                    </div>
                    <div className="preview-right">
                        <p className="receipt-head">Commision</p>
                        <IntlProvider>
                            {" "}
                            <p className="receipt-body-2">
                            <FormattedNumber
                                value="20"
                                style="currency"
                                currency="NGN"
                            />
                            </p>
                        </IntlProvider>
                    </div>
                    </div>
                    <div className="preview-1">
                    <div className="preview-left">
                        <p className="receipt-head">Account Name</p>
                        <p className="receipt-body-2">
                           {nameData.bankname.transferData.beneficiaryAccountName}
                        </p>
                    </div>
                    <div className="preview-right">
                        <p className="receipt-head">Balance</p>
                        <IntlProvider>
                            {" "}
                            <p className="receipt-body-2">
                            <FormattedNumber
                                value={
                                    vault?.accountBalance
                                }
                                style="currency"
                                currency="NGN"
                            />
                            </p>
                        </IntlProvider>
                        {/* <p className="receipt-body-2">N50.00</p> */}
                    </div>
                    </div>
                </div>
                <div className="field-container">
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
                <div className="form-button form-modal-button ">
                    {loading ? (
                        <button
                        className="transfer-button"
                        disabled>
                            <LottieAnimation data={loader}/>
                        </button>
                    ) : (
                        <button
                        className="transfer-button"
                        onClick={handleSubmit}
                        ><span>Finish</span></button>
                    )}
                    {/* <button
                        type="submit"
                        value="Continue"
                        className="transfer-button"
                        onClick={handleSubmit}
                    ><span>Finish</span></button> */}
                    {/* {!loading && <button
                        type="submit"
                        value="Continue"
                        className="submit-2"
                        onClick={handleSubmit}
                    ><span>Finish</span></button>}
                        {loading && <button disabled> <FontAwesomeIcon
                                className="spinner"
                                icon={faSpinner}
                        ></FontAwesomeIcon></button>} */}
                </div>
            </div>
            {successmodal && (
                <SuccessModal2 message={message}  link="/dashboard" />
            )}{modal && (
                <Errormodal  togglemodal={handleModal} error={errormessage}/>
            )}
        </div>
    );
}

const mapStoreToProps = (state) => {
    
    return {
        bankData: state.bankname,
        nameData: state,
        deposit: state.bankname.transferData,
        loading: state.deposit.loading,
        status: state?.deposit?.deposit?.status,
        error: state?.deposit?.error,
        message: state?.deposit?.data?.message,
        errormessage: state?.deposit?.error?.data?.status,
        vault:state?.vault?.data?.data?.mainAccount,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchBank: () => dispatch(fetchBank()),
        postData: (postState) => {
            dispatch(postData(postState));
        },
        reqData: (depositState) => {
            dispatch(reqData(depositState));
        },
        depositData: (depositState, history, historyError)=>{
            dispatch(depositData(depositState, history, historyError))
        }
    };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Pinconfirm);
import { FaChevronDown, FaPiggyBank, FaTimes } from 'react-icons/fa';
import {Select, Switch} from 'antd'
import { connect } from "react-redux";
import {BsBank2} from 'react-icons/bs'
import credio from '../../logo.png'
import './Transfer.css'
import { FormattedNumber, IntlProvider } from "react-intl";
import LottieAnimation from '../../Lotties';
import preloader from '../../Assets/preloader.json'
import Input from '../../Components/Inputfield/Input';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { fetchbank, fetchbankname, postTransfer, reqData } from '../../Redux/Transfer/BankAction';
// import Pinconfirm from '../../Components/Modal/Pinconfirm';
import Sidebar from '../../Components/Sidebar/Sidebar';
import Navbar from '../../Components/Navbar/Navbar';
import { fetchBank, postData, reqData } from '../../Redux/Bank/BankAction';
import Pinconfirm from '../../Components/Modal/Pinconfirm';
import { fetchgetprofile } from '../../Redux/Getprofile/GetprofileAction';
import { fetchvault } from '../../Redux/Vault/VaultAction';
import LoadingModal from '../../Components/Modal/LoadingModal';
import Errormodal from '../../Components/Modal/Errormodal';
const Transfer = ({fetchBank, bank, postData, postTransfer,loading, name,profile, cid, fetchvault, personal, business, fetchgetprofile}) => {
    const dispatch = useDispatch();
    const [showBank, setShowBank] = useState(false);
    const [showError, setShowError] = useState(false);
    const [selectBank, setSelectBank]  = useState("Select a Bank")
    const [nameState, setNameState] = useState({});
    const [accountNumber, setaccountNumber] = useState("");
    const [accountName, setaccountName] = useState('')
    const [nibssCode, setnibssCode] = useState(null);
    const [amount, setAmount] = useState("");
    const [formattedAmount, setformattedAmount] = useState("");
    const [narration, setnarration] = useState("");
    const [query, setQuery] = useState("")
    const debitAccountNumber = "0118462550";
    const saveBeneficiary = false;
    const [saveBeneficiaryForUs, setSaveBeneficiaryForUs] = useState(false);
    const [show, setShow] = useState(false)
    const [num, setNum] = useState("")
    const [isChecked, setIsChecked] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    const [sidebar, setSidebar] = useState(false);
    const toggleSidebar = () => {
      setSidebar((prevState) => !prevState);
    };
    const handleClick = () => {
        setIsChecked(!isChecked);
    };
    const handleClick2 = () => {
        setIsChecked2(!isChecked2);
    };

    const handleShow =()=>{
        setShowBank(!showBank)
    }
    // const handleShow2 = () =>{
    //     setShow(!show)
    // }
    //HANDLE SELECTED BANK SHOW
    const handleSelectedBank = (option) => {
        setSelectBank(option)
    };
    // HANDLE FOR ACCOUNT NUMBER
    const handleNumber = (e) => {
        // handleFetchData();
        const value = e.target.value;
     
        setaccountNumber(value);
        setNameState({ ...nameState, ...{ accountNumber: e.target.value} });
    };
    // HANDLE FOR BANK SELECT
    const handleBank = (value) => {
        setnibssCode(value);
       
        setNameState({ ...nameState, ...{ nibssCode: value } });
    };
     // HANDLE FOR AMOUNT
    useEffect(()=>{
        if(isChecked){
            setnibssCode    ("999240")
            setNameState({ ...nameState, ...{ nibssCode: "999240" } });
            setSelectBank("SAFE HAVEN SANDBOX BANK")
        }
    },[isChecked])
    const handleAmount = (e) => {
        const value = e.target.value;
        const parsedAmount = parseInt(value.replace(/\D/g, ''), 10);
        setAmount(parsedAmount);
        const formattedAmount = formatAmount(parsedAmount.toString());
        setformattedAmount(formattedAmount);
        
    };
    const formatAmount = (input) => {
        // Remove non-numeric characters from the input
        const numericInput = input.replace(/\D/g, '');
        // Add commas as thousand separators
        const formattedInput = numericInput.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        // Add NGN prefix
        return formattedInput;
    };
     // HANDLE FOR COMMENT
     const handleComment = (e) => {
        const value = e.target.value;
        setnarration(value);
    };
    const randomNumberInRange = (min, max) => {
        return Math.floor(Math.random() 
                * (max - min + 1)) + min;
    };
    useEffect(() => {
        setNum(randomNumberInRange(1, 9));
        // fetchBank();
    }, []);

    useEffect(() => {
        fetchBank();
        // fetchBank();
        fetchvault(cid)
        fetchgetprofile()
        
    }, [ ]);
    useEffect(()=>{
        if (nibssCode !== "" && accountNumber.length === 10) {
            postData(nameState);
            // setaccountName(name.data.accountName)
        }
    }, [nibssCode, accountNumber, nameState])
    const handleModal2 = ()=>{
        setShow(!show)
    }
    const handleError = ()=>{
        setShowError(!showError)
    }
      //HANDLE TO SUBMIT TRANSACTION
    const handleSubmit = (e) => {
        e.preventDefault();

        if((amount + 1000) >= profile.accountBalance){
            setShowError(true)
        }else{
            const transfer = {
                nameEnquiryReference: name?.sessionId,
                debitAccountNumber,
                beneficiaryAccountNumber: accountNumber,
                beneficiaryBankCode: nibssCode,
                beneficiaryAccountName: name?.accountName,
                narration,
                narration,
                amount,
                saveBeneficiary,
                saveBeneficiaryForUs,
                selectBank
            } 
            dispatch({ type: 'TRANSFER_DATA_REQUEST', payload: transfer});
            // reqData({
            //   nameEnquiryReference: name.sessionId,
            //   debitAccountNumber,
            //   beneficiaryAccountNumber: accountNumber,
            //   beneficiaryBankCode: nibssCode,
            //   beneficiaryAccountName: name.accountName,
            //   narration,
            //   narration,
            //   amount,
            //   saveBeneficiary,
            //   saveBeneficiaryForUs,
            // });
            setShow(!show)
            // setAmount('');
            // setaccountNumber('');
            // accountName = ""
            // setnibssCode('');
            // resetInput()
            // setnarration('');
            // history(`/confirm`);
        }
    };
    return ( 
        <div className="test">
            <div className="left">
                <Sidebar Sidebar={sidebar} closeSidebar={toggleSidebar} toggle={toggleSidebar}/>
            </div>
            <div className="right">
                <Navbar toggle={toggleSidebar} mode={sidebar}/>
                <div className="content">
                    {/* {(num % 2 == 0) ? ( */}
                        <div className="transfer">
                        <p className="transfer-head">Fund Transfer</p>
                        <div className="transfer-body">
                            <div className="transfer-inner">
                                <div className="transfer-to">
                                    <p className='transfer-to-title'>Transfer To :</p>
                                    <div className="transfer-to-inner">
                                        <div className="to" onClick={handleClick}>
                                            <p>Credio Account </p>
                                            <div className="to-inner">
                                                <div className="to-image">
                                                    <img src={credio}></img>
                                                </div>
                                                <div className="to-select">
                                                    <input type="radio" checked={isChecked} onChange={handleClick} name="bank" value="credio"  ></input>
                                                </div>
                                            </div>
                                            
                                        </div>
                                        <div className="to" onClick={handleClick}>
                                            <p>Other Bank</p>
                                            <div className="to-inner">
                                                <div className="to-image">
                                                    <BsBank2/>
                                                </div>
                                                <div className="to-select">
                                                    <input type="radio" checked={!isChecked} onChange={handleClick} name="bank" value="credio"  ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="transfer-cred">
                                    {/* <div className="transfer-send">
                                        <p>Sending Account </p>
                                        <select>
                                            <option>Sub Account</option>
                                        </select>
                                    </div> */}
                                    <div className="transfer-account">
                                        <div className="transfer-account-left">
                                            <p className='account-left-head'>{profile?.accountName}</p>
                                            <p className='account-left-text'>{profile?.accountNumber}</p>
                                        </div>
                                        <div className="transfer-account-right">
                                            <div className="transfer-available">
                                                <p className='available-2'>Available Balance</p>
                                                <div className='sub-2'>
                                                    <p>Main Acc</p>
                                                </div>
                                            </div>
                                            <IntlProvider>
                                                {" "}
                                                <p className='balance-2'>
                                                <FormattedNumber
                                                    value=
                                                        {profile?.accountBalance}
                                                    
                                                    style="currency"
                                                    currency="NGN"
                                                />
                                                </p>
                                            </IntlProvider>
                                        </div>
                                    </div>
                                </div>
                                <div className="transfer-form">
                                    <form onSubmit={handleSubmit} method="POST">
                                        {/* <LottieAnimation lotti={preloader} height={150} width={150} /> */}
                                        <div className="form-1-outer">
                                            {(!isChecked) && (
                                                <div className="form-1">
                                                    <div className="input">
                                                        <label className='form-1-label'>Beneficiary’s  Bank </label>
                                                        <div className="form-1-select" onClick={handleShow}>
                                                            <p>{selectBank}</p>
                                                            <FaChevronDown/>
                                                        </div>
                                                    </div>
                                                    {showBank && (
                                                        <div className="bank-select">
                                                            <div className="bank-select-top">
                                                                <p>Select a Bank</p>
                                                                <div className="select-cancel" onClick={handleShow}>
                                                                    <FaTimes/>
                                                                </div>
                                                            </div>
                                                            <div className="bank-select-search">
                                                                <input type='text' placeholder='Search for bank' onChange={(e)=> setQuery(e.target.value)}></input>
                                                            </div>
                                                            <div className="bank-select-body">
                                                            {bank?.loading ? (
                                                            <LottieAnimation data={preloader}/> 
                                                            ):(
                                                                <div>
                                                                    {bank?.filter(banks => banks.name.toLowerCase().includes(query)).map((bank)=>{
                                                                        return(
                                                                            <div className="banks" onClick={() => {handleBank(bank.bankCode); handleSelectedBank(bank.name); handleShow()}}>
                                                                                <div className="bank-icon">
                                                                                    <BsBank2/>
                                                                                </div>
                                                                                <p className="bank-name">{bank.name}</p>
                                                                            </div>
                                                                        )
                                                                    })}
                                                                </div>
                                                            )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                             ) } 
                                            <div className="form-1" style={{ width: !isChecked ? '49%' : '32%' }}>
                                                <div className="input">
                                                    <label className='form-1-label'>Beneficiary’s  Account Number </label>
                                                    <input type="text" placeholder="0198604538" 
                                                    // value={accountNumber}
                                                    onBlur={handleNumber}
                                                    // onChange={handleNumber}
                                                    required
                                                    maxLength={10}
                                                    // disabled = {(business.length === 0 || !personal ) ? (true) : (false)}
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className="form-1" style={{ width: !isChecked ? '49%' : '32%' }}>
                                                <div className="input">
                                                    <label className='form-1-label'>Beneficiary’s Name </label>
                                                    <input type="text" 
                                                    placeholder="Account Name"
                                                    value={name?.accountName}
                                                    disabled
                                                    required
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="save-ben">
                                            <p>save as beneficiary</p>
                                            <div className="save-ben-switch">
                                                <Switch/>
                                            </div>
                                        </div>
                                        <div className="form-1-outer">
                                            <div className="form-2">
                                                <div className="input">
                                                    <label>Amount</label>
                                                    <input type="text" 
                                                    placeholder="NGN 5,000"
                                                    value={formattedAmount}
                                                    onBlur={handleAmount}
                                                    onChange={handleAmount}
                                                    required
                                                    // disabled = {(business.length === 0 || !personal) ? (true) : (false)}
                                                    ></input>
                                                </div>
                                            </div>
                                            <div className="form-2">
                                                <div className="input">
                                                    <label>Narration</label>
                                                    <input type="text"
                                                    placeholder="e.g School Fees"
                                                    onBlur={handleComment}
                                                    onChange={handleComment}
                                                    // disabled = {(business.length === 0 || !personal) ? (true) : (false)}
                                                    ></input>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-button">
                                            <button className='reset'>Reset</button><br></br>
                                            <button className='transfer-button'>Transfer</button>
                                        </div>
                                    </form>
                                </div>
                                {show && <Pinconfirm togglemodal={handleModal2}/>}
                            </div>
                        </div>
                        </div>  
                        {loading && <LoadingModal/>}
                        {showError && <Errormodal error="Insufficient Balance" togglemodal={handleError}/> }
                    {/* ) : (
                        <div className="key-error-notiication">
                            <p>Please Complete Your Profile</p>
                            <div className="error-cancle"><FaTimes/></div>
                        </div>
                    )} */}
                </div>
          </div>
        </div>
    );
}

const mapStoreToProps = (state) => {

    return {
        loading: state.bankname.loading,
        bank: state.bankname.bank,
        name: state?.bankname?.bankname?.data,
        transfer: state.transfer,
        profile: state?.vault?.data?.data?.mainAccount,
        cid: state?.getprofile?.data?.client?._id,
        personal: state?.getprofile?.data?.personalInfo,
        business: state?.getprofile?.data?.businessInformation
    };
};
  
const mapDispatchToProps = (dispatch) => {
    return {
        fetchBank: () => dispatch(fetchBank()),
        fetchgetprofile: () => dispatch(fetchgetprofile()),
        fetchvault: (id) => dispatch(fetchvault(id)),
        postData: (postState) => {
        dispatch(postData(postState));
        },
        reqData: (depositState) => {
            dispatch(reqData(depositState));
        },
    };
};

export default connect(mapStoreToProps, mapDispatchToProps)(Transfer);
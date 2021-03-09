import React from 'react';
import Profile from '../../assets/profile.png';
import { AuthContext } from '../../context/context';
import axios, { BASE_URL } from '../../context/axios';
function Settings() {
	const {
		// state: { user },
		state,
		dispatch,
	} = React.useContext(AuthContext);
	let { user } = state;
	const [userSetting, setUserSetting] = React.useState({
		firstName: user ? user.firstName : '',
		lastName: user ? user.lastName : '',
		email: user ? user.email : '',
		phone: user ? user.phone : '',
		currency: user ? user.currency : '',
	});

	const [alertClass, setAlertClass] = React.useState('');
	const [msg, setMsg] = React.useState('');
	const [err, setErr] = React.useState('');
	const [loader, setLoader] = React.useState(false);
	const [file, setFile] = React.useState('');
	const [fileUrl, setFileUrl] = React.useState('');

	const handleSetting = (e) => {
		const { name, value } = e.target;
		setUserSetting((prevState) => {
			return {
				...prevState,
				[name]: value,
			};
		});
	};

	const onChangeFile = (event) => {
		const file = event.target.files[0];
		if (file) {
			var reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function (e) {
				setFileUrl(reader.result);
				setFile(file);
			};
		}
	};

	const changeProfile = async () => {
		setLoader(true);
		const formData = new FormData();
		formData.append('image', file, file.name);
		try {
			let profile = await axios.post('/profile', formData);
			if (profile.status === 200) {
				let user = await axios.get('/user');
				if (user.status === 200) {
					setErr('');
					setAlertClass('show');
					setFile('');
					dispatch({
						type: 'SET_USER',
						payload: user.data.user,
					});
					setMsg(profile.data.message);
					setLoader(false);
				}
			}
		} catch (e) {
			setAlertClass('show');
			setMsg('');
			if (e.response && e.response.data) {
				if (e.response.data.error) {
					setErr(e.response.data.error.message);
				} else {
					setErr(e.response.data.message);
				}
			} else {
				setErr(e.message);
			}
			setLoader(false);
		}
	};
	const handleSubmit = async (e) => {
		setLoader(true);
		e.preventDefault();
		try {
			let update = await axios.patch('/setting', userSetting);
			if (update.status === 200) {
				let user = await axios.get('/user');
				if (user.status === 200) {
					setErr('');
					setAlertClass('show');
					setUserSetting({
						firstName: user !== null ? user.data.user.firstName : '',
						lastName: user !== null ? user.data.user.lastName : '',
						email: user !== null ? user.data.user.email : '',
						phone: user !== null ? user.data.user.phone : '',
						currency: user !== null ? user.data.user.currency : '',
					});
					dispatch({
						type: 'SET_USER',
						payload: user.data.user,
					});
					setMsg(update.data.message);
					setLoader(false);
				}
			}
		} catch (e) {
			setAlertClass('show');
			setMsg('');
			if (e.response && e.response.data) {
				if (e.response.data.error) {
					setErr(e.response.data.error.message);
				} else {
					setErr(e.response.data.message);
				}
			} else {
				setErr(e.message);
			}
			setLoader(false);
		}
	};
	const handleCloseAlert = () => {
		setAlertClass('hide');
		setErr('');
		setMsg('');
	};
	const cancelProfileChange = () => {
		setFileUrl('');
	};

	return (
		<div className='container'>
			<div className='row'>
				<div className='col-12 col-lg-6'>
					<h1 className='page-headings'>Settings</h1>
					{msg && (
						<div className={`alert alert-success alert-dismissible fade ${alertClass}`} role='alert'>
							<strong>{msg}</strong>
							<button onClick={handleCloseAlert} type='button' className='close' data-dismiss='alert' aria-label='Close'>
								<span aria-hidden='true'>×</span>
							</button>
						</div>
					)}
					{err && (
						<div className={`alert alert-danger alert-dismissible fade ${alertClass}`} role='alert'>
							<strong>{err}</strong>
							<button onClick={handleCloseAlert} type='button' className='close' data-dismiss='alert' aria-label='Close'>
								<span aria-hidden='true'>×</span>
							</button>
						</div>
					)}
					<div className='row'>
						<div className='col'>
							<div className='row align-items-center'>
								<div className='col-auto'>
									<div title='Change Profile' className='file-type-container avatar avatar-container'>
										<div onClick={cancelProfileChange} className='avatar-cross'>
											<i style={{ fontSize: '16px' }} className='fe fe-x'></i>
										</div>
										<span className='btn-type-file'>
											<input type='file' name='file' onChange={(e) => onChangeFile(e)} />
											<span className='btn-file-icon'>
												<i className='fe fe-camera'></i>
											</span>
										</span>
										<img src={fileUrl !== '' && fileUrl !== null ? fileUrl : user && user.profile && fileUrl === '' ? `${user.profile}` : Profile} className='avatar-img rounded-circle' alt='profile' />
									</div>
								</div>
								<div className='col ml-n2'>
									<h4 className='mb-1'>Profile Picture</h4>
									<button disabled={loader || file === ''} onClick={changeProfile} className='btn btn-sm btn-custom'>
										{loader && (
											<div className='spinner-border spinner-border-sm' role='status'>
												<span className='sr-only'>Loading...</span>
											</div>
										)}
										{!loader && 'Upload'}
									</button>
								</div>
							</div>
						</div>
					</div>
					<form onSubmit={handleSubmit}>
						<div className='mt-5 mb-5'></div>
						<div className='row'>
							<div className='col-12 col-md-12'>
								<div className='form-group'>
									<label className='form-label'>First name</label>
									<input type='text' className='form-control' name='firstName' value={userSetting.firstName} onChange={handleSetting} required placeholder='First Name' />
								</div>
							</div>
							<div className='col-12 col-md-12'>
								<div className='form-group'>
									<label className='form-label'>Last name</label>
									<input type='text' className='form-control' name='lastName' value={userSetting.lastName} onChange={handleSetting} required placeholder='Last Name' />
								</div>
							</div>
							<div className='col-12'>
								<div className='form-group'>
									<label className='mb-1'>Email address</label>
									<input type='email' className='form-control' name='email' value={userSetting.email} onChange={handleSetting} required placeholder='Emails' />
								</div>
							</div>
							<div className='col-12 col-md-12'>
								<div className='form-group'>
									<label className='form-label'>Phone</label>
									<input type='text' className='form-control mb-3' name='phone' value={userSetting.phone} onChange={handleSetting} required placeholder='Phone' />
								</div>
							</div>
							<div className='col-12 col-md-12'>
								<div className='form-group'>
									<label className='form-label'>Currency</label>
									<select type='text' className='form-control mb-3' name='currency' value={userSetting.currency} onChange={handleSetting} required placeholder='Phone'>
									<option value="" disabled selected>Choose currency</option>
									<option value="USD" selected="selected">United States Dollars</option>
									<option value="EUR">Euro</option>
									<option value="GBP">British pound</option>
							    <option value="AFN">Afghan afghani</option>
							    <option value="ALL">Albanian lek</option>
							    <option value="AMD">Armenian dram</option>
							    <option value="AOA">Angolan kwanza</option>
							    <option value="ARS">Argentine peso</option>
							    <option value="AUD">Australian dollar</option>
							    <option value="AWG">Aruban florin</option>
							    <option value="AZN">Azerbaijani manat</option>
							    <option value="BAM">Bosnia and Herzegovina convertible mark</option>
							    <option value="BBD">Barbadian dollar</option>
							    <option value="BDT">Bangladeshi taka</option>
							    <option value="BGN">Bulgarian lev</option>
							    <option value="BHD">Bahraini dinar</option>
							    <option value="BIF">Burundian franc</option>
							    <option value="BMD">Bermudian dollar</option>
							    <option value="BND">Brunei dollar</option>
							    <option value="BOB">Bolivian boliviano</option>
							    <option value="BRL">Brazilian real</option>
							    <option value="BSD">Bahamian dollar</option>
							    <option value="BTN">Bhutanese ngultrum</option>
							    <option value="BWP">Botswana pula</option>
							    <option value="BYR">Belarusian ruble</option>
							    <option value="BZD">Belize dollar</option>
							    <option value="CAD">Canadian dollar</option>
							    <option value="CDF">Congolese franc</option>
							    <option value="CHF">Swiss franc</option>
							    <option value="CLP">Chilean peso</option>
							    <option value="CNY">Chinese yuan</option>
							    <option value="COP">Colombian peso</option>
							    <option value="CRC">Costa Rican colón</option>
							    <option value="CUP">Cuban convertible peso</option>
							    <option value="CVE">Cape Verdean escudo</option>
							    <option value="CZK">Czech koruna</option>
							    <option value="DJF">Djiboutian franc</option>
							    <option value="DKK">Danish krone</option>
							    <option value="DOP">Dominican peso</option>
							    <option value="DZD">Algerian dinar</option>
							    <option value="EGP">Egyptian pound</option>
							    <option value="ERN">Eritrean nakfa</option>
							    <option value="ETB">Ethiopian birr</option>
							    <option value="FJD">Fijian dollar</option>
							    <option value="FKP">Falkland Islands pound</option>
							    <option value="GEL">Georgian lari</option>
							    <option value="GHS">Ghana cedi</option>
							    <option value="GMD">Gambian dalasi</option>
							    <option value="GNF">Guinean franc</option>
							    <option value="GTQ">Guatemalan quetzal</option>
							    <option value="GYD">Guyanese dollar</option>
							    <option value="HKD">Hong Kong dollar</option>
							    <option value="HNL">Honduran lempira</option>
							    <option value="HRK">Croatian kuna</option>
							    <option value="HTG">Haitian gourde</option>
							    <option value="HUF">Hungarian forint</option>
							    <option value="IDR">Indonesian rupiah</option>
							    <option value="ILS">Israeli new shekel</option>
							    <option value="IMP">Manx pound</option>
							    <option value="INR">Indian rupee</option>
							    <option value="IQD">Iraqi dinar</option>
							    <option value="IRR">Iranian rial</option>
							    <option value="ISK">Icelandic króna</option>
							    <option value="JEP">Jersey pound</option>
							    <option value="JMD">Jamaican dollar</option>
							    <option value="JOD">Jordanian dinar</option>
							    <option value="JPY">Japanese yen</option>
							    <option value="KES">Kenyan shilling</option>
							    <option value="KGS">Kyrgyzstani som</option>
							    <option value="KHR">Cambodian riel</option>
							    <option value="KMF">Comorian franc</option>
							    <option value="KPW">North Korean won</option>
							    <option value="KRW">South Korean won</option>
							    <option value="KWD">Kuwaiti dinar</option>
							    <option value="KYD">Cayman Islands dollar</option>
							    <option value="KZT">Kazakhstani tenge</option>
							    <option value="LAK">Lao kip</option>
							    <option value="LBP">Lebanese pound</option>
							    <option value="LKR">Sri Lankan rupee</option>
							    <option value="LRD">Liberian dollar</option>
							    <option value="LSL">Lesotho loti</option>
							    <option value="LTL">Lithuanian litas</option>
							    <option value="LVL">Latvian lats</option>
							    <option value="LYD">Libyan dinar</option>
							    <option value="MAD">Moroccan dirham</option>
							    <option value="MDL">Moldovan leu</option>
							    <option value="MGA">Malagasy ariary</option>
							    <option value="MKD">Macedonian denar</option>
							    <option value="MMK">Burmese kyat</option>
							    <option value="MNT">Mongolian tögrög</option>
							    <option value="MOP">Macanese pataca</option>
							    <option value="MRO">Mauritanian ouguiya</option>
							    <option value="MUR">Mauritian rupee</option>
							    <option value="MVR">Maldivian rufiyaa</option>
							    <option value="MWK">Malawian kwacha</option>
							    <option value="MXN">Mexican peso</option>
							    <option value="MYR">Malaysian ringgit</option>
							    <option value="MZN">Mozambican metical</option>
							    <option value="NAD">Namibian dollar</option>
							    <option value="NGN">Nigerian naira</option>
							    <option value="NIO">Nicaraguan córdoba</option>
							    <option value="NOK">Norwegian krone</option>
							    <option value="NPR">Nepalese rupee</option>
							    <option value="NZD">New Zealand dollar</option>
							    <option value="OMR">Omani rial</option>
							    <option value="PAB">Panamanian balboa</option>
							    <option value="PEN">Peruvian nuevo sol</option>
							    <option value="PGK">Papua New Guinean kina</option>
							    <option value="PHP">Philippine peso</option>
							    <option value="PKR">Pakistani rupee</option>
							    <option value="PLN">Polish złoty</option>
							    <option value="PRB">Transnistrian ruble</option>
							    <option value="PYG">Paraguayan guaraní</option>
							    <option value="QAR">Qatari riyal</option>
							    <option value="RON">Romanian leu</option>
							    <option value="RSD">Serbian dinar</option>
							    <option value="RUB">Russian ruble</option>
							    <option value="RWF">Rwandan franc</option>
							    <option value="SAR">Saudi riyal</option>
							    <option value="SBD">Solomon Islands dollar</option>
							    <option value="SCR">Seychellois rupee</option>
							    <option value="SDG">Singapore dollar</option>
							    <option value="SEK">Swedish krona</option>
							    <option value="SGD">Singapore dollar</option>
							    <option value="SHP">Saint Helena pound</option>
							    <option value="SLL">Sierra Leonean leone</option>
							    <option value="SOS">Somali shilling</option>
							    <option value="SRD">Surinamese dollar</option>
							    <option value="SSP">South Sudanese pound</option>
							    <option value="STD">São Tomé and Príncipe dobra</option>
							    <option value="SVC">Salvadoran colón</option>
							    <option value="SYP">Syrian pound</option>
							    <option value="SZL">Swazi lilangeni</option>
							    <option value="THB">Thai baht</option>
							    <option value="TJS">Tajikistani somoni</option>
							    <option value="TMT">Turkmenistan manat</option>
							    <option value="TND">Tunisian dinar</option>
							    <option value="TOP">Tongan paʻanga</option>
							    <option value="TRY">Turkish lira</option>
							    <option value="TTD">Trinidad and Tobago dollar</option>
							    <option value="TWD">New Taiwan dollar</option>
							    <option value="TZS">Tanzanian shilling</option>
							    <option value="UAH">Ukrainian hryvnia</option>
							    <option value="UGX">Ugandan shilling</option>
									<option value="AED">United Arab Emirates dirham</option>
							    <option value="UYU">Uruguayan peso</option>
							    <option value="UZS">Uzbekistani som</option>
							    <option value="VEF">Venezuelan bolívar</option>
							    <option value="VND">Vietnamese đồng</option>
							    <option value="VUV">Vanuatu vatu</option>
							    <option value="WST">Samoan tālā</option>
							    <option value="XAF">Central African CFA franc</option>
							    <option value="XCD">East Caribbean dollar</option>
							    <option value="XOF">West African CFA franc</option>
							    <option value="XPF">CFP franc</option>
							    <option value="YER">Yemeni rial</option>
							    <option value="ZAR">South African rand</option>
							    <option value="ZMW">Zambian kwacha</option>
							    <option value="ZWL">Zimbabwean dollar</option>
								</select>
								</div>
							</div>
						</div>

						<button disabled={loader} className='btn btn-custom btn-padd'>
							{loader && (
								<div className='spinner-border spinner-border-sm' role='status'>
									<span className='sr-only'>Loading...</span>
								</div>
							)}
							{!loader && 'Save changes'}
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Settings;

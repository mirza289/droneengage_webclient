import {CLSS_LoginControl} from './jsc_login.jsx'
import {CLSS_CTRL_Layout} from './gadgets/jsc_ctrl_layoutControl.jsx'

class CLSS_HeaderControl extends React.Component {
    constructor() {
        super ();
		this.state = {};
    }

    render() {
        return (
            <div key='CLSS_HeaderControl' className = 'row  css_padding_zero bg-dark fixed-top ps-3'>
                <div className = 'col-7  css_margin_zero css_padding_zero d-lg-block d-none d-xl-block'>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                        <a className="navbar-brand fs-3" href="#">
                            {CONST_TITLE}
                        </a>
                        <div className="collapse navbar-collapse" id="navbarNav">
                            <ul className="navbar-nav">
                                <li key="Home" className="nav-item active">
                                    <a className="nav-link" href={"https://khazanapk.com/"}>Home </a>
                                </li>
                                <li key="Account" className="nav-item">
                                    <a className="nav-link" href="accounts.html" target='_blank' >Account</a>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
                <div className='col-9 col-lg-4     css_margin_zero css_padding_zero al_r '>
                    <CLSS_CTRL_Layout/>     
                </div>
                <div className=' col-2 col-lg-1    css_margin_zero  al_r'>
                    <CLSS_LoginControl simple='true'/>
                </div>
            </div>
        );
    }
}




    if (CONST_TEST_MODE === true)
	{
        ReactDOM.render(
            <React.StrictMode>
		    <CLSS_HeaderControl />
            </React.StrictMode>,
        	
            window.document.getElementById('header_div')
        );
    
    }
    else
    {
        ReactDOM.render(
            <CLSS_HeaderControl />,
            window.document.getElementById('header_div')
        );
    }


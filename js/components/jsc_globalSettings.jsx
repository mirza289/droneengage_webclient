class CLSS_FireEvent extends React.Component {


  constructor()
	{
		super ();
		this.state = {
		    
		};
    
    window.AndruavLibs.EventEmitter.fn_subscribe(EE_onAdvancedMode,this,this.fn_advancedMode);
  }

  fn_advancedMode (me)
  {
    me.forceUpdate();
  }

  fn_fireEvent()
  {
    AndruavLibs.AndruavClient.API_FireEvent (null,$('#txt_ev').val());
   
  }

  componentWillUnmount () 
  {
    window.AndruavLibs.EventEmitter.fn_unsubscribe(EE_onAdvancedMode,this);
  }

  render() {
    if (window.AndruavLibs.LocalStorage.fn_getAdvancedOptionsEnabled()!==true)
    {
      return (
                <div></div>
            )
    }
    else
    {
      return (
        <div className="form-group">
          <label htmlFor="txt_ev" className="user-select-none  form-label text-white "><small>Event&nbsp;No.</small></label>
          <div className="input-group mb-3">
            <input id="txt_ev"  type="number" min={0} max={2000} step="1.0" className="form-control input-sm input-sm txt_margin" placeholder="0" aria-label="0" />
            <button id="btn_ev"  type="button" className="btn btn-success" onClick={ (e) => this.fn_fireEvent()} >Fire</button>
          </div>
        </div>
      );
    }
  }
}


class CLSS_DisplayItems extends React.Component {

  constructor()
	{
		super ();
		this.state = {
		    
		};
  }
  
  componentDidMount()
  {
    $('#toggle_GCS').prop("checked", window.AndruavLibs.LocalStorage.fn_getGCSDisplayEnabled());      
    $('#toggle_DRONE').prop("checked", v_en_Drone);      
    $('#toggle_ADSB').prop("checked", v_EnableADSB);      
    $('#check_tabs_display').prop("checked", v_enable_tabs_display);      
    $('#check_tabs_display').change(function (e)
        {
          var state = $(this).prop('checked');
          v_enable_tabs_display = state;
          window.AndruavLibs.LocalStorage.fn_setTabsDisplayEnabled(state);
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
          
          
    $('#check_unit_sort').prop("checked", v_enable_unit_sort);
    $('#check_unit_sort').change(function (e)
        {
          var state = $(this).prop('checked');
          v_enable_unit_sort = state;
          window.AndruavLibs.LocalStorage.fn_setUnitSortEnabled(state);
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
     
    $('#toggle_GCS').change(function (e)
        {
          var state = $(this).prop('checked');
          v_en_GCS = state;
          window.AndruavLibs.LocalStorage.fn_setGCSDisplayEnabled(state);
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
          
    $('#toggle_DRONE').change(function (e)
        {
          var state = $(this).prop('checked');
          v_en_Drone = state;
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
          
          
    $('#toggle_ADSB').change(function (e)
        {
          var state = $(this).prop('checked');
          v_EnableADSB = state;
          window.AndruavLibs.EventEmitter.fn_dispatch(EE_onPreferenceChanged);
        });
  }

  render () 
  {
    var v_check_btns = [];
    if (CONST_DISABLE_ADSG == false)
    {
      v_check_btns.push (
        <div key="check_btns" className="btn-group css_margin_top_small" role="group" >
          <label className="checkbox-inline text-white">
          <input id="toggle_GCS"    type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> GCS
          </label>
          <label className="checkbox-inline text-white">
          <input id="toggle_DRONE"  type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> Drone
          </label>
          <label className="checkbox-inline text-white">
          <input id="toggle_ADSB"   type="checkbox" data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> ADSB
          </label> 
        </div>
        );
    }
    
    v_check_btns.push (
        <div key="check_btns" className="btn-group css_margin_top_small" role="group" >
          <label className="checkbox-inline text-white me-3">
          <input id="toggle_GCS"    type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> GCS
          </label>
          <label className="checkbox-inline text-white me-3">
          <input id="toggle_DRONE"  type="checkbox"  data-toggle="toggle"  data-size="mini" data-height="20" data-width="47" data-onstyle="success" data-offstyle="danger"/> Drone
          </label>
        </div>
      );
  
      return (
        <div>{v_check_btns}</div>
        );
  }

  
}
class CLSS_Preferences extends React.Component {
  constructor()
	{
      super ();

      v_enable_tabs_display = window.AndruavLibs.LocalStorage.fn_getTabsDisplayEnabled();
  }

  componentDidMount()
  {
      $('#check_enable_speech')[0].checked = window.AndruavLibs.LocalStorage.fn_getSpeechEnabled();
      $('#volume_range')[0].value = window.AndruavLibs.LocalStorage.fn_getVolume();
      $('#check_tabs_display')[0].checked = window.AndruavLibs.LocalStorage.fn_getTabsDisplayEnabled();
      $('#check_unit_sort')[0].checked = window.AndruavLibs.LocalStorage.fn_getUnitSortEnabled();
      $('#check_advanced')[0].checked = window.AndruavLibs.LocalStorage.fn_getAdvancedOptionsEnabled();
  }


    

  fn_changeVolume ()
  {
      window.AndruavLibs.LocalStorage.fn_setVolume($('#volume_range')[0].value);
      v_SpeakEngine.fn_updateSettings();
  }

  

  fn_enableSpeech ()
  {
      const enabled = $('#check_enable_speech')[0].checked;
      window.AndruavLibs.LocalStorage.fn_setSpeechEnabled(enabled);
      v_SpeakEngine.fn_updateSettings();

      if (enabled===true)
      {
        v_SpeakEngine.fn_speak("enabled");
        $('#volume_range').removeAttr('disabled');
      }
      else
      {
        $('#volume_range').attr('disabled', 'disabled');
      }
  }

  fn_enableAdvanced ()
  {
    const enabled = $('#check_advanced')[0].checked;
    window.AndruavLibs.LocalStorage.fn_setAdvancedOptionsEnabled(enabled);
    window.AndruavLibs.EventEmitter.fn_dispatch (EE_onAdvancedMode);
  }

  fn_enableTabsDisplay ()
  {
    const enabled = $('#check_tabs_display')[0].checked;
    v_enable_tabs_display = enabled;
    window.AndruavLibs.LocalStorage.fn_setTabsDisplayEnabled(enabled);
    window.AndruavLibs.EventEmitter.fn_dispatch (EE_onPreferenceChanged);
  }

  fn_sortUnits ()
  {
    const enabled = $('#check_unit_sort')[0].checked;
    v_enable_tabs_display = enabled;
    window.AndruavLibs.LocalStorage.fn_setUnitSortEnabled(enabled);
    window.AndruavLibs.EventEmitter.fn_dispatch (EE_onPreferenceChanged);
  }

  fn_enableGCS ()
  {
    const enabled = $('#check_gcs_display')[0].checked;
    v_enable_gcs_display = enabled;
    window.AndruavLibs.LocalStorage.fn_setGCSDisplayEnabled(enabled);
    window.AndruavLibs.EventEmitter.fn_dispatch (EE_onPreferenceChanged);
  }

  fn_keydown()
  {
    window.AndruavLibs.LocalStorage.fn_setGoogleMapKey($('#txt_google_key').val());
  }

  render () {
    var v_speech_disabled = 'false';
    if (window.AndruavLibs.LocalStorage.fn_getSpeechEnabled()===false)
    {
      v_speech_disabled = 'true';
    }

    return (
          <fieldset>
            <div className="row mb-12 align-items-center">
              <label htmlFor="check_enable_speech" className="col-sm-4 col-form-label al_l" >Enable Speech</label>
              <input className="form-check-input col-sm-4 " type="checkbox" id="check_enable_speech" onClick={ () => this.fn_enableSpeech()} />
              <label htmlFor="volume_range" className="col-sm-4 col-form-label al_r" >Volume</label>
              <input type="range" className="form-range col-sm-4 width_fit ps-5 " id="volume_range" disabled={v_speech_disabled=='true'}  onChange={ () => this.fn_changeVolume()}/>
            </div>
            <div className="row mb-12 align-items-center">
              <label htmlFor="check_tabs_display" className="col-sm-4 col-form-label al_l " >Units in Tabs</label>
              <input className="form-check-input col-sm-4 " type="checkbox" id="check_tabs_display" onClick={ () => this.fn_enableTabsDisplay()} />
              <label htmlFor="check_unit_sort" className="col-sm-4 col-form-label al_r" title='sort by unit name of mavlink id'>Sort Units (mav_id)</label>
              <input className="form-check-input col-sm-4 " type="checkbox" id="check_unit_sort" onClick={ () => this.fn_sortUnits()} />
            </div>
            <div className="row mb-12 align-items-center">
              <label htmlFor="check_advanced" className="col-sm-4 col-form-label al_l " >Advanced Options</label>
              <input className="form-check-input col-sm-8 " type="checkbox" id="check_advanced" onClick={ () => this.fn_enableAdvanced()} />
            </div>
            <div className="row mb-12 align-items-center">
              <label htmlFor="check_gcs_display" className="col-sm-4 col-form-label al_l " >Show Connected GCS</label>
              <input className="form-check-input col-sm-8 " type="checkbox" id="check_gcs_display" onClick={ () => this.fn_enableGCS()} />
            </div>
          </fieldset>
          
      );
    }

}
class CLSS_GlobalSettings extends React.Component {
  
  constructor()
	{
		super ();
		this.state = {
		    m_unitText: 'm',
        CONST_DEFAULT_ALTITUDE:CONST_DEFAULT_ALTITUDE,
        CONST_DEFAULT_RADIUS:CONST_DEFAULT_RADIUS,
		    'm_update': 0,
        locationData: [],
        currentLocation:"",
        altitude:"100",
        delayTime:"5",
        latitude:"31.45753290",
        longitude:"74.48659660",
        fileContent:""
		};

    this._isMounted = false;
    //gui_toggleUnits();

    if (window.AndruavLibs.LocalStorage.fn_getMetricSystem()==true)
    {
      this.state.m_unitText = 'm';
    }
      else
      {
        this.state.m_unitText = 'ft';
      }

      this.state.CONST_DEFAULT_ALTITUDE=window.AndruavLibs.LocalStorage.fn_getDefaultAltitude();
      this.state.CONST_DEFAULT_RADIUS=window.AndruavLibs.LocalStorage.fn_getDefaultRadius();
     
      window.AndruavLibs.EventEmitter.fn_subscribe (EE_Auth_Logined, this, this.fn_onAuthStatus);
	 
	}

 shouldComponentUpdate(nextProps, nextState) {
    
    if (this.props.CONST_DEFAULT_ALTITUDE !== nextState.CONST_DEFAULT_ALTITUDE) {
     return true;
    }
    if (this.state.CONST_DEFAULT_RADIUS !== nextState.CONST_DEFAULT_RADIUS) {
      return true;
    }
    if (this.state.m_unitText !== nextState.m_unitText) {
      return true;
    }
     
    return false;
  }
  

  clickToggleUnit (e) {
    
      gui_toggleUnits();

      if (window.AndruavLibs.LocalStorage.fn_getMetricSystem()==true)
      {
        this.setState({m_unitText:'m'});
      }
      else
      {
        this.setState({m_unitText:'ft'});
      }

   
      //this.state.CONST_DEFAULT_ALTITUDE=CONST_DEFAULT_ALTITUDE;
      this.setState ({CONST_DEFAULT_ALTITUDE:CONST_DEFAULT_ALTITUDE});
      this.setState ({CONST_DEFAULT_RADIUS:CONST_DEFAULT_RADIUS});
      
			  
  }


  fn_onAuthStatus (me,res) {
    if (me._isMounted!==true) return ;
    me.setState({'m_update': me.state.m_update +1});
    //me.state.m_update += 1;
    //me.forceUpdate();
  }

  componentDidMount() {
    this._isMounted = true;

  }

 
  componentWillUnmount () {
    this._isMounted = false;
		window.AndruavLibs.EventEmitter.fn_unsubscribe (EE_Auth_Logined,this);
  }
  
  


  onChange (e) {

      CONST_DEFAULT_ALTITUDE = parseInt($("#txt_defaultAltitude").val());
      CONST_DEFAULT_RADIUS = parseInt($("#txt_defaultCircle").val());
      
 
      if (CONST_DEFAULT_ALTITUDE < CONST_DEFAULT_ALTITUDE_min) CONST_DEFAULT_ALTITUDE = parseInt(CONST_DEFAULT_ALTITUDE_min);
      if (CONST_DEFAULT_RADIUS < CONST_DEFAULT_RADIUS_min)     CONST_DEFAULT_RADIUS   = parseInt(CONST_DEFAULT_RADIUS_min);


      this.setState ({CONST_DEFAULT_ALTITUDE:CONST_DEFAULT_ALTITUDE});
      this.setState ({CONST_DEFAULT_RADIUS:CONST_DEFAULT_RADIUS});

  }


  render() {

     var m_unitText= "";

     if (window.AndruavLibs.LocalStorage.fn_getMetricSystem()==true)
      {
        m_unitText = 'm';
      }
      else
      {
        m_unitText = 'ft';
      }

  //  fn_console_log ("REACT:RENDER CLSS_GlobalSettings" + this.state.CONST_DEFAULT_ALTITUDE );
  var v_gadgets = [];
  var v_uploadFile = [];
  var v_telemetryModes = [];
  
  v_gadgets.push (
      <div key="1" className="row ">
                <div className="col-xs-6 col-sm-6 col-lg-6">
                  <div className="form-inline">
                    <div className="form-group">
                      <div>
                        <label htmlFor="txt_defaultAltitude" className="user-select-none text-white txt_label_width"><small>Alt&nbsp;Step</small></label>
                        <input id="txt_defaultAltitude" type="number" min={parseInt(CONST_DEFAULT_ALTITUDE_min)} className="form-control input-xs input-sm"  onChange={(e) => this.onChange(e)}  value={this.state.CONST_DEFAULT_ALTITUDE} />
                        <button id="btn_defaultAltitude" className="btn btn-secondary btn-sm" type="button" onClick={ (e) => this.clickToggleUnit(e) }>{this.state.m_unitText}</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-xs-6 col-sm-6 col-lg-6">
                  <div className="form-inline">
                    <div className="form-group">
                        <div>
                          <label htmlFor="txt_defaultCircle" className="user-select-none text-white txt_label_width"><small></small></label>
                          <input id="txt_defaultCircle" type="number" min={parseInt(CONST_DEFAULT_RADIUS_min)} className="form-control input-xs input-sm"  onChange={(e) => this.onChange(e)}  value={this.state.CONST_DEFAULT_RADIUS}/>
                          <button id="btn_defaultCircle" className="btn btn-secondary btn-sm" type="button"  onClick={ (e) => this.clickToggleUnit(e) }>{this.state.m_unitText}</button>
                        </div>
                    </div>
                  </div>
                </div>
            </div>
            
    );


    v_uploadFile.push (
              <div key='v_uploadFile0' className="row width_100 margin_zero css_margin_top_small ">
                <div  key='v_uploadFile1' className={"col-12 "}>
                  <div key='v_uploadFile2' className="form-inline">
                    <div key='v_uploadFile3' className="form-group">
                        <label htmlFor="btn_filesWP" className="user-select-none text-white mt-2"><small>Mission&nbsp;File</small></label>
                        <input type="file" id="btn_filesWP" name="file" className="form-control input-xs input-sm css_margin_left_5"/>
                    </div>
                  </div>
                </div>
              </div>
      );

    


    v_uploadFile.push ();
    var cls_ctrl_wp = '  ';
    if (!window.AndruavLibs.AndruavAuth.fn_do_canControlWP()) 
    { // no permission
      cls_ctrl_wp = ' hidden disabled ';
    }
     
    const copyToClipboard = (e) => {
      const latLngText = document.getElementById("lat_lng_display").value;
      navigator.clipboard.writeText(latLngText).then(() => {
        alert("Latitude and Longitude copied to clipboard!");
      }).catch(err => {
        alert("Failed to copy: ", err);
      });
    }
// https://103.164.9.58:19408/app/location


  
const getLocationData = async () => {
  try {
    // Make the GET request to the server
    const response = await fetch('http://103.164.9.58:19408/app/location', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json', // Set the content type
      }
    });


    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    // Handle the received data
    console.log('Location data:', data);

    let locData=[]
    let i=0
    for (let index = data.length-1; index > -1; index--) {
      locData[i] = data[index];
      i=i+1;
    }

    console.log(locData)
    this.setState({ locationData: locData });

    // Example: Update the UI or state with the data
    // setLatitude(data.latitude); 
    // setLongitude(data.longitude);
    setTimeout(() => {
      getLocationData()
    }, 3000);
  } catch (error) {
    // Handle any errors that occurred during the fetch
    console.error('Error fetching location data:', error);
  }
}

const setCurrentLocation=(location)=>{
  this.setState({currentLocation:location})
}


const handleSetLocationDetails =(location)=>{
  setCurrentLocation(location.latitude +","+ location.longitude)
  this.setState({latitude:location.latitude})
  this.setState({longitude:location.longitude})
}

const handleAltitude=(altitude)=>{
  this.setState({altitude:altitude})
}

const handleLongitude=(lng)=>{
  this.setState({longitude:lng})
}

const handleLatitude=(lat)=>{
  this.setState({latitude:lat})
}

const handleDelay=(time)=>{
  this.setState({delayTime:time})
}

  // Generate Waypoint File content
  const generateFile = () => {
    const { latitude, longitude, delayTime, altitude } = this.state;
    // Version line with Windows line ending
    const version = 'QGC WPL 110\r\n';  
    let waypointIndex = 0;          
    const currentWP = 0;              
    const coordFrame = 0;             
    const command = 16;               
    const autoContinue = 1;           

    // Create waypoints with Windows line endings (\r\n)
    // Takeoff waypoint (index 0)
    const takeoff = `0\t1\t0\t22\t0.000000\t0.000000\t0.000000\t0.000000\t0.000000\t0.000000\t${altitude}.000000\t1\r\n`;
    waypointIndex++;

    // Destination waypoint
    const waypointData = `${waypointIndex}\t0\t${coordFrame}\t${command}\t${delayTime}.000000\t0.000000\t0.000000\t0.000000\t${latitude}\t${longitude}\t${altitude}.000000\t1\r\n`;
    waypointIndex++;
    
    // Delay waypoint
    const delayWaypoint = `${waypointIndex}\t0\t3\t93\t30.000000\t0.000000\t0.000000\t0.000000\t0.000000\t0.000000\t0.000000\t1\r\n`;
    waypointIndex++;

    // RTL waypoint 
    const rtlWaypoint = `${waypointIndex}\t0\t3\t20\t0.000000\t0.000000\t0.000000\t0.000000\t0.000000\t0.000000\t0.000000\t1\r\n`;

    // Combine all waypoints with proper formatting
    const fullContent = version + takeoff + waypointData + delayWaypoint + rtlWaypoint;

    console.log('Generated waypoint file content:', fullContent); // Debug log

    // Update state
    this.setState({fileContent: fullContent});
};

  // // Create and download the file
  const downloadFile = () => {
    try {
        // Create file content as Blob
        const fileBlob = new Blob([this.state.fileContent], { type: "" });
        
        // Create File object
        const wayPointFile = new File([fileBlob], "way.waypoints", { type: "" });
        
        // Get the file input element
        const fileInput = document.getElementById('btn_filesWP');
        if (fileInput) {
            // Create DataTransfer object
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(wayPointFile);
            
            // Update the files property
            fileInput.files = dataTransfer.files;

            // Trigger change event to ensure listeners are notified
            const event = new Event('change', { bubbles: true });
            fileInput.dispatchEvent(event);
            
            // Verify update
            console.log('File input updated:', fileInput.files[0].name);
            
            // Store file content in a data attribute for later access
            fileInput.setAttribute('data-file-content', this.state.fileContent);
        }

        // Download file
        const downloadElement = document.createElement('a');
        downloadElement.href = URL.createObjectURL(fileBlob);
        downloadElement.download = 'waypoint.waypoints';
        document.body.appendChild(downloadElement);
        downloadElement.click();
        document.body.removeChild(downloadElement);

    } catch (err) {
        console.error('Error in downloadFile:', err);
    }
};
  // const downloadFile = () => {
  //   const element = document.createElement('a');
  //   const file = new Blob([this.state.fileContent], { type: 'text/plain' });
  //   element.href = URL.createObjectURL(file);
  //   element.download = 'waypoint_plan.txt';
  //   document.body.appendChild(element); // Required for this to work in FireFox
  //   element.click();
  // };


  return (
     <div key='g1' className="row margin_zero">
            <div className="card text-white  border-light mb-3 padding_zero" >
    <div className="card-header  text-center user-select-none"> <strong>Settings</strong></div>
    <div className="card-body" style={{fontSize:"14px"}}>
          {/* Here is where the input field for lat/lng and the copy button will be added */}
          <div className="form-inline">
            <div className="form-group">
            <label htmlFor="lat_lng_display" className="text-white">Emergency Location</label><br/>
              <label htmlFor="lat_lng_display" className="text-white"><small> Lat/Lng&nbsp;Display:</small></label>
              <input id="lat_lng_display" type="text" className="form-control input-sm mx-2" value={this.state.currentLocation} readOnly />
              <button className="btn btn-secondary btn-sm" type="button" style={{marginTop:"5px", marginLeft:"10px"}} onClick={copyToClipboard}>Copy</button>
              <button className="btn btn-secondary btn-sm" type="button" style={{marginTop:"5px", marginLeft:"10px"}} onClick={getLocationData}>Get Location</button>
            </div>
          </div>
          <div className="location-data" style={{marginTop:"10px"}}>
            <div className="row mb-2">
              <div className="col col-lg-3">
                <strong>Caller Id</strong>
              </div>
              <div className="col col-lg-6">
                <strong>Location</strong>
              </div>
            </div>
            </div>
          <div  style={{maxHeight:"20vh", overflowY:"auto", overflowX:"hidden"}}>
            {this.state.locationData.length !==0 &&
            this.state.locationData.map((data,i)=>(
          <div className="location-data" style={{marginTop:"10px", backgroundColor: i === 0?"green":"", padding:'5px'}} key={i} >
            <div className="row mb-2">
              <div className="col col-lg-3">
                <strong>{data.emergency}</strong>
              </div>
              <div className="col col-lg-5">
                <strong>{data.location.coords.latitude +" "+ data.location.coords.longitude}</strong>
              </div>
              <div className="col">
              <button className="btn btn-info btn-sm" type="button" style={{marginTop:"5px", marginLeft:"10px", fontSize:"12px"}} onClick={()=>handleSetLocationDetails(data.location.coords)} >Set Location</button>
              </div>
            </div>
            </div>
            ))}
          </div>

        <h6>Waypoint Generator</h6>
          <div className="waypoint-input">
            <input
              type="number"
              placeholder="Latitude"
              value={this.state.latitude}
              onChange={(e) => handleLatitude(e.target.value)}
            />
            <input
              type="number"
              placeholder="Longitude"
              value={this.state.longitude}
              onChange={(e) => handleLongitude(e.target.value)}
            />
            <input
              type="number"
              placeholder="Altitude (m)"
              value={this.state.altitude}
              onChange={(e) => handleAltitude(e.target.value)}
            />
            <input
              type="number"
              placeholder="Wait Time (s)"
              value={this.state.delayTime}
              onChange={(e) => handleDelay(e.target.value)}
            />
              <button 
              onClick={generateFile}
              >Generate Waypoint File</button>
              <button 
              onClick={downloadFile} 
              >Download File</button>
      </div>
     </div>
    <div className="card-body">
                <ul className="nav nav-tabs">
                    <li className="nav-item">
                        <a className="nav-link user-select-none " data-bs-toggle="tab" href={"#settings_home"}>Defaults</a>
                    </li>
                    <li className="nav-item">
                        <a className={"nav-link user-select-none " + cls_ctrl_wp} data-bs-toggle="tab" href={"#settings_profile"}>Mission</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link user-select-none " data-bs-toggle="tab" href={"#settings_preference"}>Preferences</a>
                    </li>
                </ul>
                <div id="main_settings_tab" className="tab-content">
                    <div className="tab-pane fade  active show pt-2" id={"settings_home"}>
                    {v_gadgets}
                    {v_telemetryModes}      
                    
                    </div>
                    <div className={"tab-pane fade pt-2" + cls_ctrl_wp} id={"settings_profile"}>
                    {v_uploadFile} 
                    <CLSS_FireEvent/>
                    </div>
                    <div className="tab-pane fade" id={"settings_preference"}>
                      <CLSS_Preferences/>
                    </div>
                </div>
     </div>
     </div>
    </div>
    );
  }
};

ReactDOM.render(
  <React.StrictMode><CLSS_GlobalSettings key="global_settings" date={'GLK'} myname={' '} /></React.StrictMode>,
			window.document.getElementById('andruavUnits_in')
		);

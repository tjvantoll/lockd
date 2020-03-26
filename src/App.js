import React from 'react';
import './App.css';
import './geocities.css';

const ENDPOINT = "https://qurantinedcodingservice.azurewebsites.net/api/wfhtips";

// const localTips = [{"tipID":1,"tip":"Right Tools Matter","why":"Communication is the Key","how":"Slack | Teams | Zoom | Skype | OBS | Twitter"},{"tipID":2,"tip":"Manage Expectations","why":"There should be no Surprises","how":"Work Hours | Turn-around Time | Deliverables"},{"tipID":3,"tip":"Be Reachable","why":"I see You","how":"Availability Pings | Decided times | Decided tools"},{"tipID":4,"tip":"What is being working on?","why":"Your Team should never be in Doubt","how":"Deliverable formats | Timelines | Honest estimates"},{"tipID":5,"tip":"Collaborate","why":"Never be Stuck","how":"Communicate openly | Seek help | Real-time tools"},{"tipID":6,"tip":"The Headphone Rule","why":"Developer zen is Precious","how":"Do not disturb indicators | Pomodoros"},{"tipID":7,"tip":"Effective Vs Efficient","why":"Doing the right things Vs Doing things right","how":"Running slow right way > fast wrong way | Goal orientation"},{"tipID":8,"tip":"Pants Matter","why":"The aura of Formality","how":"Dress for the job | Be at work | Clear your mind"},{"tipID":9,"tip":"Life Happens","why":"Plan around Disruptions","how":"Be realistic | Make up time | Guilt helps"},{"tipID":10,"tip":"Triage your Life","why":"Prioritize your Day","how":"Sift through noise | Stop notifications | Delegate"},{"tipID":11,"tip":"Defined Vs Realtime Work","why":"Align your work to Goals","how":"Do not get sucked in | Prioritize | Do not argue on internet"},{"tipID":12,"tip":"Catch-up Never Ends","why":"It is okay to Miss","how":"Important stuff will resurface | Avoid context switching"},{"tipID":13,"tip":"Draw a Line","why":"Personal time vs Work time","how":"Invest in yourself | Learn | Precious weekends"},{"tipID":14,"tip":"Change it Up","why":"Change keeps you Attentive","how":"Location | Posture | Computers | Projects"},{"tipID":15,"tip":"Get off that Chair","why":"Healthy mind needs Healthy body","how":"Take breaks | Stress-relieving chores | Exercise"},{"tipID":16,"tip":"Pick up the Phone","why":"Your keystrokes are Numbered","how":"No long emails | Discuss | Immortailize content"},{"tipID":17,"tip":"Plan Meetups","why":"Be social with your Team","how":"Facetime > IMs | Personal relations | Camaraderie"},{"tipID":18,"tip":"Find your Passion","why":"Pet projects help you Grow","how":"Never stop learning | Bring influences | Enrich"},{"tipID":19,"tip":"Enjoy Life","why":"Savor the little Things","how":"Indulge in relaxation | Friday lunch | Blow off steam"},{"tipID":20,"tip":"Have Fun Giving Back","why":"You have a preferred Life","how":"Be productive | Be social | Be energetic | Be kind"},{"tipID":24,"tip":"Sam","why":"Wise","how":"Testing ..."},{"tipID":25,"tip":"Take short walks","why":"It’s a great way to break up your day, and exercise helps get the blood flowing.","how":"Moving your feet"},{"tipID":26,"tip":"XamarinTest","why":"Why not","how":"Just Chill"},{"tipID":27,"tip":"This is CRAP","why":"Why not","how":"Just Chill"}];

function App() {

  const [tips, setTips] = React.useState([]);
  const [isDialogVisible, setDialogVisible] = React.useState(false);

  const [tip, setTip] = React.useState("");
  const [how, setHow] = React.useState("");
  const [why, setWhy] = React.useState("");

  const [tipError, setTipError] = React.useState(false);
  const [howError, setHowError] = React.useState(false);
  const [whyError, setWhyError] = React.useState(false);
  const [formError, setFormError] = React.useState(false);

  React.useEffect(() => {
    fetch(ENDPOINT)
      .then(response => response.json())
      .then(data => {
        setTips(data.reverse());
      });
  }, []);

  const toggleDialog = () => {
    setDialogVisible(isDialogVisible ? false : true);
  }

  const addTip = (e) => {
    e.preventDefault();
    let validForm = true;
    if (tip.trim() === "") {
      setTipError(true);
      validForm = false;
    }
    if (how.trim() === "") {
      setHowError(true);
      validForm = false;
    }
    if (why.trim() === "") {
      setWhyError(true);
      validForm = false;
    }

    setFormError(!validForm);

    if (!validForm) {
      return;
    }

    let theTip = {
      tip: tip,
      why: why,
      how: how
    };
    fetch(ENDPOINT, {
      method: "POST",
      body: JSON.stringify(theTip),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(() => {
      const newTips = [theTip, ...tips];
      setTips(newTips);
      setDialogVisible(false);
    })
  }

  return (
    <div>
      <img className="logo" src="/logo.png" alt="Lockd app logo" />
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>
            <h3>{tip.tip}</h3>
            <ul>
              <li>Why: {tip.why}</li>
              <li>How: {tip.how}</li>
            </ul>
          </li>
        ))}
      </ul>
      <button
        class="btn-primary add-button"
        style={{ display: isDialogVisible ? "none": "block"}}
        onClick={toggleDialog}
      >Add Tip</button>

      <div className="dialog hero-unit" style={{ display: isDialogVisible ? "block": "none"}}>
        <div class="alert alert-block" style={{ display: formError ? "block" : "none" }}>
          <img class="pull-left"  src="https://code.divshot.com/geo-bootstrap/img/test/drudgesiren.gif" width="80" />
          <h4 class="alert-heading">You screwed up!</h4>
          <p>Please submit valid work from home tips.</p>
        </div>

        <form class="form-horizontal" onSubmit={addTip}>
          <fieldset>
            <legend>Add your work from home tip</legend>
            <div className={tipError ? "control-group error" : "control-group"}>
              <label class="control-label">Tip:</label>
              <div className="controls">
                <input className="input input-xlarge"
                  value={tip}
                  onChange={(e) => setTip(e.target.value)} />
              </div>
            </div>
            <div className={howError ? "control-group error" : "control-group"}>
              <label className="control-label">How:</label>
              <div class="controls">
                <input className="input input-xlarge"
                  value={how}
                  onChange={(e) => setHow(e.target.value)} />
              </div>
            </div>
            <div className={whyError ? "control-group error" : "control-group"}>
              <label class="control-label">Why:</label>
              <div class="controls">
                <input className="input input-xlarge"
                  value={why}
                  onChange={(e) => setWhy(e.target.value)} />
              </div>
            </div>
          </fieldset>
          <div class="form-actions">
            <button class="btn btn-primary">Save</button>
            <button class="btn" type="button"
              onClick={toggleDialog}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;

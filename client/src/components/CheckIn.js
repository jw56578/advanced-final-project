import React from "react";

class CheckIn extends React.Component{
  state = {
      choosenActivityId:0,
      savingInProgress: false
  }
  selectActivity = (id)=>{
    this.setState({choosenActivityId:id})
  }
  checkIn = ()=>{
    let checkin = {activityId:this.state.choosenActivityId};
    let {checkInDone} = this.props;
    this.setState({savingInProgress:true});
    fetch("/checkins", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(checkin)
      })
      .then(r=>r.text())
      .then(d=>checkInDone(d));
  }
  renderSavingInProgress(){
    return <div>Saving....</div>;
  }
  render(){
    

      if(this.state.savingInProgress)
        return this.renderSavingInProgress();
      else
        return <div className="wrapper">
                <button style={{backgroundColor: this.state.choosenActivityId === 1 ? "#ff6f69": "buttonface"}}  onClick={()=>this.selectActivity(1)}>Deads</button>
                <button style={{backgroundColor: this.state.choosenActivityId === 2 ? "#ff6f69": "buttonface"}} onClick={()=>this.selectActivity(2)}>Squat</button>
                <button style={{backgroundColor: this.state.choosenActivityId === 3 ? "#ff6f69": "buttonface"}} onClick={()=>this.selectActivity(3)}>Push</button>
                <button style={{backgroundColor: this.state.choosenActivityId === 4 ? "#ff6f69": "buttonface"}} onClick={()=>this.selectActivity(4)}>Pull</button>
                <button  onClick={this.checkIn} className="checkin-button">Check In</button>
                </div>
  }
}
export default CheckIn;
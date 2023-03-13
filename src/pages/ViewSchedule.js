import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import _ from "lodash";
import { useState } from 'react';
import "./Services.css"
import "./ViewSchedule.css"
import { Modal, Button } from 'react-bootstrap';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const scheduleCards = [
  {
    id: 1,
    label: `Anti-<span class="redText">Depression</span> Reiki`,
    subtext:
      "Reiki is a scientific and research-proven technique to get rid of anxiety and depression through our body’s natural healing ability.",
    image: require("../assets/5.png"),
    bookingDetails: {
      image: require("../assets/5.png"),
      label: "Anti-depression Reiki",
      benefits: [
        "Boosts Mood",
        "Relives Anxiety",
        "Heals Depression",
        "No Side Effect",
        "Get Rid Of Therapies",
      ],
      sessionPlan: [
        {
          label: "1 Reki session",
          price: 499,
          sessionCount: 1,
        },
        {
          label: "3 Reki session",
          price: 1299,
          sessionCount: 3,
        },
        {
          label: "5 Reki session",
          price: 1749,
          sessionCount: 5,
        },
      ],
      body: "Depression is a very common situation and every 1 in 15 people experience it in the world. We are here to address this in the most result-effective and cost-effective way. Reiki is a science and research proven technique to get rid of anxiety and depression by our body’s natural healing ability.",
      expectation:
        "This 30 min reiki healing session will help you lighten your mood,and you can experience improvement in physical symptoms, wellbeing and anxiety. At VediHeal we believe depression is not a disease to be cured whereas it is a situation that needs to be healed.",
    },
  },
];  

function ViewSchedule(props) {

  const [schedules,setSchedules] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async (id) => {
    const data={
      "jwt":props.instructorJWT,
      "id":id
    }
    const url = "http://localhost:5000/schedule/deleteSchedule";
    const options = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json",
        }
    }
    const res = await fetch(url,options);
    const body = await res.json();
    console.log(body);
    if(body.status){
      history.push("/viewschedule");
    }
  }

  const history = useHistory();
    useEffect(()=>{
        if(!props.instructorJWT){
            history.push("/login");
        }
    },[]);

    const getData = async ()=>{
      const data={
        "jwt":props.instructorJWT,
      }
      const url = "http://localhost:5000/schedule/instructor";
      const options = {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
              "Content-Type": "application/json",
          }
      }
      const res = await fetch(url,options);
      const body = await res.json();
      setSchedules(body);
      console.log(body);
    }

    useEffect(()=>{
      getData();
    },[]);


  return (
    <div className="serviceContainer mt-6">
  <div className="serviceCards">
    {_.map(schedules, (card, index) => {
      return (
        <div className="card cardWidth" key={index}>
          <div className="divRow">

            <div className="divCol">
              <div className="cardText">
                <div>
                  <h4>Available Slots</h4>
                </div>
              </div>
              <div className="paddingLeft">  
                <div><b>Date</b>: {card.start_time}</div>
                <div><b>Time</b>: {card.start_time}</div>
              </div>
              <div className="cardBtn">
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                />
              </div>
              <div>
              <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Schedule</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this Schedule?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={()=>handleDelete(card._id)}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
              </div>
             
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>

  )
}
export default ViewSchedule;

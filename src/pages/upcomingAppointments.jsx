import { styled } from "styled-components";
import Header from "../components/header";
import Footer from "../components/footer";
import Appointment from "../components/appointment";
import { Link, useNavigate } from "react-router-dom";
import { faArrowLeft, faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AppointmentModal from "../components/appointmentModal";
import { useRecoilState } from "recoil";
import { AppointmentModalAtom } from "../Recoil/appintmentModal";
import { upcomingAppointmentsAtom } from "../Recoil/upcomingAppointments";
import { useEffect, useState } from "react";
import config from "../config.json";
import { userAtom } from "../Recoil/user";

const AppointmentsContainer = styled.div`
    display:flex;
    flex-direction:column;
    padding:1em;
    justify-content:center;
    row-gap:1em;
`

const LinkButton = styled.div`
    font-size:1.2em;
    padding:1em;
    border-radius:2rem;
    background-color:#ff4d4d;
    color:white;
    text-align:center;
`

const AppointmentTitle = styled.div`
    display:flex;
    flex-direction:row;
    align-items:center;
    justify-content:space-between;
    margin:1.5rem;
    margin-bottom:0rem;
`

const CaptionName = styled.div`
    font-size:1.2rem;
    font-weight:500;
    align-self:center;
    display:flex;
    flex-direction:row;
    column-gap:1rem;
`

const UpcomingAppointments = ()=>{

    // fetch api call to previous appointmetns of user and  
    // save it in recoil state
    // if none display something

    const [loading,setLoading] = useState(false);

    const [user,setUser] = useRecoilState(userAtom);
    const [appointments,setAppointments] = useRecoilState(upcomingAppointmentsAtom);
    const [appointmentModal,setAppointmentModal] = useRecoilState(AppointmentModalAtom);

    const navigate = useNavigate();

    const goback = ()=>{
        navigate(-1);
    }

    const getAppointments = async()=>{
        setLoading(true);
        const url = config.SERVER_URL+"/appointment/user/upcoming";
        const options = {
            method: "POST",
            body: JSON.stringify({
                jwt:user?.jwt,
            }),
            headers: {
              "Content-Type": "application/json",
            },
        }

        const response = await fetch(url,options);
        const data = await response.json();
        if(!data.error){
            setAppointments(data);
            setLoading(false);
        }
    }

    const refresh = ()=>{
        getAppointments();
    }

    useEffect(()=>{
        if(!user)navigate("/login");
        if(appointments==null)getAppointments();
    },[]);

    return (
        <>

            {
                appointmentModal && <AppointmentModal/>
            }

            <Header/>
            
            <AppointmentTitle>
                <FontAwesomeIcon icon={faArrowLeft} onClick={goback}/>
                <CaptionName><div>Upcoming Appointments</div><FontAwesomeIcon icon={faRefresh} onClick={refresh}/></CaptionName>
            </AppointmentTitle>

            <AppointmentsContainer>
                <Link to="/services"><LinkButton>Book Your Appointment</LinkButton></Link>

                {
                    !loading && 
                    appointments?.map((appointment,index)=>{
                        return <Appointment key={index} data={appointment}/>
                    })
                }
            </AppointmentsContainer>
            <Footer/>
        </>
    )
}

export default UpcomingAppointments;
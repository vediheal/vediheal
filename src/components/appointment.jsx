import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { styled } from "styled-components";

const AppointmentCard = styled.div`
    width:21em;
    background-color:#f8cfc1;
    display:flex;
    flex-direction:row;
    align-items:center;
    padding:1em;
    border-radius:1em;
    position:relative;
`


const Img = styled.img`
    height:8em;
    object-fit:contain;
`

const Details = styled.div`
    display:flex;
    flex-direction:column;
    row-gap:1em;
`

const DetailsTitle = styled.div`
    text-align:center;
    font-weight:600;
    font-size:1.1em;
`

const DetailsDescription = styled.div`
    font-size:1em;
`

const Select = styled.div`
    position:absolute;
    bottom:12px;
    right:15px;
`

const Appointment = (props)=>{
    return (
        <AppointmentCard>
            <Img src="https://res.cloudinary.com/dmrzngif8/image/upload/v1675284620/Vediheal/5_wjbzrb.png"/>
            <Details>
                <DetailsTitle>Anti Depression Reiki</DetailsTitle>
                <DetailsDescription>
                    Date : 15/08/2023
                </DetailsDescription>
                <DetailsDescription>
                    Meeting Link
                </DetailsDescription>
            </Details>
            <Select>
                <FontAwesomeIcon color="black"  icon={faArrowRight} />
            </Select>
            {/* replace with icon */}
        </AppointmentCard>
    )
}

export default Appointment;